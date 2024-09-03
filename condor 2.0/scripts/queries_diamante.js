// Funcion para ejecutar querys dentro de diamante en cada escuela

const fs = require('fs');
const { transferirArchivos } = require('../functions/transferir_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const fileEscuelas = JSON.parse(fs.readFileSync('./config/escuelas.json', 'utf8'));

// Leer configuracion
const data = fs.readFileSync('./config/config.conf', 'utf8');
const escuelas = data.split('\n')
    .map(line => line.trim())
    .filter(line => !line.startsWith('#'));

async function queriesDiamante(conn, config) {

    // Copiar script de SQL
    const resultadoTransferencia = await transferirArchivos(config, './config/script.sql', '/tmp/script.sql');
    console.log(resultadoTransferencia);

    // Ciclo para recorrer las escuelas
    for (const escuela of escuelas) {

        // Encuentra los datos correspondientes a la escuela
        const datosEscuela = fileEscuelas.find(entry => entry.name === escuela);

        console.log(`Iniciando ejectucion en ${datosEscuela.name}`);

        // Copiar Script en contenedor
        var copySQL = `docker cp /tmp/script.sql ${datosEscuela.container_db}:/tmp/script.sql`;
        var resultadoComando = await ejecutarComando(conn, copySQL);

        try {

            // Comando a ejecutar
            var command = `docker exec -i ${datosEscuela.container_db} mysql -u root -p${datosEscuela.password} --database ${datosEscuela.database_diamate} < /tmp/script.sql`;

            // Ejecutar script en base de datos
            resultadoComando = await ejecutarComando(conn, command);
            console.log(`Resultado al ejecutar script en ${datosEscuela.name}: ${resultadoComando}`);

            console.log(`Fin ejectucion de script ${datosEscuela.name}`);
        } catch (error) {
            console.error(`Error al ejectuar script en ${datosEscuela.name}:`, error);
        }

        // Eliminar Script de contenedor
        resultadoComando = await ejecutarComando(conn, `docker exec -i ${datosEscuela.container_db} rm -rf /tmp/script.sql`);

    }

    // Eliminar script.sql
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/script.sql');
    console.log(`Resultado al borrar script: ${resultadoComando}`);

    conn.end();

}

module.exports = { queriesDiamante };