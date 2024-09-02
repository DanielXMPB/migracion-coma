// Funcion para ejecutar querys dentro de division en cada escuela

const { Client } = require('ssh2');
const fs = require('fs');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const diamanteEscuelas = variables.divisionEscuelas;

// Leer contraseñas desde un archivo JSON
const file = JSON.parse(fs.readFileSync('./config/secrets.json', 'utf8'));
const passwords = file.passwordsDB;

function queriesDivision(config) {

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

        // Ciclo para recorrer baases de datos por facultad
        for (const facultad of diamanteEscuelas) {

            // Buscar la contraseña correspondiente
            const passwordEntry = passwords.find(entry => entry.name === facultad.name);

            // Ciclo para recorrer esquemas de escuelas
            for ( const escuela of facultad.dbs) {
                try {
                    console.log(`Iniciando ejectucion de script en ${escuela}`);

                    // Ejecutar script en base de datos
                    conn.exec(`docker exec -i ${facultad} mysql -u root -p"${passwordEntry}" "${escuela}" < "/tmp/script.sql"`, (err, stream) => {
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

                    console.log(`Fin ejectucion de script ${escuela}`);
                } catch (error) {
                    console.error('Error en ejectuar script:', error);
                }
            }
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

module.exports = { queriesDivision };