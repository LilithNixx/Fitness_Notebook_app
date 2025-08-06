# app/main.py
from fastapi import FastAPI
from app.routes import usuarios, inicio, entrenamiento, medidas, estado_animo, alimentacion
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

import app.models

app = FastAPI(title="Fitness Notebook API")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(usuarios.router, prefix="/api", tags=["Usuarios"])
app.include_router(inicio.router, prefix="/api", tags=["Inicio"])
app.include_router(entrenamiento.router, prefix="/api", tags=["Entrenamiento"])
app.include_router(medidas.router, prefix="/api", tags=["Medidas"])
app.include_router(estado_animo.router, prefix="/api", tags=["Estado de Ánimo"])
app.include_router(alimentacion.router, prefix="/api", tags=["Alimentación"])

# Endpoint de prueba para verificar que el backend está corriendo
@app.get("/ping")
async def ping():
    return {"message": "pong"}

# Crear tablas al iniciar si no existen
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
