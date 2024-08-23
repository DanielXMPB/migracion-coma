#!/bin/bash

# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

for escuela in "${escuelas[@]}"; do
  # Crear carpeta si no existe
  mkdir -p /datadrive/maintenance/

  # Copiar archivos dentro del contenedor
  docker cp ../maintenance.jar "$escuela":/datadrive/maintenance/
  docker cp ../config.properties "$escuela":/datadrive/maintenance/
  docker cp ../crontabs/"$escuela"/crontab "$escuela":/etc/cron.d/

  # Configurar permisos para el archivo crontab
  docker exec "$escuela" chmod 0644 /etc/cron.d/crontab

  # Iniciar crontab
  docker exec "$escuela" crontab /etc/cron.d/crontab

  # Iniciar el servicio cron dentro del contenedor
  docker exec "$escuela" cron start
done