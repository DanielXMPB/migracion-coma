# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

for escuela in "${escuelas[@]}"; do
  echo "Moviendo archivos de la escuela en la carpeta designada de: $escuela"

  mv -f ../../../coma_files/$escuela/eisi/css/* ../../files/$escuela/css/
  mv -f ../../../coma_files/$escuela/eisi/images/* ../../files/$escuela/images/
  mv -f ../../../coma_files/$escuela/eisi/ArchivosProfesores/* ../../files/$escuela/ArchivosProfesores/
  mv -f ../../../coma_files/$escuela/eisi/WebProfesor/* ../../files/$escuela/WebProfesor/
  mv -f ../../../coma_files/$escuela/eisi/grupo/* ../../files/$escuela/grupo/

  find ../../../coma_files/$escuela/ -mindepth 1 -maxdepth 1 ! -name 'eisi' -exec mv {} ../../files/$escuela/Profesores/

  echo "Moviendo copia de archivos de escuela: $escuela"
done