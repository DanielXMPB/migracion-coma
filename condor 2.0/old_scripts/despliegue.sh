#!/bin/bash

# Lista de nombres o IDs de los contenedores
. ../config/config_escuelas.sh

for escuela in "${containers_escuelas[@]}"; do
  echo "Ejecutando comando en el contenedor $escuela"

  # Detener el contenedor
  docker stop "$escuela"

  # Copiar .war para despliegue
  docker cp ../other/build/eisi.war "$escuela":/datadrive/tomcat/webapps/

  # Reiniciar el contenedor para asegurar que todos los cambios se apliquen
  docker start "$escuela"

  echo "Comnados finalizados en el contenedor $escuela"
done