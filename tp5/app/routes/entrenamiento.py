from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Entrenamiento
from app.schemas.entrenamiento import EntrenamientoCreate, EntrenamientoOut
from app.utils.auth import obtener_usuario_actual
from typing import List
from sqlalchemy import func
from collections import defaultdict
from app.utils.agrupaciones import obtener_grupo_muscular

router = APIRouter(prefix="/entrenamientos", tags=["Entrenamientos"])

#RUTAS ESTÁTICAS
@router.get("/progreso-peso")
def progreso_peso(db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    resultados = (
        db.query(
            Entrenamiento.fecha,
            Entrenamiento.ejercicio,
            func.max(Entrenamiento.peso).label("peso_max")
        )
        .filter(Entrenamiento.id_usuario == usuario.id_usuario)
        .group_by(Entrenamiento.fecha, Entrenamiento.ejercicio)
        .order_by(Entrenamiento.fecha)
        .all()
    )

    if not resultados:
        raise HTTPException(status_code=404, detail="No hay datos para este usuario")

    data = {}
    for fecha, ejercicio, peso_max in resultados:
        grupo = obtener_grupo_muscular(ejercicio)
        if grupo not in data:
            data[grupo] = []
        data[grupo].append({
            "fecha": fecha.isoformat(),
            "peso": float(peso_max)
        })

    return data


@router.get("/volumen")
def volumen_entrenamiento(db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    entrenamientos = db.query(Entrenamiento).filter(
        Entrenamiento.id_usuario == usuario.id_usuario
    ).all()

    if not entrenamientos:
        raise HTTPException(status_code=404, detail="No hay entrenamientos registrados")

    volumen_por_semana_y_grupo = defaultdict(lambda: defaultdict(float))

    for e in entrenamientos:
        if not e.fecha:
            continue
        semana = e.fecha.strftime("%G-W%V")
        grupo = obtener_grupo_muscular(e.ejercicio)
        volumen = int(e.series or 0) * int(e.repeticiones or 0) * float(e.peso or 0)
        volumen_por_semana_y_grupo[semana][grupo] += volumen

    datos = []
    for semana, grupos in sorted(volumen_por_semana_y_grupo.items()):
        for grupo, volumen in grupos.items():
            datos.append({
                "semana": semana,
                "grupo": grupo,
                "volumen": volumen
            })

    return datos



#RUTAS DINÁMICAS
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

#Obtener un entrenamiento por ID
@router.get("/{entrenamiento_id}", response_model=EntrenamientoOut)
def obtener_entrenamiento(entrenamiento_id: int, db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    entrenamiento = db.query(Entrenamiento).filter_by(id_entrenamiento=entrenamiento_id, id_usuario=usuario.id_usuario).first()
    if not entrenamiento:
        raise HTTPException(status_code=404, detail="Entrenamiento no encontrado")
    return entrenamiento

