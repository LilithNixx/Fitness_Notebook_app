from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional
from datetime import date

# Para asegurar consistencia con los ENUM de la base
class GeneroEnum(str, Enum):
    femenino = "femenino"
    masculino = "masculino"
    otro = "otro"

class ObjetivoEnum(str, Enum):
    ganar_masa = "ganar_masa"
    perder_grasa = "perder_grasa"
    mantenerse = "mantenerse"
    otro = "otro"

class NivelEntrenamientoEnum(str, Enum):
    principiante = "principiante"
    intermedio = "intermedio"
    avanzado = "avanzado"

# Esquema para crear un usuario (registro)
class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    contraseña: str
    genero: GeneroEnum
    fecha_nacimiento: Optional[date]
    peso_inicial: Optional[float]
    altura_cm: Optional[int]
    objetivo: Optional[ObjetivoEnum]
    nivel_entrenamiento: Optional[NivelEntrenamientoEnum]

# Esquema para mostrar al usuario sin contraseña
class UsuarioOut(BaseModel):
    id_usuario: int
    nombre: str
    email: EmailStr
    genero: GeneroEnum

    class Config:
        orm_mode = True
