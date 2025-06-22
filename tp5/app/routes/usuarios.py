from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models
from app.schemas.usuario import UsuarioCreate, UsuarioOut
from app.schemas.schemas import LoginRequest, TokenResponse
from app.auth_utils import hash_password
from app.utils.auth import verificar_contraseña, crear_token_de_acceso, obtener_usuario_actual

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/usuarios/", response_model=UsuarioOut)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    hashed_pass = hash_password(usuario.contraseña)
    usuario_dict = usuario.model_dump()
    usuario_dict["contraseña"] = hashed_pass
    nuevo_usuario = models.Usuario(**usuario_dict)

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
  
    print("🚀 Login recibido:", login_data)
   #LoginRequest recibe email y contraseña y se busca el usuario en la base de datos 
    usuario = db.query(models.Usuario).filter(models.Usuario.email == login_data.email).first()

    #Se verifica si la contraseña ingresada coincide con la guardada.
    if not usuario or not verificar_contraseña(login_data.contraseña, usuario.contraseña):
        
        print("❌ Credenciales incorrectas")
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    token = crear_token_de_acceso({"sub": str(usuario.id_usuario)})
    
    print("✅ Token generado:", token)
    #Se devuelve el token al frontend.
    return {"access_token": token, "token_type": "bearer"}

@router.get("/inicio")
def inicio(usuario = Depends(obtener_usuario_actual)):
    return {
        "mensaje": f"Bienvenido/a, {usuario.nombre}",
        "usuario": {
            "id": usuario.id_usuario,
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    }