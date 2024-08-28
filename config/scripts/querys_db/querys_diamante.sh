# Ejecutar querys dentro de diamante en cada escuela

# Cargar configuración de contenedores y bases de datos
source ./config_diamante.sh

# Cargar las contraseñas de MySQL
source ./secrets.sh

# Query a ejecutar
query="UPDATE tp_usuarios tu SET tu.ClaveUsr = '1234' WHERE tu.IdUsr = 'U0';"

# Recorre cada contenedor y sus bases de datos
for container in "${!containers_dbs[@]}"; do
    # Asigna la lista de bases de datos
    dbs=${containers_dbs[$container]}

    # Asigna la la contraseña de cada contenedor
    password=${container_passwords[$container]}

    for db in $dbs; do
        echo "Ejecutando query en $db dentro de $container"

        # Ejecutar query en cada escuela
        docker exec -i "$container" mysql -u root -p"${password}" "$db" -e "$query"
    done
done