// Realizar backups de la base de datos de las escuelas

const fs = require('fs');
const path = require('path');
const { descargarArchivos } = require('../functions/descargar_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const fileEscuelas = JSON.parse(fs.readFileSync('./config/escuelas.json', 'utf8'));

// Leer configuracion
const data = fs.readFileSync('./config/config.conf', 'utf8');
const escuelas = data.split('\n')
    .map(line => line.trim())
    .filter(line => !line.startsWith('#'));

async function backupEscuelas(conn, config) {

    // Ciclo para recorrer cada contenedor de escuela
    for (const escuela of escuelas) {

        // Encuentra los datos correspondientes a la escuela
        const datosEscuela = fileEscuelas.find(entry => entry.name === escuela);

        try {
            console.log(`Iniciando backup de ${datosEscuela.name}`);

            var ruta_backup = `/tmp/escuelas/${datosEscuela.name}/backup_$(date +%y%m%d%H%M)`;

            var resultadoComando = await ejecutarComando(conn, `mkdir -p ${ruta_backup}`);

            var ruta_contenedor = `/datadrive/tomcat/webapps/.`;

            const commad = `docker cp ${datosEscuela.container}:${ruta_contenedor} ${ruta_backup}`;

            resultadoComando = await ejecutarComando(conn, commad);
            console.log(`Backup de ${datosEscuela.name}: ${resultadoComando}`);
        } catch (error) {
            console.error(`Error al sacar backup ${datosEscuela.name}:`, error);
            resultadoComando = await ejecutarComando(conn, `rm -rf ${ruta_backup}`);
        }

    }

    const localPath = path.resolve(__dirname, '../backups/project');

    console.log("Iniciando transferencia de archivos");

    // Copiar archivos al servidor
    const resultadoTransferencia = await descargarArchivos(config, '/tmp/escuelas/.', localPath);
    console.log(resultadoTransferencia);

    // Eliminar backups
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/escuelas');
    console.log(`Resultado al borrar backups temporales: ${resultadoComando}`);

    conn.end();

}

module.exports = { backupEscuelas };