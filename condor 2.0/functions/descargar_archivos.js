// Funcion para descargar archivos con SFTP

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function descargarArchivos(config, rutaRemota, rutaLocal) {
    const userAtHost = `${config.username}@${config.host}`;
    const remotePath = `${userAtHost}:${rutaRemota}`;

    // Ruta a la clave privada
    const privateKeyPath = config.privateKeyPath; // Asegúrate de que esta ruta sea correcta

    // Comando rsync con la opción -a para archivos y carpetas, --progress para ver el progreso, y -i para la clave privada
    const rsyncCommand = `rsync -avbz -e "ssh -i ${privateKeyPath} -p ${config.port}" ${remotePath} ${rutaLocal}`;

    try {
        const { stdout, stderr } = await execPromise(rsyncCommand);
        console.log(stdout);
        if (stderr) {
            console.error(`Error en la sincronización: ${stderr}`);
        }
        return `Sincronización completada:\n${stdout}`;
    } catch (error) {
        throw new Error(`Error en la sincronización: ${error.message}`);
    }
}

module.exports = { descargarArchivos };