# Etapa 1: Build de la app React
FROM node:20-slim AS builder
# 
# Update system packages to reduce vulnerabilities
RUN apt-get update && apt-get upgrade -y && apt-get clean


WORKDIR /app

# Copiamos los archivos del frontend
COPY . .

# Instalamos dependencias y generamos build
RUN npm install
RUN npm run build

# Etapa 2: Servir la app con Nginx
FROM nginx:1.25.5-alpine

# Copiamos el build generado en la etapa anterior a la carpeta que Nginx sirve por defecto
COPY --from=builder /app/build /usr/share/nginx/html

# Exponemos el puerto 80 (por defecto en Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
