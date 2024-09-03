// Realizar backups de la base de datos de las escuelas

const fs = require('fs');
const { descargarArchivos } = require('../functions/descargar_archivos.js');
const { ejecutarComando } = require('../functions/ejecutar_comando.js');

// Leer las variables desde un archivo JSON
const fileEscuelas = JSON.parse(fs.readFileSync('./config/escuelas.json', 'utf8'));

// Leer configuracion
const data = fs.readFileSync('./config/config.conf', 'utf8');
const escuelas = data.split('\n')
    .map(line => line.trim())
    .filter(line => !line.startsWith('#'));

async function backupDB(conn, config) {

    // Ciclo para recorrer cada contenedor de escuela
    for (const escuela of escuelas) {

        // Encuentra los datos correspondientes a la escuela
        const datosEscuela = fileEscuelas.find(entry => entry.name === escuela);

        try {
            console.log(`Iniciando backup de ${datosEscuela.name}`);

            // Ruta diamante
            const ruta_diamante = "/datadrive/backup/db/diamante"

            // Crear carpeta temporal para backups
            var resultadoComando = await ejecutarComando(conn, `mkdir -p /tmp/dbs/${datosEscuela.name}/diamante`);

            // Buscar el archivo más reciente en la carpeta de backups
            resultadoComando = await ejecutarComando(conn, `docker exec ${datosEscuela.container} bash -c "ls -t ${ruta_diamante} | head -n 1"`);
            console.log(`Backup reciente de diamante en ${datosEscuela.name}: ${resultadoComando}`);

            // Extraer el nombre del archivo más reciente
            const match1 = resultadoComando.match(/Resultado:\s*(\S+)/);

            if (match1) {
                const diamante_reciente = match1[1];
                // Saca el backup del contenedor a la carpeta local
                resultadoComando = await ejecutarComando(conn, `docker cp "${datosEscuela.container}:${ruta_diamante}/${diamante_reciente}" "/tmp/dbs/${datosEscuela.name}/diamante"`);
                console.log(`Copiar backup de ${datosEscuela.name}: ${resultadoComando}`);
            } else {
                console.log("No se encontró diamante backup");
            }

            // Ruta division
            const ruta_division = "/datadrive/backup/db/division"

            // Crear carpeta temporal para backups
            resultadoComando = await ejecutarComando(conn, `mkdir -p /tmp/dbs/${datosEscuela.name}/division`);

            // Buscar el archivo más reciente en la carpeta de backups
            resultadoComando = await ejecutarComando(conn, `docker exec ${datosEscuela.container} bash -c "ls -t ${ruta_division} | head -n 1"`);
            console.log(`Backup reciente en ${datosEscuela.name}: ${resultadoComando}`);

            // Extraer el nombre del archivo más reciente
            const match2 = resultadoComando.match(/Resultado:\s*(\S+)/);

            if (match2) {
                const division_reciente = match2[1];
                // Saca el backup del contenedor a la carpeta local
                resultadoComando = await ejecutarComando(conn, `docker cp "${datosEscuela.container}:${ruta_division}/${division_reciente}" "/tmp/dbs/${datosEscuela.name}/division"`);
                console.log(`Copiar backup de ${datosEscuela.name}: ${resultadoComando}`);
            } else {
                console.log("No se encontró division backup");
            }

            console.log(`Fin backup de ${escuela}`);

        } catch (error) {
            console.error(`Error al sacar backup ${escuela}:`, error);
        }

    }

    console.log("Iniciando backup de poseidon");

    try {
        // Ruta poseidon
        const ruta_poseidon = "/datadrive/backup/db/poseidon"

        // Nombre del contenedor de escuela donde se saca poseidon
        const escuela_poseidon = "coma_esgeo";

        // Crear carpeta temporal para backups
        resultadoComando = await ejecutarComando(conn, `mkdir -p /tmp/dbs/poseidon`);

        // Buscar el archivo más reciente en la carpeta de backups
        resultadoComando = await ejecutarComando(conn, `docker exec ${escuela_poseidon} bash -c "ls -t ${ruta_poseidon} | head -n 1"`);
        console.log(`Backup reciente en de poseidon: ${resultadoComando}`);

        // Extraer el nombre del archivo más reciente
        const match3 = resultadoComando.match(/Resultado:\s*(\S+)/);

        if (match3) {
            const poseidon_reciente = match3[1];
            // Saca el backup del contenedor a la carpeta local
            resultadoComando = await ejecutarComando(conn, `docker cp "${escuela_poseidon}:${ruta_poseidon}/${poseidon_reciente}" "/tmp/dbs/poseidon"`);
            console.log(`Copiar backup de poseidon: ${resultadoComando}`);
        } else {
            console.log("No se encontró division backup");
        }
    } catch (error) {
        console.error(`Error al sacar backup posiedon:`, error);
    }

    console.log("Fin backup de poseidon");

    // Copiar archivos al servidor
    const resultadoTransferencia = await descargarArchivos(config, '/tmp/dbs/.', './backups/database');
    console.log(resultadoTransferencia);

    // Eliminar backups
    resultadoComando = await ejecutarComando(conn, 'rm -rf /tmp/dbs');
    console.log(`Resultado al borrar backups temporales: ${resultadoComando}`);

    conn.end();

}

module.exports = { backupDB };