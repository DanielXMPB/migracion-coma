const { Client } = require('ssh2');
const fs = require('fs');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

function despliegue(config) {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

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

        for (const escuela of containersEscuelas) {
            try {
                console.log(`Iniciando despliegue en ${escuela}`);

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

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

}

module.exports = { despliegue };