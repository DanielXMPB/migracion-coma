const { Client } = require('ssh2');
const fs = require('fs');

// Funciones
const { despliegue } = require('./scripts/despliegue');
const { utilidades } = require('./scripts/utilidades');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config_escuelas.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

// Configuración del servidor remoto
const config = {
    host: '10.6.100.3',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync('config/id_rsa')
};

// Obtener accií a realizar
const action = process.argv[2];
if (!action) {
    console.error('Por favor, proporciona la acción ejecutar.');
    process.exit(1);
}

if (action === 'test') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        conn.exec('mkdir /tmp/Conexion.txt', (err, stream) => {
            if (err) {
                console.error('Error al ejecutar el comando:', err);
                process.exit(1);
            }

            stream.on('close', (code, signal) => {
                console.log('Código de salida:', code);
                conn.end();
            }).on('data', (data) => {
                console.log('Salida:', data.toString());
            });
        });
    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'despliegue') {

    despliegue(config);

} else if (action === 'connect') {

    utilidades(config);

} else {
    console.error('Acción no válida. Por favor, proporciona una acción válida.');
    process.exit(1);
}