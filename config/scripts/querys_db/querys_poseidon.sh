# Ejecutar querys dentro de poseidon

# Configuracion del contenedor
container="db_poseidon"
db="poseidon"
password="1234"

# Ejecutar query en contenedor
docker exec -i "$container" mysql -u root -p"$password" "$db" -e "$query"

# Query a ejecutar
sql_file="script.sql"

# Copiar el archivo SQL al contenedor
docker cp "$sql_file" "$container:/tmp/$sql_file"

# Ejecutar query en poseidon
docker exec -i "$container" mysql -u root -p"$password" "$db" < "/tmp/$sql_file"

# Eliminar el archivo SQL del contenedor después de la ejecución
docker exec "$container" rm "/tmp/$sql_file"