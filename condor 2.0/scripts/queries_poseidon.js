// Funcion para ejecutar querys dentro de poseidon

const { Client } = require('ssh2');
const fs = require('fs');

// Leer contraseñas desde un archivo JSON
const file = JSON.parse(fs.readFileSync('./config/secrets.json', 'utf8'));
const passwords = file.passwordsDB;

function queriesDiamante(config) {

    const conn = new Client();

    // Realizar conexión
    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Copiar script de SQL
        conn.sftp((err, sftp) => {
            if (err) {
                console.error(`Error al crear SFTP: ${err.message}`);
                process.exit(1);
            }

            sftp.fastPut('./config/script.sql', `/tmp/`, (err) => {
                if (err) {
                    console.error(`Error al copiar script en servidor: ${err.message}`);
                    process.exit(1);
                }

                console.log('Archivo copiado exitosamente al servidor.');
            });
        });


        // Parametros poseidon
        const container = "db_poseidon";
        const db = "poseidon";

        // Buscar la contraseña correspondiente
        const passwordEntry = passwords.find(entry => entry.name === db);

        try {
            console.log(`Iniciando ejectucion de script en ${db}`);

            // Ejecutar script en base de datos
            conn.exec(`docker exec -i ${container} mysql -u root -p"${passwordEntry}" "${db}" < "/tmp/script.sql"`, (err, stream) => {
                if (err) {
                    console.error(`Error al ejectuar script en ${escuela}: ${err.message}`);
                    process.exit(1);
                }

                stream.on('close', (code, signal) => {
                    if (code !== 0) {
                        console.error(`Error al ejectuar script en ${escuela}: ${code}`);
                        conn.end();
                    }
                }).on('data', (data) => {
                    console.log('Salida:', data.toString());
                });
            });

            console.log(`Fin ejectucion de script en ${db}`);
        } catch (error) {
            console.error('Error en ejectuar script:', error);
        }

        // Eliminar script.sql
        conn.exec('rm -rf /tmp/script.sql', (err, stream) => {
            if (err) {
                console.error(`Error al eliminar script: ${err.message}`);
                process.exit(1);
            }

            stream.on('close', (code, signal) => {
                if (code !== 0) {
                    console.error(`Error al eliminar script: ${code}`);
                    conn.end();
                }
            }).on('data', (data) => {
                console.log('Salida:', data.toString());
            });
        });

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

}

module.exports = { queriesDiamante };