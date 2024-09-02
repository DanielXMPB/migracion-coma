// Funcion para despleguar un nuevo war dentro de cada contenedor

const { Client } = require('ssh2');
const fs = require('fs');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

function despliegue(config) {

    const conn = new Client();

    // Realizar conexión
    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Copiar archivo war al servidor
        conn.sftp((err, sftp) => {
            if (err) {
                console.error(`Error al crear SFTP: ${err.message}`);
                process.exit(1);
            }

            sftp.fastPut('./other/build/eisi.war', `/tmp/eisi.war`, (err) => {
                if (err) {
                    console.error(`Error al copiar war en servidor: ${err.message}`);
                    process.exit(1);
                }

                console.log('Archivo copiado exitosamente al servidor.');
            });
        });

        // Ciclo para desplegar en cada contenedor de escuela
        for (const escuela of containersEscuelas) {
            try {
                console.log(`Iniciando despliegue en ${escuela}`);

                // Detener contenedor
                conn.exec(`docker stop ${escuela}`, (err, stream) => {
                    if (err) {
                        console.error(`Error al detener ${escuela}: ${err.message}`);
                        process.exit(1);
                    }

                    stream.on('close', (code, signal) => {
                        if (code !== 0) {
                            console.error(`Error al detener ${escuela}: ${code}`);
                            conn.end();
                        }
                    }).on('data', (data) => {
                        console.log('Salida:', data.toString());
                    });
                });

                // Copiar war en el contenedor
                conn.exec(`docker cp /tmp/eisi.war ${escuela}:/datadrive/tomcat/webapps/`, (err, stream) => {
                    if (err) {
                        console.error(`Error al copiar war en ${escuela}: ${err.message}`);
                        process.exit(1);
                    }

                    stream.on('close', (code, signal) => {
                        if (code !== 0) {
                            console.error(`Error al copiar war en ${escuela}: ${code}`);
                            conn.end();
                        }
                    }).on('data', (data) => {
                        console.log('Salida:', data.toString());
                    });
                });

                // Iniciar contenedor nuevamente
                conn.exec(`docker start ${escuela}`, (err, stream) => {
                    if (err) {
                        console.error(`Error al iniciar ${escuela}: ${err.message}`);
                        process.exit(1);
                    }

                    stream.on('close', (code, signal) => {
                        if (code !== 0) {
                            console.error(`Error al iniciar ${escuela}: ${code}`);
                            conn.end();
                        }
                    }).on('data', (data) => {
                        console.log('Salida:', data.toString());
                    });
                });

                console.log(`Fin despliegue en ${escuela}`);
            } catch (error) {
                console.error('Error en el despliegue:', error);
            }
        }

        // Eliminar archivo war del servidor
        conn.exec('rm -rf /tmp/eisi.war', (err, stream) => {
            if (err) {
                console.error(`Error al eliminar war: ${err.message}`);
                process.exit(1);
            }

            stream.on('close', (code, signal) => {
                if (code !== 0) {
                    console.error(`Error al eliminar war: ${code}`);
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

module.exports = { despliegue };