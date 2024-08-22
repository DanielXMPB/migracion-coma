#!/bin/bash

# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

# Ruta dentro del contenedor donde están los backups de diamante
ruta_diamante="/datadrive/backup/db/diamante"

# Ruta dentro del contenedor donde están los backups de division
ruta_division="/datadrive/backup/db/division"

# Ruta en tu sistema local donde se copian los archivos
ruta_local="/datadrive/backup/db/"

for escuela in "${escuelas[@]}"; do
  # Buscar el diamante más reciente
  diamante_reciente=$(docker exec "$escuela" bash -c "ls -t $ruta_diamante | head -n 1")

  # Crea y limpia la carpeta donde se alamcena el backup
  mkdir -p "$ruta_local/$escuela/diamante"
  rm -rf $ruta_local/$escuela/diamante/*

  # Saca el backup del contenedor a la carpeta local
  docker cp "$escuela:$ruta_diamante/$diamante_reciente" "$ruta_local/$escuela/diamante"

  # Buscar el division más reciente
  division_reciente=$(docker exec "$escuela" bash -c "ls -t $ruta_division | head -n 1")

  # Crea y limpia la carpeta donde se alamcena el backup
  mkdir -p "$ruta_local/$escuela/divison"
  rm -rf $ruta_local/$escuela/divison/*

  # Saca el backup del contenedor a la carpeta local
  docker cp "$escuela:$ruta_division/$diamante_reciente" "$ruta_local/$escuela/divison"
  echo "Backup de $escuela realizado"
done

# Ruta dentro del contenedor donde están los backups de diamante
ruta_poseidon="/datadrive/backup/db/poseidon"

# Buscar el poseidon más reciente
poseidon_reciente=$(docker exec coma_esgeo bash -c "ls -t $ruta_division | head -n 1")

# Crea y limpia la carpeta donde se alamcena el backup
mkdir -p "$ruta_local/poseidon"
rm -rf $ruta_local/poseidon/*

# Saca el backup del contenedor a la carpeta local
docker cp "coma_esgeo:$ruta_poseidon/$poseidon_reciente" "$ruta_local/poseidon"
echo "Backup de poseidon realizado"