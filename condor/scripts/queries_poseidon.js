// Funcion para ejecutar querys dentro de poseidon

const fs = require('fs');
const { transferirArchivos } = require('../functions/transferir_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const fileEscuelas = JSON.parse(fs.readFileSync('./config/escuelas.json', 'utf8'));

async function queriesDiamante(conn, config) {

    // Copiar script de SQL
    const resultadoTransferencia = await transferirArchivos(config, './config/script.sql', '/tmp/script.sql');
    console.log(resultadoTransferencia);

    // Encuentra los datos correspondientes a la escuela
    const datosEscuela = fileEscuelas.find(entry => entry.name === "poseidon");

    console.log(`Iniciando ejectucion en ${datosEscuela.name}`);

    // Copiar Script en contenedor
    var copySQL = `docker cp /tmp/script.sql ${datosEscuela.container_db}:/tmp/script.sql`;
    var resultadoComando = await ejecutarComando(conn, copySQL);

    try {

        // Comando a ejecutar
        var command = `docker exec -i ${datosEscuela.container_db} mysql -u root -p${datosEscuela.password} --database ${datosEscuela.database_poseidon} < /tmp/script.sql`;

        // Ejecutar script en base de datos
        resultadoComando = await ejecutarComando(conn, command);
        console.log(`Resultado al ejecutar script en ${datosEscuela.name}: ${resultadoComando}`);

        console.log(`Fin ejectucion de script ${datosEscuela.name}`);
    } catch (error) {
        console.error(`Error al ejectuar script en ${datosEscuela.name}:`, error);
    }

    // Eliminar Script de contenedor
    resultadoComando = await ejecutarComando(conn, `docker exec -i ${datosEscuela.container_db} rm -rf /tmp/script.sql`);

    // Eliminar script.sql
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/script.sql');
    console.log(`Resultado al borrar script: ${resultadoComando}`);

    conn.end();

}

module.exports = { queriesDiamante };