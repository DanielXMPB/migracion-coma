module.exports = function (grunt) {

    // Configuración de tareas
    grunt.initConfig({
        sshconfig: {
            server: {
                host: '10.6.100.3',
                port: 22,
                username: 'root',
                privateKey: grunt.file.read("config/id_rsa")
            }
        },
        sshexec: {
            test: {
                command: 'bash -s echo "Hello World!"',
                options: {
                    config: 'server'
                }
            },
            despliegue: {
                command: 'bash -s < /scripts/despliegue.sh',
                options: {
                    config: 'server'
                }
            },
            copiar_crontabs: {
                command: 'bash -s < /scripts/utilidades.sh',
                options: {
                    config: 'server'
                }
            },
            queries_diamante: {
                command: 'bash -s < /scripts/queries_diamante.sh',
                options: {
                    config: 'server'
                }
            },
            queries_division: {
                command: 'bash -s < /scripts/queries_division.sh',
                options: {
                    config: 'server'
                }
            },
            queries_poseidon: {
                command: 'bash -s < /scripts/queries_poseidon.sh',
                options: {
                    config: 'server'
                }
            }
        }
    });

    // Cargar el plugin que proporciona la tarea "sshexec"
    grunt.loadNpmTasks('grunt-ssh');

    // Definir las tareas por defecto
    grunt.registerTask('default', [
        'sshexec:test',
        'sshexec:despliegue',
        'sshexec:copiar_crontabs',
        'sshexec:queries_diamante',
        'sshexec:queries_division',
        'sshexec:queries_poseidon'
    ]);
};