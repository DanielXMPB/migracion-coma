// Funcion para despleguar un nuevo war dentro de cada contenedor

const fs = require('fs');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const variables = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
const containersEscuelas = variables.containersEscuelas;

async function despliegueMaster(conn) {

    // Despliegue en cada contenedor
    for (const escuela of containersEscuelas) {
        try {
            console.log(`Iniciando despliegue en ${escuela}`);

            // Detener contenedor
            var resultadoComando = await ejecutarComando(conn, `docker stop ${escuela}`);
            console.log(`Resultado detener ${escuela}: ${resultadoComando}`);

            // Copiar war en el contenedor
            resultadoComando = await ejecutarComando(conn, `docker cp /datadrive/deployment/develop/eisi.war ${escuela}:/datadrive/tomcat/webapps/`);
            console.log(`Resultado copiar war en${escuela}: ${resultadoComando}`);

            // Iniciar contenedor nuevamente
            resultadoComando = await ejecutarComando(conn, `docker start ${escuela}`);
            console.log(`Resultado iniciar ${escuela}: ${resultadoComando}`);

            console.log(`Fin despliegue en ${escuela}`);
        } catch (error) {
            console.error(`Error de despliegue en ${escuela}:`, error);
        }
    }

    conn.end();

}

module.exports = { despliegueMaster };