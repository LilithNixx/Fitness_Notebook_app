📓 Fitness Notebook

Fitness Notebook es una aplicación web full stack para el seguimiento personalizado de entrenamientos, alimentación, medidas corporales y estado de ánimo. Su objetivo es ayudar a los usuarios a registrar su progreso físico y emocional, visualizar estadísticas y tomar decisiones informadas sobre su bienestar.

🚀 Proyecto desarrollado como parte de la materia Desarrollo Full Stack, con backend en FastAPI, frontend en React y despliegue en la nube con Docker y Azure.

✨ Características principales

👤 Gestión de usuarios con inicio de sesión.

🏋️ Entrenamientos: registro de ejercicios, series, repeticiones y peso, organizados por grupos musculares.

📏 Medidas corporales: evolución de peso, brazos, piernas, cintura y cadera.

🍽️ Alimentación: seguimiento de calorías, proteínas y agua consumida.

🙂 Estado de ánimo: registro de emociones, motivación y percepción de progreso.

📊 Análisis de datos: visualización de estadísticas claras y modernas, inspiradas en YouTube Studio.

☁️ Despliegue en la nube con contenedores Docker y Nginx.

🛠️ Tecnologías utilizadas
Backend

FastAPI

Python

MySQL

SQLAlchemy

Frontend

React

Bootstrap

Recharts (gráficos interactivos)

Infraestructura

Docker & Docker Compose

Nginx

Azure

⚙️ Instalación y ejecución
🔧 Prerrequisitos

Docker

Docker Compose

▶️ Pasos para ejecutar en local

Clonar el repositorio:

git clone https://github.com/tuusuario/fitness-notebook.git
cd fitness-notebook


Levantar los contenedores con Docker Compose:

docker-compose up --build


Acceder desde el navegador:

Frontend: http://localhost:3000

Backend: http://localhost:8000/docs

📂 Estructura del proyecto
fitness-notebook/
│── backend/         # API con FastAPI
│   ├── app/
│   ├── requirements.txt
│── frontend/        # Interfaz en React
│   ├── src/
│   ├── package.json
│── docker-compose.yml
│── nginx.conf

🚧 Problemas encontrados y soluciones

🔀 Problemas con rutas en la migración a MV → Ajuste de rutas absolutas/relativas.

🎨 Estilos de Bootstrap no aplicados → Configuración correcta de importaciones.

🌐 CORS → Configuración en FastAPI con allow_origins para frontend y backend.

⚡ Despliegue con Nginx → Ajuste de MIME types para servir archivos estáticos correctamente.

🌟 Próximas mejoras

🔐 Autenticación con JWT.

📱 Diseño responsive mejorado.

📈 Más análisis de datos personalizados.

💡 Recomendaciones automáticas según progreso del usuario.

👥 Autores

Proyecto desarrollado por Lilith y equipo para la materia Desarrollo Full Stack.
