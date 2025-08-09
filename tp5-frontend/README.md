# Fitness Notebook

Aplicación web para seguimiento, análisis y mejora de entrenamiento físico, estado de ánimo, alimentación y medidas corporales.

---

## Tecnologías utilizadas

- **Backend:** FastAPI (Python)
- **Frontend:** React.js
- **Base de datos:** MySQL 8.0
- **ORM:** SQLAlchemy
- **Autenticación:** JWT (JSON Web Tokens)
- **Servidor HTTP / Proxy inverso:** Nginx (sirve frontend y enruta `/api/` al backend)
- **Contenerización:** Docker y Docker Compose
- **Manejo de estado en frontend:** React Hooks (useState, useEffect)
- **Middleware:** CORS en FastAPI para comunicación segura entre frontend y backend
- **Gestión de rutas frontend:** React Router
- **Control de versiones:** Git

---

## Arquitectura

- El backend expone una API REST en `http://localhost:8000/api/`
- El frontend se sirve a través de Nginx y consume la API a través de la ruta `/api/`
- El proxy inverso en Nginx dirige `/api/` al backend para evitar problemas de CORS y simplificar configuración de URLs.
- Docker Compose orquesta los contenedores de base de datos, backend, frontend y Nginx.

---

## Cómo levantar la aplicación

1. Clonar el repositorio:

   ```bash
   git clone <URL_DEL_REPO>
   cd <NOMBRE_DEL_REPO>