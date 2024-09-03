// Funcion para copiar los archivos de el crontab en cada escuela

const fs = require('fs');
const path = require('path');
const { transferirArchivos } = require('../functions/transferir_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const fileEscuelas = JSON.parse(fs.readFileSync('./config/escuelas.json', 'utf8'));

// Leer configuracion
const data = fs.readFileSync('./config/config.conf', 'utf8');
const escuelas = data.split('\n')
    .map(line => line.trim())
    .filter(line => !line.startsWith('#'));

async function utilidades(conn, config) {

    const localPath = path.resolve(__dirname, '../utils');

    // Copiar utilidades al servidor
    const resultadoTransferencia = await transferirArchivos(config, localPath, '/tmp/');
    console.log(resultadoTransferencia);

    // Ciclo para desplegar en cada contenedor de escuela
    for (const escuela of escuelas) {

         // Encuentra los datos correspondientes a la escuela
         const datosEscuela = fileEscuelas.find(entry => entry.name === escuela);

        try {
            console.log(`Iniciando copia de utilidades en ${datosEscuela.name}`);

            // Copiar maintenece.jar en contenedor
            var resultadoComando = await ejecutarComando(conn, `docker cp /tmp/utils/maintenance.jar ${datosEscuela.container}:/datadrive/maintenance`);
            console.log(`Copiar maintenece en ${datosEscuela.name}: ${resultadoComando}`);

            // Copiar config.properties en contenedor
            resultadoComando = await ejecutarComando(conn, `docker cp /tmp/utils/config.properties ${datosEscuela.container}:/datadrive/maintenance`);
            console.log(`Copiar config.properties en ${datosEscuela.name}: ${resultadoComando}`);

            // Copiar crontab en contenedor
            resultadoComando = await ejecutarComando(conn, `docker cp /tmp/utils/crontabs/${datosEscuela.container}/crontab ${datosEscuela.container}:/etc/cron.d/`);
            console.log(`Copiar crontab en ${datosEscuela.name}: ${resultadoComando}`);

            // Comandos para inciar crontab
            const crontabStart = `docker exec ${datosEscuela.container} chmod 0644 /etc/cron.d/crontab && docker exec ${datosEscuela.container} crontab /etc/cron.d/crontab`;
            resultadoComando = await ejecutarComando(conn, crontabStart);
            console.log(`Ejectutar crontab en ${datosEscuela.name}: ${resultadoComando}`);

            console.log(`Fin copia utilidades en ${datosEscuela.name}`);
        } catch (error) {
            console.error(`Error al copiar utilidades en ${datosEscuela.name}:`, error);
        }
    }

    // Eliminar utils
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/utils');
    console.log(`Resultado al borrar utils: ${resultadoComando}`);

    conn.end();

}

module.exports = { utilidades };