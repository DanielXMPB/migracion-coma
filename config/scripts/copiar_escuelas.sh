# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

for escuela in "${escuelas[@]}"; do
  echo "Moviendo archivos de la escuela en la carpeta designada de: $escuela"

  mkdir -p /datadrive/migracion-coma/files/$escuela/css
  mkdir -p /datadrive/migracion-coma/files/$escuela/images
  mkdir -p /datadrive/migracion-coma/files/$escuela/ArchivosProfesores
  mkdir -p /datadrive/migracion-coma/files/$escuela/WebProfesor
  mkdir -p /datadrive/migracion-coma/files/$escuela/grupo
  mkdir -p /datadrive/migracion-coma/files/$escuela/Profesores
  mkdir -p /datadrive/migracion-coma/files/$escuela/archivos

  mv -f /datadrive/coma_files/$escuela/webapps/css/* /datadrive/migracion-coma/files/$escuela/css/
  mv -f /datadrive/coma_files/$escuela/webapps/images/* /datadrive/migracion-coma/files/$escuela/images/
  mv -f /datadrive/coma_files/$escuela/webapps/ArchivosProfesores/* /datadrive/migracion-coma/files/$escuela/ArchivosProfesores/
  mv -f /datadrive/coma_files/$escuela/webapps/WebProfesor/* /datadrive/migracion-coma/files/$escuela/WebProfesor/
  mv -f /datadrive/coma_files/$escuela/webapps/grupo/* /datadrive/migracion-coma/files/$escuela/grupo/
  mv -f /datadrive/coma_files/$escuela/archivos/* /datadrive/migracion-coma/files/$escuela/archivos/

  find /datadrive/coma_files/$escuela/webapps/Profesores/ -mindepth 1 -maxdepth 1 ! -name 'eisi' -exec mv {} /datadrive/migracion-coma/files/$escuela/Profesores/ \;

  echo "Finaliza la escuela: $escuela"
done