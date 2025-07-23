# app/schemas/medidas.py
from pydantic import BaseModel
from datetime import date
from typing import Optional

class MedidaCorporalBase(BaseModel):
    fecha: date
    peso_kg: Optional[float]
    brazo_cm: Optional[float]
    pierna_cm: Optional[float]
    cintura_cm: Optional[float]
    cadera_cm: Optional[float]

class MedidaCorporalCreate(MedidaCorporalBase):
    pass

class MedidaCorporalUpdate(MedidaCorporalBase):
    pass

class MedidaCorporalOut(MedidaCorporalBase):
    id_medida: int

    class Config:
        orm_mode = True
