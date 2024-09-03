// Funcion para despleguar un nuevo war dentro de cada contenedor

const fs = require('fs');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const fileEscuelas = JSON.parse(fs.readFileSync('./config/escuelas.json', 'utf8'));

// Leer configuracion
const data = fs.readFileSync('./config/config.conf', 'utf8');
const escuelas = data.split('\n')
    .map(line => line.trim())
    .filter(line => !line.startsWith('#'));

async function despliegueMaster(conn) {

    // Despliegue en cada contenedor
    for (const escuela of escuelas) {

        // Encuentra los datos correspondientes a la escuela
        const datosEscuela = fileEscuelas.find(entry => entry.name === escuela);

        try {
            console.log(`Iniciando despliegue en ${datosEscuela.name}`);

            // Detener contenedor
            var resultadoComando = await ejecutarComando(conn, `docker stop ${datosEscuela.container}`);
            console.log(`Detener ${escuela}: ${resultadoComando}`);

            // Copiar war en el contenedor
            resultadoComando = await ejecutarComando(conn, `docker cp /datadrive/deployment/develop/eisi.war ${datosEscuela.container}:/datadrive/tomcat/webapps/`);
            console.log(`Copiar war en ${datosEscuela.name}: ${resultadoComando}`);

            // Iniciar contenedor nuevamente
            resultadoComando = await ejecutarComando(conn, `docker start ${datosEscuela.container}`);
            console.log(`Iniciar ${datosEscuela.name}: ${resultadoComando}`);

            console.log(`Fin despliegue en ${datosEscuela.name}`);
        } catch (error) {
            console.error(`Error de despliegue en ${datosEscuela.name}:`, error);
        }
    }

    conn.end();

}

module.exports = { despliegueMaster };