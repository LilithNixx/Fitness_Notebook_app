# app/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ⚠️ Reemplazá estos valores con los de tu base de datos
MYSQL_USER = "root"
MYSQL_PASSWORD = "123456789"
MYSQL_HOST = "localhost"
MYSQL_PORT = "3306"
MYSQL_DB = "Fitness_Notebook"

DATABASE_URL = (
    "mysql+pymysql://root:123456789@localhost:3306/Fitness_Notebook"
)

# Crear motor de conexión
engine = create_engine(DATABASE_URL, echo=True)

# Crear sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()