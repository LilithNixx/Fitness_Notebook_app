# app/routes/estado_animo.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.auth import get_current_user
from app.schemas.estado_animo import EstadoAnimoOut
from app.schemas.estado_animo import EstadoAnimoCreate
from app.schemas.estado_animo import EstadoAnimoUpdate


router = APIRouter(prefix="/estado-animo", tags=["Estado de Ánimo"])

@router.get("/", response_model=list[EstadoAnimoOut])
def listar_estados(db: Session = Depends(get_db), usuario: models.Usuario = Depends(get_current_user)):
    return db.query(models.EstadoAnimo).filter_by(id_usuario=usuario.id_usuario).order_by(models.EstadoAnimo.fecha.desc()).all()

@router.post("/", response_model= EstadoAnimoOut)
def crear_estado(estado: EstadoAnimoCreate, db: Session = Depends(get_db), usuario: models.Usuario = Depends(get_current_user)):
    nuevo_estado = models.EstadoAnimo(**estado.dict(), id_usuario=usuario.id_usuario)
    db.add(nuevo_estado)
    db.commit()
    db.refresh(nuevo_estado)
    return nuevo_estado

@router.put("/{id_estado}", response_model= EstadoAnimoOut)
def actualizar_estado(id_estado: int, estado: EstadoAnimoUpdate, db: Session = Depends(get_db), usuario: models.Usuario = Depends(get_current_user)):
    estado_db = db.query(models.EstadoAnimo).filter_by(id_estado=id_estado, id_usuario=usuario.id_usuario).first()
    if not estado_db:
        raise HTTPException(status_code=404, detail="Estado de ánimo no encontrado")
    for campo, valor in estado.dict().items():
        setattr(estado_db, campo, valor)
    db.commit()
    db.refresh(estado_db)
    return estado_db

@router.delete("/{id_estado}")
def eliminar_estado(id_estado: int, db: Session = Depends(get_db), usuario: models.Usuario = Depends(get_current_user)):
    estado_db = db.query(models.EstadoAnimo).filter_by(id_estado=id_estado, id_usuario=usuario.id_usuario).first()
    if not estado_db:
        raise HTTPException(status_code=404, detail="Estado de ánimo no encontrado")
    db.delete(estado_db)
    db.commit()
    return {"ok": True, "mensaje": "Estado eliminado"}