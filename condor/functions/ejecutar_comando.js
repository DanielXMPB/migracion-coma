// Funcion para ejecutar un comando en el servidor

async function ejecutarComando(conn, comando) {
    return new Promise((resolve, reject) => {
        conn.exec(comando, (err, stream) => {
            if (err) return reject(err);
            let data = '';
            stream.on('close', (code, signal) => {
                resolve(`Resultado: ${data}`);
            }).on('data', (chunk) => {
                data += chunk;
            }).stderr.on('data', (chunk) => {
                console.error(`STDERR: ${chunk}`);
            });
        });
    });
}

module.exports = { ejecutarComando };