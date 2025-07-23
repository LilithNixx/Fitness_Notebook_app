# app/schemas/estado_animo.py
from pydantic import BaseModel
from datetime import date

class EstadoAnimoBase(BaseModel):
    fecha: date
    estado_animo: str
    siente_progreso: bool
    motivacion: int

class EstadoAnimoCreate(EstadoAnimoBase):
    pass

class EstadoAnimoUpdate(EstadoAnimoBase):
    pass

class EstadoAnimoOut(EstadoAnimoBase):
    id_estado: int

    class Config:
        orm_mode = True
