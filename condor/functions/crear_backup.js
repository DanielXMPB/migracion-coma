// Funcion para transferir archivos con SFTP

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function crearBackup(config, rutaLocal, rutaRemota) {
    const userAtHost = `${config.username}@${config.host}`;
    const remotePath = `${userAtHost}:${rutaRemota}`;

    // Ruta a la clave privada
    const privateKeyPath = config.privateKeyPath;

    // Comando rsync con la opción -a para archivos y carpetas, y -i para la clave privada
    const rsyncCommand = `rsync -abz --exclude=backup --delete --backup-dir=${rutaLocal}/backup/backup_$(date +%y%m%d%H%M) -e "ssh -i ${privateKeyPath} -p ${config.port}" ${remotePath} ${rutaLocal} > /dev/null 2>&1`;

    try {
        await execPromise(rsyncCommand);
        return `Sincronización completada.`;
    } catch (error) {
        console.log(`Error en la sincronización: ${error.message}`);
    }
}

module.exports = { crearBackup };