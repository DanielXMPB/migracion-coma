# Ejecutar querys dentro de poseidon

# Configuracion del contenedor
container="db_poseidon"
db="poseidon"
password="1234"

# Ejecutar query en contenedor
docker exec -i "$container" mysql -u root -p"$password" "$db" -e "$query"

# Copiar el archivo SQL al contenedor
docker cp script.sql "$container":/tmp/

# Ejecutar query en poseidon
docker exec -i "$container" mysql -u root -p"$password" "$db" < /tmp/script.sql

# Eliminar el archivo SQL del contenedor después de la ejecución
docker exec "$container" rm /tmp/script.sql