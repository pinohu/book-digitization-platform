from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    ventures = relationship("Venture", back_populates="owner")

class Venture(Base):
    __tablename__ = "ventures"

    id = Column(String, primary_key=True)
    name = Column(String, index=True)
    description = Column(String)
    industry = Column(String)
    status = Column(String, default="draft")
    owner_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    metadata = Column(JSON)

    owner = relationship("User", back_populates="ventures")
    agents = relationship("Agent", back_populates="venture")

class Agent(Base):
    __tablename__ = "agents"

    id = Column(String, primary_key=True)
    name = Column(String)
    type = Column(String)
    status = Column(String, default="idle")
    venture_id = Column(String, ForeignKey("ventures.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    metadata = Column(JSON)

    venture = relationship("Venture", back_populates="agents") 