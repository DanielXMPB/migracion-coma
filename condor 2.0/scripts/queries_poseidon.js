// Funcion para ejecutar querys dentro de poseidon

const fs = require('fs');
const { transferirArchivos } = require('../functions/transferir_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer contraseñas desde un archivo JSON
const file = JSON.parse(fs.readFileSync('./config/secrets.json', 'utf8'));
const passwords = file.passwordsDB;

async function queriesDiamante(conn, config) {

    // Copiar script de SQL
    const resultadoTransferencia = await transferirArchivos(config, './config/script.sql', '/tmp/script.sql');
    console.log(resultadoTransferencia);

    // Parametros poseidon
    const container = "db_poseidon";
    const db = "poseidon";

    // Buscar la contraseña correspondiente
    const passwordEntry = passwords.find(entry => entry.name === db);

    try {
        console.log(`Iniciando ejectucion de script en ${db}`);

        // Script de base de datos
        var command = `docker exec -i ${container} mysql -u root -p"${passwordEntry}" "${db}" < "/tmp/script.sql"`;

        // Ejecutar script en base de datos
        const resultadoComando = await ejecutarComando(conn, command);
        console.log(`Resultado al ejecutar script en ${db}: ${resultadoComando}`);

        console.log(`Fin ejectucion de script en ${db}`);
    } catch (error) {
        console.error('Error en ejectuar script:', error);
    }

    // Eliminar script.sql
    const resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/script.sql');
    console.log(`Resultado al borrar script: ${resultadoComando}`);

    conn.end();

}

module.exports = { queriesDiamante };