// Funcion para descargar archivos con SFTP

const Client = require('ssh2-sftp-client');
const ProgressBar = require('progress');
const fs = require('fs');
const path = require('path');

async function descargarArchivos(config, rutaRemota, rutaLocal) {
    const sftp = new Client();
    try {
        await sftp.connect(config);

        // Obtener la lista de archivos y carpetas en el directorio remoto
        const fileList = await sftp.list(rutaRemota);
        const totalFiles = fileList.length;

        // Crear una barra de progreso
        const bar = new ProgressBar('Descargando [:bar] :percent :etas', {
            total: totalFiles,
            width: 40
        });

        // Descargar cada archivo y actualizar la barra de progreso
        for (const file of fileList) {
            const remotePath = `${rutaRemota}/${file.name}`;
            const localPath = path.join(rutaLocal, file.name);

            if (file.type === 'd') {
                // Si es un directorio, crear el directorio local y descargar recursivamente
                if (!fs.existsSync(localPath)) {
                    fs.mkdirSync(localPath, { recursive: true });
                }
                await descargarArchivos(config, remotePath, localPath);
            } else {
                await sftp.fastGet(remotePath, localPath);
            }
            bar.tick();
        }

        return `Archivos descargados con éxito a: ${rutaLocal}`;
    } catch (err) {
        return `Error al transferir archivo: ${err}`;
    } finally {
        await sftp.end();
    }
}

module.exports = { descargarArchivos };