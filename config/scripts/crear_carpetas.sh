mapfile -t escuelas < escuelas.txt
mapfile -t escuelasWebapps < escuelasWebapps.txt
mapfile -t escuelasArchivos < escuelasArchivos.txt

for i in {0..32}; do
    mkdir -p /datadrive/coma_files/${escuelas[$i]}/webapps
    mkdir -p /datadrive/coma_files/${escuelas[$i]}/archivos

    rsync -avz /datadrive/CopiaSitios/${escuelasWebapps[$i]}/ /datadrive/coma_files/${escuelas[$i]}/webapps/
    rsync -avz /datadrive/CopiaSitios/${escuelasArchivos[$i]}/ /datadrive/coma_files/${escuelas[$i]}/archivos/
done
