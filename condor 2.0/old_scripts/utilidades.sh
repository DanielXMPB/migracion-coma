# Script para copiar los archivos de el crontab en cada escuela

# Lista de nombres o IDs de los contenedores
source ../config/config_escuelas.sh

for escuela in "${containers_escuelas[@]}"; do
  # Crear carpeta si no existe
  mkdir -p /datadrive/maintenance/

  # Copiar archivos dentro del contenedor
  docker cp ../other/maintenance.jar "$escuela":/datadrive/maintenance/
  docker cp ../other/config.properties "$escuela":/datadrive/maintenance/
  docker cp ../other/crontabs/"$escuela"/crontab "$escuela":/etc/cron.d/

  # Configurar permisos para el archivo crontab
  docker exec "$escuela" chmod 0644 /etc/cron.d/crontab

  # Iniciar crontab
  docker exec "$escuela" crontab /etc/cron.d/crontab

  # Iniciar el servicio cron dentro del contenedor
  docker exec "$escuela" cron start
done