// Funcion para copiar los archivos de el crontab en cada escuela

const fs = require('fs');
const { transferirArchivos } = require('../functions/transferir_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

async function utilidades(conn, config) {

    // Copiar utilidades al servidor
    const resultadoTransferencia = await transferirArchivos(config, './utils', '/tmp/utils');
    console.log(resultadoTransferencia);

    // Ciclo para desplegar en cada contenedor de escuela
    for (const escuela of containersEscuelas) {
        try {
            console.log(`Iniciando copia de utilidades en ${escuela}`);

            // Copiar maintenece.jar en contenedor
            var resultadoComando = await ejecutarComando(conn, `docker cp /tmp/utils/maintenance.jar ${escuela}:/datadrive/maintenance`);
            console.log(`Resultado copiar maintenece en ${escuela}: ${resultadoComando}`);

            // Copiar config.properties en contenedor
            resultadoComando = await ejecutarComando(conn, `docker cp /tmp/utils/config.properties ${escuela}:/datadrive/maintenance`);
            console.log(`Resultado copiar config.properties en ${escuela}: ${resultadoComando}`);

            // Copiar crontab en contenedor
            resultadoComando = await ejecutarComando(conn, `docker cp /tmp/utils/crontabs/${escuela}/crontab ${escuela}:/etc/cron.d/`);
            console.log(`Resultado copiar crontab en ${escuela}: ${resultadoComando}`);

            // Comandos para inciar crontab
            const crontabStart = `docker exec ${escuela} chmod 0644 /etc/cron.d/crontab && docker exec ${escuela} crontab /etc/cron.d/crontab`;
            resultadoComando = await ejecutarComando(conn, crontabStart);
            console.log(`Resultado ejectutar crontab en ${escuela}: ${resultadoComando}`);

            console.log(`Fin copia utilidades en ${escuela}`);
        } catch (error) {
            console.error(`Error al copiar utilidades en ${escuela}:`, error);
        }
    }

    // Eliminar utils
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/utils');
    console.log(`Resultado al borrar utils: ${resultadoComando}`);

    conn.end();

}

module.exports = { utilidades };