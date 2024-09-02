// Funcion para transferir archivos con SFTP

const Client = require('ssh2-sftp-client');

async function transferirArchivos(config, rutaLocal, rutaRemota) {
    const sftp = new Client();
    try {
        // Conectar al servidor de origen
        await sftp.connect(config);
        // Subir la carpeta desde el servidor local al servidor de destino
        await sftp.uploadDir(rutaLocal, rutaRemota);
        return(`Archivos subidos con éxito a: ${rutaRemota}`);
    } catch (err) {
        return('Error al transferir archivo:', err);
    } finally {
        await sftp.end(); // Cerrar la conexión
    }
}

module.exports = { transferirArchivos };