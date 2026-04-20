#!/usr/bin/env python3
"""
OmniScan AI: Enterprise Book Digitization Platform
Backend Architecture Version: 1.0.4
Lead Architect: Senior Systems Consultant
Target Environment: AWS EKS / Production
Business Model: Transactional ($5.00 per book)
"""

from fastapi import FastAPI, HTTPException, Depends, Request, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy import create_engine, Column, String, DateTime, Boolean, Integer, Float, ForeignKey, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from jose import JWTError, jwt
from passlib.context import CryptContext
from loguru import logger
import stripe, redis, os, uuid
from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

# =============================================================================
# CONFIGURATION & ENVIRONMENT
# =============================================================================
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://dynasty:changeme@db:5432/book_digitization_platform")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
SECRET_KEY = os.getenv("SECRET_KEY", "omniscan_prod_secret_8829104432")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 60 # Minutes
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_51NzExampleKey")

# =============================================================================
# DATABASE & PERSISTENCE LAYER
# =============================================================================
engine = create_engine(
    DATABASE_URL, 
    pool_size=20, 
    max_overflow=10, 
    pool_timeout=30, 
    pool_recycle=1800
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    """Core User Entity for Identity and Billing Management"""
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    plan = Column(String, default="free") # free, pro, enterprise
    books = relationship("Book", back_populates="owner")

class Book(Base):
    """Domain Entity representing a physical book being digitized"""
    __tablename__ = "books"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, index=True)
    author = Column(String)
    page_count = Column(Integer, default=0)
    status = Column(String, default="pending") # pending, processing, completed, failed
    s3_folder_path = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    owner = relationship("User", back_populates="books")
    pages = relationship("Page", back_populates="book", cascade="all, delete-orphan")

class Page(Base):
    """Granular entity for individual page OCR and image tracking"""
    __tablename__ = "pages"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    book_id = Column(String, ForeignKey("books.id"), nullable=False)
    page_number = Column(Integer, nullable=False)
    image_url = Column(String)
    ocr_text = Column(String)
    confidence_score = Column(Float)
    processed_at = Column(DateTime, default=datetime.utcnow)
    book = relationship("Book", back_populates="pages")

class Transaction(Base):
    """Financial record for the $5.00 per book transactional model"""
    __tablename__ = "transactions"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    book_id = Column(String, ForeignKey("books.id"), nullable=False)
    amount = Column(Float, default=5.00)
    currency = Column(String, default="USD")
    stripe_payment_id = Column(String, unique=True)
    status = Column(String) # succeeded, pending, failed
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# =============================================================================
# SERVICES & DEPENDENCY INJECTION
# =============================================================================
class DigitizationService:
    """
    Business Logic Layer for managing the AI OCR pipeline.
    Handles interaction between S3, OpenAI OCR, and PostgreSQL.
    """
    def __init__(self, db: Session, redis_client: redis.Redis):
        self.db = db
        self.redis = redis_client

    async def process_book_ocr(self, book_id: str):
        """Simulates the asynchronous AI OCR pipeline"""
        logger.info(f"Starting AI OCR process for book {book_id}")
        book = self.db.query(Book).filter(Book.id == book_id).first()
        if not book:
            return
        
        try:
            book.status = "processing"
            self.db.commit()
            
            # Simulate AI processing lag
            # In production: call OpenAI GPT-4o-vision or AWS Textract
            self.redis.set(f"job:{book_id}", "processing")
            
            # Dummy page generation
            for i in range(1, 11): # Assuming 10 pages for demo
                page = Page(
                    book_id=book_id, 
                    page_number=i, 
                    ocr_text=f"Extracted text for page {i} of {book.title}", 
                    confidence_score=0.98
                )
                self.db.add(page)
            
            book.status = "completed"
            self.db.commit()
            self.redis.set(f"job:{book_id}", "completed")
            logger.info(f"Successfully digitized book {book_id}")
        except Exception as e:
            logger.error(f"OCR Error for {book_id}: {str(e)}")
            book.status = "failed"
            self.db.commit()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_digitization_service(db: Session = Depends(get_db)):
    return DigitizationService(db, r)

# =============================================================================
# SECURITY & AUTHENTICATION
# =============================================================================
r = redis.from_url(REDIS_URL, decode_responses=True)
limiter = Limiter(key_func=get_remote_address)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE)
    return jwt.encode({**data, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(request: Request, db: Session = Depends(get_db)):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing authentication token")
    
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        user = db.query(User).filter(User.email == email).first()
        if not user or not user.is_active:
            raise HTTPException(status_code=401, detail="User inactive or not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired or invalid")

# =============================================================================
# SCHEMAS (PYDANTIC)
# =============================================================================
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

class Token(BaseModel):
    access_token: str
    token_type: str

class BookCreate(BaseModel):
    title: str
    author: str
    page_count: int

class BookUpdate(BaseModel):
    title: Optional[str]
    author: Optional[str]

class BookResponse(BaseModel):
    id: str
    title: str
    author: str
    status: str
    page_count: int
    created_at: datetime
    class Config: from_attributes = True

# =============================================================================
# API INITIALIZATION & MIDDLEWARE
# =============================================================================
app = FastAPI(
    title="OmniScan AI Production API", 
    version="1.0.4",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["https://app.omniscan.ai", "https://admin.omniscan.ai"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.middleware("http")
async def request_tracing_middleware(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    logger.info(f"Incoming Request [{request_id}] {request.method} {request.url.path}")
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response

# =============================================================================
# CORE DOMAIN ENDPOINTS (v1)
# =============================================================================
@app.post("/v1/books", response_model=BookResponse, status_code=201)
@limiter.limit("5/minute")
async def create_book(
    request: Request, 
    book_in: BookCreate, 
    background_tasks: BackgroundTasks,
    current_user: User = Depends(verify_token), 
    db: Session = Depends(get_db),
    service: DigitizationService = Depends(get_digitization_service)
):
    """Creates a book record and triggers the AI OCR pipeline after payment verification"""
    # In a production flow, we would check for a successful Stripe Transaction first
    # For this implementation, we assume the transactional $5 fee is handled via checkout
    new_book = Book(
        title=book_in.title, 
        author=book_in.author, 
        page_count=book_in.page_count, 
        user_id=current_user.id,
        status="pending"
    )
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    
    background_tasks.add_task(service.process_book_ocr, new_book.id)
    return new_book

@app.get("/v1/books", response_model=List[BookResponse])
async def list_books(current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    """Retrieves all books associated with the authenticated user"""
    return db.query(Book).filter(Book.user_id == current_user.id).all()

@app.get("/v1/books/{book_id}", response_model=BookResponse)
async def get_book_detail(book_id: str, current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    """Retrieves detailed metadata for a specific book"""
    book = db.query(Book).filter(Book.id == book_id, Book.user_id == current_user.id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found or access denied")
    return book

@app.put("/v1/books/{book_id}", response_model=BookResponse)
async def update_book(
    book_id: str, 
    book_in: BookUpdate, 
    current_user: User = Depends(verify_token), 
    db: Session = Depends(get_db)
):
    """Updates metadata for an existing book record"""
    book = db.query(Book).filter(Book.id == book_id, Book.user_id == current_user.id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    if book_in.title: book.title = book_in.title
    if book_in.author: book.author = book_in.author
    
    db.commit()
    db.refresh(book)
    return book

# =============================================================================
# BILLING & INFRASTRUCTURE
# =============================================================================
@app.post("/webhooks/stripe")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")
    try:
        event = stripe.Webhook.construct_event(payload, sig, os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_test"))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")
    
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user = db.query(User).filter(User.email == session.get("customer_email")).first()
        if user:
            # Upgrade user to pro or credit their account for the $5 book
            user.plan = "pro"
            db.commit()
    return {"status": "success"}

@app.get("/health")
def health_check():
    """Comprehensive system health check for Kubernetes Liveness/Readiness probes"""
    health_status = {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}
    try:
        with SessionLocal() as db:
            db.execute(text("SELECT 1"))
            health_status["database"] = "connected"
    except Exception as e:
        health_status["database"] = f"unhealthy: {str(e)}"
        health_status["status"] = "degraded"
    try:
        r.ping()
        health_status["redis"] = "connected"
    except Exception:
        health_status["redis"] = "unhealthy"
        health_status["status"] = "degraded"
    return health_status

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    rid = getattr(request.state, 'request_id', 'unknown')
    logger.critical(f"Unhandled Exception [{rid}]: {str(exc)}")
    return JSONResponse(
        status_code=500, 
        content={"error": "internal_server_error", "request_id": rid, "message": "An unexpected error occurred."}
    )

@app.on_event("startup")
async def startup_event():
    logger.info("OmniScan AI Backend Initializing... Connection pools established.")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("OmniScan AI Backend Shutting Down... Closing connections.")