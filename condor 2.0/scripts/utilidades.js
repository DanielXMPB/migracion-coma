// Funcion para copiar los archivos de el crontab en cada escuela

const { Client } = require('ssh2');
const fs = require('fs');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

function utilidades(config) {

    const conn = new Client();

    // Realizar conexión
    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Copiar utilidades al servidor
        conn.sftp((err, sftp) => {
            if (err) {
                console.error(`Error al crear SFTP: ${err.message}`);
                process.exit(1);
            }

            sftp.fastPut('./other/utils', `/tmp/`, (err) => {
                if (err) {
                    console.error(`Error al copiar utilidades en servidor: ${err.message}`);
                    process.exit(1);
                }

                console.log('Archivo copiado exitosamente al servidor.');
            });
        });

        // Ciclo para desplegar en cada contenedor de escuela
        for (const escuela of containersEscuelas) {
            try {
                console.log(`Iniciando copia de utilidades en ${escuela}`);

                // Copiar maintenece.jar en contenedor
                conn.exec(`docker cp /tmp/utils/maintenece.jar ${escuela}:/datadrive/maintenance`, (err, stream) => {
                    if (err) {
                        console.error(`Error al copiar maintenece.jar en ${escuela}: ${err.message}`);
                        process.exit(1);
                    }

                    stream.on('close', (code, signal) => {
                        if (code !== 0) {
                            console.error(`Error al copiar maintenece.jar en ${escuela}: ${code}`);
                            conn.end();
                        }
                    }).on('data', (data) => {
                        console.log('Salida:', data.toString());
                    });
                });

                // Copiar config.properties en contenedor
                conn.exec(`docker cp /tmp/utils/config.properties ${escuela}:/datadrive/maintenance`, (err, stream) => {
                    if (err) {
                        console.error(`Error al copiar config.properties en ${escuela}: ${err.message}`);
                        process.exit(1);
                    }

                    stream.on('close', (code, signal) => {
                        if (code !== 0) {
                            console.error(`Error al copiar config.properties en ${escuela}: ${code}`);
                            conn.end();
                        }
                    }).on('data', (data) => {
                        console.log('Salida:', data.toString());
                    });
                });

                // Copiar crontab en contenedor
                conn.exec(`docker cp /tmp/utils/crontabs/${escuela}/crontab ${escuela}:/etc/cron.d/`, (err, stream) => {
                    if (err) {
                        console.error(`Error al copiar crontab en ${escuela}: ${err.message}`);
                        process.exit(1);
                    }

                    stream.on('close', (code, signal) => {
                        if (code !== 0) {
                            console.error(`Error al copiar crontab en ${escuela}: ${code}`);
                            conn.end();
                        }
                    }).on('data', (data) => {
                        console.log('Salida:', data.toString());
                    });
                });

                // Comandos para inciar crontab
                const crontabStart = `docker exec ${escuela} chmod 0644 /etc/cron.d/crontab && docker exec ${escuela} crontab /etc/cron.d/crontab && docker exec ${escuela} cron start`;

                // Ejecutar comandos
                conn.exec(crontabStart, (err, stream) => {
                    if (err) {
                        console.error(`Error al inicar crontab en ${escuela}: ${err.message}`);
                        process.exit(1);
                    }

                    stream.on('close', (code, signal) => {
                        if (code !== 0) {
                            console.error(`Error al iniciar crontab en ${escuela}: ${code}`);
                            conn.end();
                        }
                    }).on('data', (data) => {
                        console.log('Salida:', data.toString());
                    });
                });

                console.log(`Fin copia utilidades en ${escuela}`);
            } catch (error) {
                console.error('Error en copia utilidades:', error);
            }
        }

        // Eliminar utils
        conn.exec('rm -rf /tmp/utils', (err, stream) => {
            if (err) {
                console.error(`Error eliminar utils: ${err.message}`);
                process.exit(1);
            }

            stream.on('close', (code, signal) => {
                if (code !== 0) {
                    console.error(`Error eliminar utils: ${code}`);
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

module.exports = { utilidades };