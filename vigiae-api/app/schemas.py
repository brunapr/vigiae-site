from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from app.models import InspectionStatus, InspectionUrgency

# === USER ===
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    
    class Config:
        from_attributes = True

# === TOKEN ===
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# === INSPECTION ===
class EstablishmentBase(BaseModel):
    name: str
    address: str

class InspectionCreate(BaseModel):
    establishment: EstablishmentBase
    inspected_at: datetime
    status: InspectionStatus = InspectionStatus.OPEN
    description: Optional[str] = None
    urgency: InspectionUrgency = InspectionUrgency.NORMAL
    needs_imediate_closure: bool = False

class InspectionUpdate(BaseModel):
    establishment: Optional[EstablishmentBase] = None
    inspected_at: Optional[datetime] = None
    status: Optional[InspectionStatus] = None
    description: Optional[str] = None
    urgency: Optional[InspectionUrgency] = None
    needs_imediate_closure: Optional[bool] = None

class InspectionResponse(BaseModel):
    id: int
    establishment: EstablishmentBase
    inspected_at: datetime
    status: InspectionStatus
    description: Optional[str]
    urgency: InspectionUrgency
    needs_imediate_closure: bool
    created_at: datetime
    updated_at: datetime
    inspector_id: int
    
    class Config:
        from_attributes = True

class InspectionsList(BaseModel):
    inspections: List[InspectionResponse]
    total: int