// Funcion para descargar archivos con SFTP

const { exec } = require('child_process');

async function descargarArchivos(config, rutaRemota, rutaLocal) {

    const userAtHost = `${config.username}@${config.host}`;
    const remotePath = `${userAtHost}:${rutaRemota}`;

    // Ruta a la clave privada
    const privateKeyPath = config.privateKeyPath; // Asegúrate de que esta ruta sea correcta

    // Comando rsync con la opción -a para archivos y carpetas, --progress para ver el progreso, y -i para la clave privada
    const rsyncCommand = `rsync -avbz -e "ssh -i ${privateKeyPath} -p ${config.port}" ${remotePath} ${rutaLocal}`;

    return new Promise((resolve, reject) => {
        const rsyncProcess = exec(rsyncCommand, (error, stdout, stderr) => {
            if (error) {
                return reject(`Error en la sincronización: ${error.message}`);
            }
            resolve(`Sincronización completada:\n${stdout}`);
        });

        // Capturar y mostrar el progreso
        rsyncProcess.stdout.on('data', (data) => {
            console.log(data);
        });

        rsyncProcess.stderr.on('data', (data) => {
            console.error(data);
        });
    });

}

module.exports = { descargarArchivos };