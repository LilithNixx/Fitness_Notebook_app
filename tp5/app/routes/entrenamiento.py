from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Entrenamiento
from app.schemas.entrenamiento import EntrenamientoCreate, EntrenamientoOut
from app.utils.auth import obtener_usuario_actual
from typing import List

router = APIRouter(prefix="/entrenamientos", tags=["Entrenamientos"])

# Crear un nuevo entrenamiento
@router.post("/", response_model=EntrenamientoOut)
def crear_entrenamiento(data: EntrenamientoCreate, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    nuevo = Entrenamiento(**data.dict(), id_usuario=usuario.id_usuario)
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# Obtener todos los entrenamientos del usuario actual
@router.get("/", response_model=List[EntrenamientoOut])
def obtener_entrenamientos(db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    return db.query(Entrenamiento).filter(Entrenamiento.id_usuario == usuario.id_usuario).all()

#Obtener un entrenamiento por ID
@router.get("/{entrenamiento_id}", response_model=EntrenamientoOut)
def obtener_entrenamiento(entrenamiento_id: int, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    entrenamiento = db.query(Entrenamiento).filter_by(id_entrenamiento=entrenamiento_id, id_usuario=usuario.id_usuario).first()
    if not entrenamiento:
        raise HTTPException(status_code=404, detail="Entrenamiento no encontrado")
    return entrenamiento

#Actualizar un entrenamiento
@router.put("/{entrenamiento_id}", response_model=EntrenamientoOut)
def actualizar_entrenamiento(entrenamiento_id: int, datos: EntrenamientoCreate, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    entrenamiento = db.query(Entrenamiento).filter_by(id_entrenamiento=entrenamiento_id, id_usuario=usuario.id_usuario).first()
    if not entrenamiento:
        raise HTTPException(status_code=404, detail="Entrenamiento no encontrado")
    
    for key, value in datos.dict().items():
        setattr(entrenamiento, key, value)

    db.commit()
    db.refresh(entrenamiento)
    return entrenamiento

# Eliminar un entrenamiento
@router.delete("/{entrenamiento_id}")
def eliminar_entrenamiento(entrenamiento_id: int, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    entrenamiento = db.query(Entrenamiento).filter_by(id_entrenamiento=entrenamiento_id, id_usuario=usuario.id_usuario).first()
    if not entrenamiento:
        raise HTTPException(status_code=404, detail="Entrenamiento no encontrado")

    db.delete(entrenamiento)
    db.commit()
    return {"detalle": "Entrenamiento eliminado correctamente"}
