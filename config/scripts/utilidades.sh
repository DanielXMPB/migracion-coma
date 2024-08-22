#!/bin/bash

# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

for escuela in "${escuelas[@]}"; do
  # Copiar archivos dentro del contenedor
  docker cp config/maintenance.jar "$escuela":/datadrive/maintenance/
  docker cp config/config.properties "$escuela":/datadrive/maintenance/
  docker cp config/crontab/"$escuela"/crontab "$escuela":/etc/cron.d/

  # Configurar permisos para el archivo crontab
  docker exec "$escuela" chmod 0644 /etc/cron.d/crontab

  # Iniciar el servicio cron dentro del contenedor
  docker exec "$escuela" cron start
done