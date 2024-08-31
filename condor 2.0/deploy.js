const { Client } = require('ssh2');
const fs = require('fs');

// Funciones
const { despliegue } = require('./scripts/despliegue');
const { utilidades } = require('./scripts/utilidades');

// Configuración del servidor remoto
const config = {
    host: '10.6.100.3',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync('config/id_rsa')
};

// Obtener acción a realizar
const action = process.argv[2];
if (!action) {
    console.error('Por favor, proporciona la acción ejecutar.');
    process.exit(1);
}

// Ejecutar acción
if (action === 'test') {

    const conn = new Client();

    // Realizar conexión
    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Funcion de preuba para verificar la conexión
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

    // Función de despliegue de la aplicación en todos los contenedores
    despliegue(config);

} else if (action === 'connect') {

    // Funcion para copiar archivos de utilidades a los contenedores (crontabs, maintenece, etc)
    utilidades(config);

} else {
    console.error('Acción no válida. Por favor, proporciona una acción válida.');
    process.exit(1);
}