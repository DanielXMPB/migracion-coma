# Ejecutar querys dentro de poseidon

# Cargar las contraseñas de MySQL
source ./secrets.sh

# Configuracion del contenedor
container="db_poseidon"
db="poseidon"

# Query a ejecutar
sql_file="script.sql"

# Ejecutar query en poseidon
docker exec -i "$container" mysql -u root -p"$poseidon_password" "$db" < /tmp/"$sql_file"