# app/routes/medidas.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models
from app.utils.auth import obtener_usuario_actual
from app.schemas.medidas import MedidaCorporalOut, MedidaCorporalCreate, MedidaCorporalUpdate

router = APIRouter(prefix="/medidas", tags=["Medidas Corporales"])


@router.post("/", response_model=MedidaCorporalOut)
def crear_medida(medida: MedidaCorporalCreate, db: Session = Depends(get_db), usuario=Depends(obtener_usuario_actual)):
    nueva_medida = models.MedidaCorporal(**medida.model_dump(), id_usuario=usuario.id_usuario)
    db.add(nueva_medida)
    db.commit()
    db.refresh(nueva_medida)
    return nueva_medida


@router.get("/", response_model=List[MedidaCorporalOut])
def listar_medidas(db: Session = Depends(get_db), usuario=Depends(obtener_usuario_actual)):
    return db.query(models.MedidaCorporal).filter_by(id_usuario=usuario.id_usuario).order_by(models.MedidaCorporal.fecha.desc()).all()


@router.put("/{medida_id}", response_model=MedidaCorporalOut)
def actualizar_medida(medida_id: int, medida_actualizada: MedidaCorporalUpdate, db: Session = Depends(get_db), usuario=Depends(obtener_usuario_actual)):
    medida = db.query(models.MedidaCorporal).filter_by(id_medida=medida_id, id_usuario=usuario.id_usuario).first()
    if not medida:
        raise HTTPException(status_code=404, detail="Medida no encontrada")

    for attr, value in medida_actualizada.model_dump(exclude_unset=True).items():
        setattr(medida, attr, value)

    db.commit()
    db.refresh(medida)
    return medida


@router.delete("/{medida_id}")
def eliminar_medida(medida_id: int, db: Session = Depends(get_db), usuario=Depends(obtener_usuario_actual)):
    medida = db.query(models.MedidaCorporal).filter_by(id_medida=medida_id, id_usuario=usuario.id_usuario).first()
    if not medida:
        raise HTTPException(status_code=404, detail="Medida no encontrada")

    db.delete(medida)
    db.commit()
    return {"mensaje": "Medida eliminada"}
