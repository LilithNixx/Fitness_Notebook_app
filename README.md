🧾 Fitness Notebook

Fitness Notebook es una aplicación web full-stack para el seguimiento físico y alimentario. Permite registrar entrenamientos, medidas corporales, alimentación y estado de ánimo; además ofrece gráficos para visualizar la evolución y un sistema de autenticación con JWT.

🧩 Funcionalidades principales

Registro y autenticación de usuarios (JWT).

CRUD de entrenamientos, medidas corporales, alimentación y estado de ánimo.

Visualización de estadísticas y gráficos (e.g. evolución de peso, volumen de entrenamiento).

Interfaz SPA en React + Bootstrap.

API REST en FastAPI (Python) con MySQL como persistencia.

Despliegue con Docker Compose y Nginx como proxy inverso.

🛠 Tecnologías

Backend: Python, FastAPI, SQLAlchemy, MySQL
Frontend: React, Bootstrap, Axios, Recharts
Infra & despliegue: Docker, Docker Compose, Nginx, Azure (VM)
Herramientas de debug: curl (para probar endpoints), logs de Docker

📁 Estructura del proyecto (ejemplo)
Fitness_Notebook_app/
├── tp5/                 # backend (FastAPI)
├── tp5-frontend/        # frontend (React)
├── nginx/               # nginx.conf, Dockerfile.nginx
├── docker-compose.yml
└── README.md

▶️ Levantar la app (rápido con Docker Compose)

Recomendado: ejecutar desde la raíz del proyecto (donde está docker-compose.yml).

# Levantar (construir imágenes y correr contenedores)
docker compose up -d --build

# Ver logs (ejemplo)
docker compose logs -f nginx backend db


Para bajar y limpiar (opcional, borra volúmenes e imágenes creadas por compose):

docker compose down -v --rmi all --remove-orphans

🔧 Archivos clave (snippets)
Dockerfile (backend)
# tp5/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

Dockerfile (frontend) — multi-stage build
# tp5-frontend/Dockerfile (ejemplo)
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

Dockerfile para Nginx (usado si generás build dentro de nginx)
# nginx/Dockerfile.nginx (si usás multi-stage en nginx)
FROM node:18-alpine as build-stage
WORKDIR /app
COPY ./tp5-frontend/package*.json ./
RUN npm install
COPY ./tp5-frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

docker-compose.yml (resumen)
version: "3.9"
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: "CAMBIAR_PWD"
      MYSQL_DATABASE: Fitness_Notebook
    ports: ["3307:3306"]
    volumes: ["mysql-data:/var/lib/mysql"]
    networks: ["mynetwork"]

  backend:
    build: ./tp5
    container_name: backend-app
    environment:
      DB_USER: root
      DB_PASSWORD: 123456789
      DB_HOST: db
      DB_PORT: 3306
      DB_NAME: Fitness_Notebook
    ports: ["8000:8000"]
    networks: ["mynetwork"]
    depends_on:
      db:
        condition: service_healthy

  nginx:
    build:
      context: .
      dockerfile: ./nginx/Dockerfile.nginx
    container_name: nginx-proxy
    ports: ["80:80"]
    networks: ["mynetwork"]
    depends_on:
      - backend

volumes:
  mysql-data:

networks:
  mynetwork:

nginx.conf (config usada - proxy inverso + mime types)
events {}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  server {
    listen 80;

    location /static/ {
      root /usr/share/nginx/html;
    }

    location / {
      root /usr/share/nginx/html;
      index index.html;
      try_files $uri /index.html;
    }

    location /api/ {
      proxy_pass http://backend:8000/api/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}

🔐 Variables de entorno (.env)

No subir .env a Git. Ejemplo (.env del backend y otro para frontend si hacen falta):

# backend .env
DB_HOST=db
DB_USER=root
DB_PASSWORD=123456789
DB_NAME=Fitness_Notebook
SECRET_KEY=CAMBIAR_POR_SECRETO

# frontend .env (React)
REACT_APP_API_BASE=http://20.81.146.173


Importante: En producción no dejar credenciales en texto plano.

🧪 Endpoints útiles (ejemplos)

POST /api/usuarios/ → Registrar usuario (ej.: nombre, email, contraseña, genero, fecha_nacimiento, peso_inicial, altura_cm, objetivo, nivel_entrenamiento)

POST /api/login → Login → devuelve { access_token, token_type }

GET /api/entrenamientos/ → Listar (requiere Authorization: Bearer <token>)

POST /api/entrenamientos/ → Crear (requiere token)

GET /api/medidas/ → Listar medidas (requiere token)

Ejemplo curl — registrar usuario
curl -X POST "http://20.81.146.173/api/usuarios/" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Daniela",
    "email":"daniela@example.com",
    "contraseña":"TU_PASSWORD",
    "genero":"femenino",
    "fecha_nacimiento":"1990-01-01",
    "peso_inicial":65.5,
    "altura_cm":170,
    "objetivo":"perder_grasa",
    "nivel_entrenamiento":"principiante"
  }'

Ejemplo curl — login
curl -X POST "http://20.81.146.173/api/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"daniela@example.com","contraseña":"TU_PASSWORD"}'

🐞 Problemas reales encontrados & cómo se resolvieron

Incluí esto tal cual para mostrar el proceso y las soluciones en el informe.

Rutas y despliegue entre local y MV (Azure):

Problema: en local el docker-compose y las rutas funcionaban; al pasar a la VM las rutas relativas/absolutas y contextos de build cambiaron y provocaron 404 y servir archivos equivocados.

Solución: uniformizar el contexto de build, usar proxy_pass correcto en Nginx (ver nota sobre la barra final), y reconstruir imágenes desde la raíz (context: .).

Proxy inverso y prefijo /api (trailing slash):

Problema: proxy_pass http://backend:8000/ eliminaba el prefijo /api/ y las rutas no coincidían → 404.

Solución: usar proxy_pass http://backend:8000/api/; o reescribir con rewrite ^/api/(.*)$ /$1 break; según el diseño. Explicar esto en el informe: la barra final cambia la concatenación de rutas en Nginx.

Archivos estáticos servidos con Content-Type: text/plain:

Problema: CSS/JS llegaban con text/plain y el navegador no aplicaba estilos.

Solución: incluir include /etc/nginx/mime.types; en nginx.conf y evitar overrides que forzaran text/plain.

CORS:

Problema: llamadas bloqueadas desde el navegador en desarrollo.

Solución: configurar CORSMiddleware en FastAPI con allow_origins apropiados (http://localhost, http://localhost:3000, http://20.81.146.173, etc.) y reiniciar la app.

Docker socket / permisos (al inicializ ar Docker en VM):

Problema: permission denied al conectar con /var/run/docker.sock.

Solución rápida: usar sudo o agregar el usuario al grupo docker (sudo usermod -aG docker $USER) y reconectar la sesión.

Volúmenes montados sobrescribiendo build:

Problema: Nginx servía la carpeta ./tp5-frontend/build del host aunque la imagen generada tenía otro build (diferen cia entre build en contenedor y host).

Solución: usar multi-stage build y copiar el build a la imagen de Nginx o asegurarse de compilar localmente y actualizar ./tp5-frontend/build.

Uso de curl para prueba rápida:

curl fue esencial para probar endpoints, comprobar tokens JWT y confirmar respuestas JSON antes de depurar el frontend.

✅ Buenas prácticas / workflow recomendado (Git)

Mantener una rama estable (pruebas o main) con la versión que corre en producción o entrega.

Crear ramas por feature (feature/login-fix, feature/nginx-config) y mergear con PRs.

Incluir .env en .gitignore y documentar variables necesarias en README (ej.: .env.example sin credenciales).

👩‍🎓 Conclusión (para el informe)

Este proyecto integró conocimientos de desarrollo full-stack (FastAPI + React), bases de datos (MySQL), contenerización (Docker) y operaciones básicas de despliegue (Nginx, Azure). Los desafíos enfrentados —rutas/conflictos de proxy, MIME types, CORS y orquestación de contenedores— permitieron consolidar la capacidad de identificar y resolver problemas reales en entornos distribuidos.

📬 Contacto / Autor

LilithNixx (Bellingeri Daniela Sol) — Trabajo práctico N°5 — Administración de Sistemas de Información. UTN FRLP.
