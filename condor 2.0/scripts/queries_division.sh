# Ejecutar querys dentro de division en cada escuela

# Cargar configuración de contenedores y bases de datos
source ../config/config_division.sh

# Cargar las contraseñas de MySQL
source ./secrets.sh

# Query a ejecutar
sql_file="script.sql"

# Recorre cada contenedor y sus bases de datos
for container in "${!containers_dbs[@]}"; do
    # Asigna la lista de bases de datos
    dbs=${containers_dbs[$container]}

    # Asigna la la contraseña de cada contenedor
    password=${container_passwords[$container]}

    for db in $dbs; do
        echo "Ejecutando query en $db dentro de $container"

        # Ejecutar query en cada escuela
        docker exec -i "$container" mysql -u root -p"${password}" "$db" < "$sql_file"
    done

done