const { Client } = require('ssh2');
const fs = require('fs');

// Funciones
const { despliegueDevelop } = require('./scripts/despliegue_develop');
const { despliegueMaster } = require('./scripts/despliegue_master');
const { utilidades } = require('./scripts/utilidades');
const { queriesDiamante } = require('./scripts/queries_diamante');
const { queriesDivision } = require('./scripts/queries_division');
const { queriesPoseidon } = require('./scripts/queries_poseidon');
const { backupDB } = require('./scripts/backup_db');
const { backupEscuelas } = require('./scripts/backup_escuelas');

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

} else if (action === 'despliegue_develop') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Función de despliegue de la aplicación en todos los contenedores
        despliegueDevelop(conn);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'despliegue_master') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Función de despliegue de la aplicación en todos los contenedores
        despliegueMaster(conn);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'utilidades') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Funcion para copiar archivos de utilidades a los contenedores (crontabs, maintenece, etc)
        utilidades(conn, config);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'queries_diamante') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Funcion para ejecutar SQL en diamante de todas las escuelas
        queriesDiamante(conn, config);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'queries_division') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Funcion para ejecutar SQL en division de todas las escuelas
        queriesDivision(conn, config);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'queries_poseidon') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Funcion para ejecutar SQL en Poseidon
        queriesPoseidon(conn, config);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'backup_db') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Funcion para sacar la ultima copia de todas las bases de datos de las escuelas
        backupDB(conn, config);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else if (action === 'backup_escuelas') {

    const conn = new Client();

    conn.on('ready', () => {
        console.log('Conexión establecida.');

        // Funcion sacar backups de todas las bases de datos de las escuelas
        backupEscuelas(conn, config);

    }).connect(config);

    conn.on('error', (err) => {
        console.error('Error de conexión:', err);
    });

} else {
    console.error('Acción no válida. Por favor, proporciona una acción válida.');
    process.exit(1);
}