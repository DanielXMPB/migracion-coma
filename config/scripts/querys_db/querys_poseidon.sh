# Ejecutar querys dentro de poseidon

# Configuracion del contenedor
container="db_poseidon"
db="poseidon"
password="1234"

# Query a ejecutar
query="UPDATE tp_usuarios tu SET tu.ClaveUsr = '1234' WHERE tu.IdUsr = 'U0';"

# Ejecutar query en contenedor
docker exec -i "$container" mysql -u root -p"$password" "$db" -e "$query"