const { Client } = require('ssh2');
const fs = require('fs');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config_escuelas.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

function utilidades(config) {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        conn.sftp((err, sftp) => {
            if (err) {
                console.error(`Error al crear SFTP: ${err.message}`);
                process.exit(1);
            }

            sftp.fastPut('./other/utils', `/tmp/`, (err) => {
                if (err) {
                    console.error(`Error al copiar war en servidor: ${err.message}`);
                    process.exit(1);
                }

                console.log('Archivo copiado exitosamente al servidor.');
            });
        });

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

}

module.exports = { utilidades };