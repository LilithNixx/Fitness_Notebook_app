from pydantic import BaseModel
from datetime import date

class AlimentacionBase(BaseModel):
    fecha: date
    calorias: int
    proteinas: float
    agua_litros: float

class AlimentacionCreate(AlimentacionBase):
    pass

class AlimentacionOut(AlimentacionBase):
    id_alimentacion: int

    class Config:
        orm_mode = True

