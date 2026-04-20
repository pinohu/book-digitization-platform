from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uuid
from datetime import datetime

from .database import get_db
from .models import User, Venture, Agent
from .tasks import analyze_funnel, create_growth_plan
from .redis import get_redis

app = FastAPI(
    title="AI ∞ OS API",
    description="The Infinite Operating System for Intelligence, Infrastructure, and Adaptive Empire Creation",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to AI ∞ OS API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/ventures", response_model=List[Venture])
async def get_ventures(db: Session = Depends(get_db)):
    return db.query(Venture).all()

@app.post("/ventures", response_model=Venture)
async def create_venture(venture_data: dict, db: Session = Depends(get_db)):
    # Create new venture
    venture = Venture(
        id=str(uuid.uuid4()),
        name=venture_data["name"],
        description=venture_data.get("description", ""),
        industry=venture_data.get("industry", ""),
        status="draft",
        owner_id=venture_data["owner_id"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        metadata=venture_data.get("metadata", {})
    )
    
    db.add(venture)
    db.commit()
    db.refresh(venture)
    
    # Trigger growth plan creation
    create_growth_plan.delay(venture.id, venture_data)
    
    return venture

@app.post("/ventures/{venture_id}/analyze-funnel")
async def trigger_funnel_analysis(venture_id: str, funnel_data: dict, db: Session = Depends(get_db)):
    # Verify venture exists
    venture = db.query(Venture).filter(Venture.id == venture_id).first()
    if not venture:
        raise HTTPException(status_code=404, detail="Venture not found")
    
    # Trigger funnel analysis
    task = analyze_funnel.delay(venture_id, funnel_data)
    
    return {"task_id": task.id, "status": "started"}

@app.get("/ventures/{venture_id}/agents", response_model=List[Agent])
async def get_venture_agents(venture_id: str, db: Session = Depends(get_db)):
    return db.query(Agent).filter(Agent.venture_id == venture_id).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 