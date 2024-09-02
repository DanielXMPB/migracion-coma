// Funcion para despleguar un nuevo war dentro de cada contenedor

const fs = require('fs');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

async function despliegueDevelop(conn) {

    // Parametros contendor
    nameContainer = "coma_develop";

    // Despliegue en contenedor prueba
    try {
        console.log(`Iniciando despliegue en ${nameContainer}`);

        // Detener contenedor
        var resultadoComando = await ejecutarComando(conn, `docker stop ${nameContainer}`);
        console.log(`Resultado detener ${nameContainer}: ${resultadoComando}`);

        // Copiar war en el contenedor
        resultadoComando = await ejecutarComando(conn, `docker cp /datadrive/deployment/develop/eisi.war ${nameContainer}:/datadrive/tomcat/webapps/`);
        console.log(`Resultado copiar war en${nameContainer}: ${resultadoComando}`);

        // Iniciar contenedor nuevamente
        resultadoComando = await ejecutarComando(conn, `docker start ${nameContainer}`);
        console.log(`Resultado iniciar ${nameContainer}: ${resultadoComando}`);

        console.log(`Fin despliegue en ${nameContainer}`);
    } catch (error) {
        console.error(`Error de despliegue en ${nameContainer}:`, error);
    }

    conn.end();

}

module.exports = { despliegueDevelop };