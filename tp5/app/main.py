# app/main.py
from fastapi import FastAPI
from app.routes import usuarios, inicio,entrenamiento, medidas, estado_animo, alimentacion
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

# Importa los modelos para que se registren en Base.metadata
import app.models

# Crea las tablas en la base de datos si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fitness Notebook API")

#CORS Middleware para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Incluir las rutas
app.include_router(usuarios.router, prefix="/api", tags=["Usuarios"])
app.include_router(inicio.router, prefix="/api", tags=["Inicio"])
app.include_router(entrenamiento.router, prefix="/api", tags=["Entrenamiento"])
app.include_router(medidas.router, prefix="/api", tags=["Medidas"]) 
app.include_router(estado_animo.router, prefix="/api", tags=["Estado de Ánimo"])
app.include_router(alimentacion.router, prefix="/api", tags=["Alimentación"])
