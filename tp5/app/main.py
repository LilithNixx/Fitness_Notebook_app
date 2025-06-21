# app/main.py
from fastapi import FastAPI
from app.routes import usuarios, inicio,entrenamiento
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

# Importa los modelos para que se registren en Base.metadata
import app.models

# Crea las tablas en la base de datos si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fitness Notebook API")

# Incluir las rutas
app.include_router(usuarios.router, prefix="/api")
app.include_router(inicio.router, prefix="/api")
app.include_router(entrenamiento.router, prefix="/api")


#CORS Middleware para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)