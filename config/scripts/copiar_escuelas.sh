# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt

for escuela in "${escuelas[@]}"; do
  echo "Moviendo archivos de la escuela en la carpeta designada de: $escuela"

  mv -f ../../../$escuela/eisi/css/* ../../files/$escuela/css/
  mv -f ../../../$escuela/eisi/images/* ../../files/$escuela/images/
  mv -f ../../../$escuela/eisi/ArchivosProfesores/* ../../files/$escuela/ArchivosProfesores/
  mv -f ../../../$escuela/eisi/WebProfesor/* ../../files/$escuela/WebProfesor/
  mv -f ../../../$escuela/eisi/grupo/* ../../files/$escuela/grupo/

  find . -mindepth 1 -maxdepth 1 ! -name 'eisi' -exec mv {} ../../files/$escuela/Profesores/

  echo "Moviendo copia de archivos de escuela: $escuela"
done