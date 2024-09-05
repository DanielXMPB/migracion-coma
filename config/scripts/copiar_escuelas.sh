# Lista de nombres o IDs de los contenedores
mapfile -t escuelas < escuelas.txt
mapfile -t escuelasWebapps < escuelasWebapps.txt
mapfile -t escuelasArchivos < escuelasArchivos.txt

for i in {0..32}; do
    echo "Moviendo archivos de la escuela en la carpeta designada de: ${escuelas[$i]}"

    mkdir -p /datadrive/migracion-coma/files/${escuelas[$i]}/css
    mkdir -p /datadrive/migracion-coma/files/${escuelas[$i]}/images
    mkdir -p /datadrive/migracion-coma/files/${escuelas[$i]}/ArchivosProfesores
    mkdir -p /datadrive/migracion-coma/files/${escuelas[$i]}/WebProfesor
    mkdir -p /datadrive/migracion-coma/files/${escuelas[$i]}/grupo
    mkdir -p /datadrive/migracion-coma/files/${escuelas[$i]}/Profesores
    mkdir -p /datadrive/migracion-coma/files/${escuelas[$i]}/archivos

    rsync -avz /datadrive/CopiaSitios/${escuelasWebapps[$i]}/eisi/css/ /datadrive/migracion-coma/files/${escuelas[$i]}/css/
    rsync -avz /datadrive/CopiaSitios/${escuelasWebapps[$i]}/eisi/images/ /datadrive/migracion-coma/files/${escuelas[$i]}/images/
    rsync -avz /datadrive/CopiaSitios/${escuelasWebapps[$i]}/eisi/ArchivosProfesores/ /datadrive/migracion-coma/files/${escuelas[$i]}/ArchivosProfesores/
    rsync -avz /datadrive/CopiaSitios/${escuelasWebapps[$i]}/eisi/WebProfesor/ /datadrive/migracion-coma/files/${escuelas[$i]}/WebProfesor/
    rsync -avz /datadrive/CopiaSitios/${escuelasWebapps[$i]}/eisi/grupo/ /datadrive/migracion-coma/files/${escuelas[$i]}/grupo/
    rsync -avz /datadrive/CopiaSitios/${escuelasArchivos[$i]}/ /datadrive/migracion-coma/files/${escuelas[$i]}/archivos/

    find datadrive/CopiaSitios/${escuelasWebapps[$i]}/ -mindepth 1 -maxdepth 1 ! -name 'eisi' -exec mv {} /datadrive/migracion-coma/files/${escuelas[$i]}/Profesores/ \;

    echo "Finaliza la escuela: $escuela"
done