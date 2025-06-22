from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Entrenamiento
from app.schemas.entrenamiento import EntrenamientoCreate, EntrenamientoOut
from app.utils.auth import obtener_usuario_actual
from typing import List
from sqlalchemy import func


router = APIRouter(prefix="/entrenamientos", tags=["Entrenamientos"])


@router.get("/progreso-peso")
def progreso_peso(db: Session = Depends(get_db), usuario = Depends(obtener_usuario_actual)):
    try:
        # Hacemos una consulta a la base de datos para obtener, por fecha y ejercicio,
        # el peso máximo levantado en cada sesión de entrenamiento para el usuario actual.
        resultados = (
            db.query(
                Entrenamiento.fecha,                     # Seleccionamos la fecha del entrenamiento
                Entrenamiento.ejercicio,                 # Seleccionamos el nombre del ejercicio
                func.max(Entrenamiento.peso).label("peso_max")  # Calculamos el peso máximo levantado ese día en ese ejercicio
            )
            .filter(Entrenamiento.id_usuario == usuario.id_usuario)  # Filtramos por usuario actual
            .group_by(Entrenamiento.fecha, Entrenamiento.ejercicio)  # Agrupamos resultados por fecha y ejercicio
            .order_by(Entrenamiento.fecha)                           # Ordenamos por fecha ascendente
            .all()                                                    # Ejecutamos la consulta y obtenemos todos los resultados
        )

        # Si no hay resultados, lanzamos un error 404
        if not resultados:
            raise HTTPException(status_code=404, detail="No hay datos para este usuario")

        # Organizamos los resultados en un diccionario para facilitar el consumo en frontend
        data = {}
        for fecha, ejercicio, peso_max in resultados:
            if ejercicio not in data:
                data[ejercicio] = []  # Creamos la lista para ese ejercicio si no existe
            # Añadimos un objeto con la fecha (como string ISO) y el peso máximo (float)
            data[ejercicio].append({
                "fecha": fecha.isoformat(),
                "peso": float(peso_max)
            })

        # Devolvemos el diccionario con los datos listos para graficar
        return data

    except Exception as e:
        print("Error en progreso_peso:", str(e))
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")



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


