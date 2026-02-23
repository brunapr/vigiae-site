from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import enum

class InspectionStatus(str, enum.Enum):
    OPEN = "open"
    PENDING = "pending"
    IN_ACCORDANCE = "in_accordance"
    TOTAL_CLOSURE = "total_closure"
    PARTIAL_CLOSURE = "partial_closure"

class InspectionUrgency(str, enum.Enum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    CRITICAL = "critial"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    inspections = relationship("Inspection", back_populates="inspector")

class Inspection(Base):
    __tablename__ = "inspections"
    
    id = Column(Integer, primary_key=True, index=True)
    establishment_name = Column(String, index=True)
    establishment_address = Column(String)
    inspected_at = Column(DateTime)
    status = Column(Enum(InspectionStatus), default=InspectionStatus.OPEN)
    description = Column(String, nullable=True)
    urgency = Column(Enum(InspectionUrgency), default=InspectionUrgency.NORMAL)
    needs_imediate_closure = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    @property
    def establishment(self):
        return {
            "name": self.establishment_name,
            "address": self.establishment_address
        }

    inspector_id = Column(Integer, ForeignKey("users.id"))
    inspector = relationship("User", back_populates="inspections")