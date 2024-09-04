// Realizar backups de la base de datos de las escuelas

const fs = require('fs');
const { crearBackup } = require('../functions/crear_backup.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Rutas
const rutas = require('../config/routes.json');

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

            var ruta_backup = `/tmp/escuelas/${datosEscuela.name}`;

            var resultadoComando = await ejecutarComando(conn, `mkdir -p ${ruta_backup}/webapps`);
            resultadoComando = await ejecutarComando(conn, `mkdir -p ${ruta_backup}/archivos`);

            var ruta_contenedor = `/datadrive/tomcat/webapps/.`;
            var ruta_archivos = `/datadrive/archivos/.`;

            const commad1 = `docker cp ${datosEscuela.container}:${ruta_contenedor} ${ruta_backup}/webapps`;
            resultadoComando = await ejecutarComando(conn, commad1);

            const commad2 = `docker cp ${datosEscuela.container}:${ruta_archivos} ${ruta_backup}/archivos`;
            resultadoComando = await ejecutarComando(conn, commad2);

            // Copiar archivos al servidor
            const resultadoTransferencia = await crearBackup(config, `${rutas.ruta_backup_escuelas}/${datosEscuela.name}`, `/tmp/escuelas/${datosEscuela.name}/.`);
            console.log(resultadoTransferencia);

            console.log(`Backup de ${datosEscuela.name}: ${resultadoComando}`);
        } catch (error) {
            console.error(`Error al sacar backup ${datosEscuela.name}:`, error);
            resultadoComando = await ejecutarComando(conn, `rm -rf ${ruta_backup}`);
        }

    }

    // Eliminar backups
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/escuelas');
    console.log(`Resultado al borrar backups temporales: ${resultadoComando}`);

    conn.end();

}

module.exports = { backupEscuelas };