#!/bin/bash

# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

for escuela in "${escuelas[@]}"; do
  echo "Ejecutando comando en el contenedor $escuela"

  # Detener el contenedor
  docker stop "$escuela"

  # Copiar .war para despliegue
  docker cp ../../build/eisi.war "$escuela":/datadrive/tomcat/webapps/

  # Reiniciar el contenedor para asegurar que todos los cambios se apliquen
  docker start "$escuela"

  echo "Comnados finalizados en el contenedor $escuela"
done