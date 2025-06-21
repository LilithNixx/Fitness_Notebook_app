# app/models/models.py

from sqlalchemy import Column, Integer, String, Date, Enum, DECIMAL, Boolean, TIMESTAMP, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    contraseña = Column(String(255), nullable=False)
    genero = Column(Enum('femenino', 'masculino', 'otro'), default='otro')
    fecha_nacimiento = Column(Date)
    peso_inicial = Column(DECIMAL(5, 2))
    altura_cm = Column(Integer)
    objetivo = Column(Enum('ganar_masa', 'perder_grasa', 'mantenerse', 'otro'), default='mantenerse')
    nivel_entrenamiento = Column(Enum('principiante', 'intermedio', 'avanzado'), default='principiante')
    fecha_registro = Column(TIMESTAMP, server_default=func.now())

    entrenamientos = relationship("Entrenamiento", back_populates="usuario")
    medidas = relationship("MedidaCorporal", back_populates="usuario")
    estados_animo = relationship("EstadoAnimo", back_populates="usuario")
    alimentaciones = relationship("Alimentacion", back_populates="usuario")


class Entrenamiento(Base):
    __tablename__ = "entrenamiento"

    id_entrenamiento = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha = Column(Date)
    ejercicio = Column(String(100))
    series = Column(Integer)
    repeticiones = Column(String(20))
    peso = Column(DECIMAL(5, 2))

    usuario = relationship("Usuario", back_populates="entrenamientos")


class MedidaCorporal(Base):
    __tablename__ = "medidas_corporales"

    id_medida = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha = Column(Date)
    peso_kg = Column(DECIMAL(5, 2))
    brazo_cm = Column(DECIMAL(5, 2))
    pierna_cm = Column(DECIMAL(5, 2))
    cintura_cm = Column(DECIMAL(5, 2))
    cadera_cm = Column(DECIMAL(5, 2))

    usuario = relationship("Usuario", back_populates="medidas")


class EstadoAnimo(Base):
    __tablename__ = "estado_animo"

    id_estado = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha = Column(Date)
    estado_animo = Column(String(50))
    siente_progreso = Column(Boolean)
    motivacion = Column(Integer)

    usuario = relationship("Usuario", back_populates="estados_animo")


class Alimentacion(Base):
    __tablename__ = "alimentacion"

    id_alimentacion = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha = Column(Date)
    calorias = Column(Integer)
    proteinas = Column(DECIMAL(5, 2))
    agua_litros = Column(DECIMAL(4, 2))

    usuario = relationship("Usuario", back_populates="alimentaciones")

