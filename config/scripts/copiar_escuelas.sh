# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

for escuela in "${escuelas[@]}"; do
  echo "Moviendo archivos de la escuela en la carpeta designada de: $escuela"

  mkdir -p /datadrive/coma_files/files/$escuela/css
  mkdir -p /datadrive/coma_files/files/$escuela/images
  mkdir -p /datadrive/coma_files/files/$escuela/ArchivosProfesores
  mkdir -p /datadrive/coma_files/files/$escuela/WebProfesor
  mkdir -p /datadrive/coma_files/files/$escuela/grupo
  mkdir -p /datadrive/coma_files/files/$escuela/Profesores
  mkdir -p /datadrive/coma_files/files/$escuela/archivos

  mv -f /datadrive/coma_files/$escuela/webapps/eisi/css/* /datadrive/coma_files/files/$escuela/css/
  mv -f /datadrive/coma_files/$escuela/webapps/eisi/images/* /datadrive/coma_files/files/$escuela/images/
  mv -f /datadrive/coma_files/$escuela/webapps/eisi/ArchivosProfesores/* /datadrive/coma_files/files/$escuela/ArchivosProfesores/
  mv -f /datadrive/coma_files/$escuela/webapps/eisi/WebProfesor/* /datadrive/coma_files/files/$escuela/WebProfesor/
  mv -f /datadrive/coma_files/$escuela/webapps/eisi/grupo/* /datadrive/coma_files/files/$escuela/grupo/
  mv -f /datadrive/coma_files/$escuela/archivos/* /datadrive/coma_files/files/$escuela/archivos/

  find /datadrive/coma_files/$escuela/webapps/ -mindepth 1 -maxdepth 1 ! -name 'eisi' -exec mv {} /datadrive/coma_files/files/$escuela/Profesores/ \;

  echo "Moviendo copia de archivos de escuela: $escuela"
done