from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, models
from app.database import get_db
from app.dependencies import get_current_active_user, get_current_user

router = APIRouter(prefix="/inspections", tags=["inspections"])

OPEN_STATUSES = [models.InspectionStatus.OPEN, models.InspectionStatus.PENDING]
CLOSED_STATUSES = [
    models.InspectionStatus.IN_ACCORDANCE,
    models.InspectionStatus.TOTAL_CLOSURE,
    models.InspectionStatus.PARTIAL_CLOSURE
]

@router.get("/open", response_model=schemas.InspectionsList)
def get_open_inspections(
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    inspections = db.query(models.Inspection).filter(
        models.Inspection.inspector_id == current_user.id,
        models.Inspection.status.in_(OPEN_STATUSES)
    ).order_by(models.Inspection.inspected_at).all()
    
    return {
        "inspections": inspections,
        "total": len(inspections)
    }

@router.get("/all", response_model=schemas.InspectionsList)
def get_all_inspections(
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    inspections = db.query(models.Inspection).filter(
        models.Inspection.inspector_id == current_user.id,
        models.Inspection.status.in_(CLOSED_STATUSES)
    ).order_by(models.Inspection.inspected_at.desc()).all()
    
    return {
        "inspections": inspections,
        "total": len(inspections)
    }

@router.post("/", response_model=schemas.InspectionResponse)
def create_inspection(
    inspection: schemas.InspectionCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_inspection = models.Inspection(
        establishment_name=inspection.establishment.name,
        establishment_address=inspection.establishment.address,
        inspected_at=datetime.now(),
        status=inspection.status,
        description=inspection.description,
        urgency=inspection.urgency,
        needs_imediate_closure=inspection.needs_imediate_closure,
        inspector_id=current_user.id
    )
    
    db.add(db_inspection)
    db.commit()
    db.refresh(db_inspection) 
    
    return db_inspection

@router.put("/{inspection_id}", response_model=schemas.InspectionResponse)
def update_inspection(
    inspection_id: int,
    inspection_update: schemas.InspectionUpdate,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_inspection = db.query(models.Inspection).filter(
        models.Inspection.id == inspection_id,
        models.Inspection.inspector_id == current_user.id
    ).first()
    
    if not db_inspection:
        raise HTTPException(status_code=404, detail="Inspeção não encontrada")
    
    # Atualiza campos
    update_data = inspection_update.dict(exclude_unset=True)
    
    if "establishment" in update_data:
        db_inspection.establishment_name = update_data["establishment"]["name"]
        db_inspection.establishment_address = update_data["establishment"]["address"]
        del update_data["establishment"]
    
    for field, value in update_data.items():
        setattr(db_inspection, field, value)
    
    db.commit()
    db.refresh(db_inspection)
    return db_inspection

@router.delete("/{inspection_id}")
def delete_inspection(
    inspection_id: int,
    current_user: models.User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_inspection = db.query(models.Inspection).filter(
        models.Inspection.id == inspection_id,
        models.Inspection.inspector_id == current_user.id
    ).first()
    
    if not db_inspection:
        raise HTTPException(status_code=404, detail="Inspeção não encontrada")
    
    db.delete(db_inspection)
    db.commit()
    return {"message": "Inspeção deletada com sucesso"}