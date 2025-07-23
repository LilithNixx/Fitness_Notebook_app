from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Alimentacion
from app.schemas.alimentacion import AlimentacionCreate, AlimentacionOut
from app.utils.auth import obtener_usuario_actual
from typing import List

router = APIRouter(prefix="/alimentacion", tags=["Alimentación"])

@router.post("/", response_model=AlimentacionOut)
def crear_registro(data: AlimentacionCreate, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    nuevo = Alimentacion(**data.dict(), id_usuario=usuario.id_usuario)
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.get("/", response_model=List[AlimentacionOut])
def obtener_registros(db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    return db.query(Alimentacion).filter(Alimentacion.id_usuario == usuario.id_usuario).all()

@router.get("/{id_alimentacion}", response_model=AlimentacionOut)
def obtener_registro(id_alimentacion: int, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    registro = db.query(Alimentacion).filter_by(id_alimentacion=id_alimentacion, id_usuario=usuario.id_usuario).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    return registro

@router.put("/{id_alimentacion}", response_model=AlimentacionOut)
def actualizar_registro(id_alimentacion: int, datos: AlimentacionCreate, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    registro = db.query(Alimentacion).filter_by(id_alimentacion=id_alimentacion, id_usuario=usuario.id_usuario).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    
    for key, value in datos.dict().items():
        setattr(registro, key, value)

    db.commit()
    db.refresh(registro)
    return registro

@router.delete("/{id_alimentacion}")
def eliminar_registro(id_alimentacion: int, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    registro = db.query(Alimentacion).filter_by(id_alimentacion=id_alimentacion, id_usuario=usuario.id_usuario).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    db.delete(registro)
    db.commit()
    return {"detalle": "Registro eliminado correctamente"}

