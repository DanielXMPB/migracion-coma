const { Client } = require('ssh2');
const fs = require('fs');

// Rutas
const rutas = require('./config/routes.json');

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
    privateKey: fs.readFileSync(rutas.ruta_privatekey)
};

// Obtener acción a realizar
const action = process.argv[2];
if (!action) {
    console.error('Por favor, proporciona la acción ejecutar.');
    process.exit(1);
}

const conn = new Client();

conn.on('ready', () => {
    console.log('Conexión establecida.');

    // Ejecutar acción
    if (action === 'test') {

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

    } else if (action === 'despliegue_develop') {

        // Función de despliegue de la aplicación en todos los contenedores
        despliegueDevelop(conn);

    } else if (action === 'despliegue_master') {

        // Función de despliegue de la aplicación en todos los contenedores
        despliegueMaster(conn);

    } else if (action === 'utilidades') {

        // Funcion para copiar archivos de utilidades a los contenedores (crontabs, maintenece, etc)
        utilidades(conn, config);

    } else if (action === 'queries_diamante') {

        // Funcion para ejecutar SQL en diamante de todas las escuelas
        queriesDiamante(conn, config);

    } else if (action === 'queries_division') {

        // Funcion para ejecutar SQL en division de todas las escuelas
        queriesDivision(conn, config);

    } else if (action === 'queries_poseidon') {

        // Funcion para ejecutar SQL en Poseidon
        queriesPoseidon(conn, config);

    } else if (action === 'backup_db') {

        // Funcion para sacar la ultima copia de todas las bases de datos de las escuelas
        backupDB(conn, config);

    } else if (action === 'backup_escuelas') {

        // Funcion sacar backups de todas las bases de datos de las escuelas
        backupEscuelas(conn, config);

    } else {
        console.error('Acción no válida. Por favor, proporciona una acción válida.');
        process.exit(1);
    }

}).connect(config);

conn.on('error', (err) => {
    console.error('Error de conexión:', err);
});