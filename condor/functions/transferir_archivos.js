// Funcion para transferir archivos con SFTP

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function transferirArchivos(config, rutaLocal, rutaRemota) {
    const userAtHost = `${config.username}@${config.host}`;
    const remotePath = `${userAtHost}:${rutaRemota}`;

    // Ruta a la clave privada
    const privateKeyPath = config.privateKeyPath; // Asegúrate de que esta ruta sea correcta

    // Comando rsync con la opción -a para archivos y carpetas, y -i para la clave privada
    const rsyncCommand = `rsync -avbz -e "ssh -i ${privateKeyPath} -p ${config.port}" ${rutaLocal} ${remotePath} > /dev/null 2>&1`;

    try {
        await execPromise(rsyncCommand);
        return `Sincronización completada.`;
    } catch (error) {
        console.log(`Error en la sincronización: ${error.message}`);
    }
}

module.exports = { transferirArchivos };