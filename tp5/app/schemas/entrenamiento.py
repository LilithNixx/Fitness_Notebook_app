from pydantic import BaseModel
from datetime import date
from decimal import Decimal
#from typing import Optional

class EntrenamientoBase(BaseModel):
    fecha: date
    ejercicio: str
    series: int
    repeticiones: int
    peso: Decimal

class EntrenamientoCreate(EntrenamientoBase):
    pass

class EntrenamientoOut(EntrenamientoBase):
    id_entrenamiento: int
    class Config:
        from_attributes = True
