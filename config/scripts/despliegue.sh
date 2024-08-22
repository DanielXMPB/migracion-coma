#!/bin/bash

# Lista de nombres o IDs de los contenedores
escuelas=(
    "coma_esgeo"
    "coma_eip"
)

for escuela in "${escuelas[@]}"; do
  echo "Ejecutando comando en el contenedor $escuela"
  docker stop "$escuela"
  docker cp eisi.war "$escuela":/datadrive/tomcat/webapps/
  docker start "$escuela"
  echo "Comnados finalizados en el contenedor $escuela"
done