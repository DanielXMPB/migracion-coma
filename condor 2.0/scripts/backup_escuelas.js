// Realizar backups de la base de datos de las escuelas

const fs = require('fs');
const { descargarArchivos } = require('../functions/descargar_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

async function backupEscuelas(conn, config) {

    // Generar la fecha una vez
    const fechaBackup = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 12);

    // Ciclo para recorrer cada contenedor de escuela
    for (const escuela of containersEscuelas) {
        try {
            var ruta_backup = `/tmp/escuelas/${escuela}/backup_${fechaBackup}`;

            var resultadoComando = await ejecutarComando(conn, `mkdir -p ${ruta_backup}`);

            var ruta_contenedor = `/datadrive/tomcat/webapps/.`;

            const commad = `docker cp ${escuela}:${ruta_contenedor} ${ruta_backup}`;

            resultadoComando = await ejecutarComando(conn, commad);
            console.log(`Backup de ${escuela}: ${resultadoComando}`);
        } catch (error) {
            console.error(`Error al sacar backup ${escuela}:`, error);
            resultadoComando = await ejecutarComando(conn, `rm -rf ${ruta_backup}`);
        }
    }

    // Copiar archivos al servidor
    const resultadoTransferencia = await descargarArchivos(config, '/tmp/escuelas/.', './backups/project');
    console.log(resultadoTransferencia);

    // Eliminar backups
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/escuelas');
    console.log(`Resultado al borrar backups temporales: ${resultadoComando}`);

    conn.end();

}

module.exports = { backupEscuelas };