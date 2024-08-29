# Ejecutar querys dentro de poseidon

# Configuracion del contenedor
container="db_poseidon"
db="poseidon"
password="1234"

# Query a ejecutar
sql_file="script.sql"

# Ejecutar query en poseidon
docker exec -i "$container" mysql -u root -p"$password" "$db" < /tmp/"$sql_file"