# app/routes/inicio.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.utils.auth import obtener_usuario_actual
from app import models

router = APIRouter()

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/inicio")
def inicio(
    usuario: models.Usuario = Depends(obtener_usuario_actual),
    db: Session = Depends(get_db)
):
    return {
        "mensaje": f"Bienvenido/a, {usuario.nombre}",
        "usuario": {
            "id": usuario.id_usuario,
            "nombre": usuario.nombre,
            "email": usuario.email
        },
        "opciones": [
            {"ruta": "/entrenamientos", "nombre": "Registrar o ver entrenamientos"},
            {"ruta": "/alimentacion", "nombre": "Registrar alimentación"},
            {"ruta": "/medidas", "nombre": "Registrar medidas corporales"},
            {"ruta": "/estado-animo", "nombre": "Registrar estado de ánimo"},
        ]
    }
