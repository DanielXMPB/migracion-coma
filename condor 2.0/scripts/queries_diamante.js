// Funcion para ejecutar querys dentro de diamante en cada escuela

const fs = require('fs');
const { transferirArchivos } = require('../functions/transferir_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const diamanteEscuelas = variables.diamanteEscuelas;

// Leer contraseñas desde un archivo JSON
const file = JSON.parse(fs.readFileSync('./config/secrets.json', 'utf8'));
const passwords = file.passwordsDB;

async function queriesDiamante(conn, config) {

    // Copiar script de SQL
    const resultadoTransferencia = await transferirArchivos(config, './config/script.sql', '/tmp/script.sql');
    console.log(resultadoTransferencia);

    // Ciclo para recorrer baases de datos por facultad
    for (const facultad of diamanteEscuelas) {

        console.log(`Iniciando ejectucion en ${facultad.name}`);

        // Buscar la contraseña correspondiente
        const passwordEntry = passwords.find(entry => entry.name === facultad.name);

        // Ciclo para recorrer esquemas de escuelas
        for (const escuela of facultad.dbs) {
            try {
                console.log(`Iniciando ejectucion de script en ${escuela}`);

                var command = `docker exec -i ${facultad.name} mysql -u root -p"${passwordEntry}" "${escuela}" < "/tmp/script.sql"`;

                // Ejecutar script en base de datos
                const resultadoComando = await ejecutarComando(conn, command);
                console.log(`Resultado al ejecutar script en ${escuela}: ${resultadoComando}`);

                console.log(`Fin ejectucion de script ${escuela}`);
            } catch (error) {
                console.error(`Error al ejectuar script en ${escuela}:`, error);
            }
        }
    }

    // Eliminar script.sql
    const resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/script.sql');
    console.log(`Resultado al borrar script: ${resultadoComando}`);

    conn.end();

}

module.exports = { queriesDiamante };