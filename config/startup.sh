if [ ! -f /tmp/initializated ]; then
    echo "Running one-time initialization command..."

    touch /tmp/initializated

    mkdir -p /datadrive/tomcat/webapps/eisi/
    rsync -a /datadrive/build/eisi.war -d /datadrive/tomcat/webapps/

    # Se crea la carpeta de maintenance
    mkdir -p /datadrive/maintenance/

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "Finished unzipping eisi.war"

    #rm -rf /datadrive/tomcat/webapps/eisi/css/*
    #rm -rf /datadrive/tomcat/webapps/eisi/css/index8/colors/*
    #rm -rf /datadrive/tomcat/webapps/eisi/css/index7/*

    rm -rf /datadrive/tomcat/webapps/eisi/css/colorEscuela.css
    rm -rf /datadrive/tomcat/webapps/eisi/images/*
    rm -rf /datadrive/tomcat/webapps/eisi/ArchivosProfesores/*

    mkdir -p /datadrive/tomcat/webapps/eisi/WebProfesor
    mkdir -p /datadrive/tomcat/webapps/eisi/grupo
    mkdir -p /datadrive/archivos

    mkdir -p /datadrive/backup/files/css
    mkdir -p /datadrive/backup/files/images
    mkdir -p /datadrive/backup/files/ArchivosProfesores
    mkdir -p /datadrive/backup/files/WebProfesor
    mkdir -p /datadrive/backup/files/grupo
    mkdir -p /datadrive/backup/archivos

    # Backups de bases de datos
    mkdir -p /datadrive/backup/db/diamante
    mkdir -p /datadrive/backup/db/poseidon
    mkdir -p /datadrive/backup/db/division

    # Copies original file from first time creation
    #rsync -a /datadrive/original_files/css/index8/colors/ /datadrive/tomcat/webapps/eisi/css/index8/colors/
    #rsync -a /datadrive/original_files/css/index7/ /datadrive/tomcat/webapps/eisi/css/index7/
    rsync -a /datadrive/original_files/css/colorEscuela.css /datadrive/tomcat/webapps/eisi/css/
    rsync -a /datadrive/original_files/images/ /datadrive/tomcat/webapps/eisi/images/
    rsync -a /datadrive/original_files/ArchivosProfesores/ /datadrive/tomcat/webapps/eisi/ArchivosProfesores/
    rsync -a /datadrive/original_files/WebProfesor/ /datadrive/tomcat/webapps/eisi/WebProfesor/
    rsync -a /datadrive/original_files/grupo/ /datadrive/tomcat/webapps/eisi/grupo/
    rsync -a /datadrive/original_files/archivos/ /datadrive/archivos/
    rsync -a /datadrive/original_files/Profesores/ /datadrive/tomcat/webapps/

    echo "Finished transferring files."
else
    ##rsync -a /datadrive/tomcat/webapps/eisi/css/index8/colors/ /datadrive/backup/files/css/index8/colors/
    ##rsync -a /datadrive/tomcat/webapps/eisi/css/index7/ /datadrive/backup/files/css/index7/
    rsync -a /datadrive/tomcat/webapps/eisi/css/colorEscuela.css /datadrive/backup/files/css/colorEscuela.css
    rsync -a /datadrive/tomcat/webapps/eisi/images/ /datadrive/backup/files/images/
    rsync -a /datadrive/tomcat/webapps/eisi/ArchivosProfesores/ /datadrive/backup/files/ArchivosProfesores/
    rsync -a /datadrive/tomcat/webapps/eisi/WebProfesor/ /datadrive/backup/files/WebProfesor/
    rsync -a /datadrive/tomcat/webapps/eisi/grupo/ /datadrive/backup/files/grupo/

    rm -rf /datadrive/tomcat/webapps/eisi/*

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "Finished unzipping after deployment."

    #rm -rf /datadrive/tomcat/webapps/eisi/css/index8/colors/
    #rm -rf /datadrive/tomcat/webapps/eisi/css/index7/
    rm -rf /datadrive/tomcat/webapps/eisi/css/colorEscuela.css

    mkdir -p /datadrive/tomcat/webapps/eisi/WebProfesor
    mkdir -p /datadrive/tomcat/webapps/eisi/grupo

    #rsync -a /datadrive/backup/files/css/index8/colors/ /datadrive/tomcat/webapps/eisi/css/index8/colors/
    #rsync -a /datadrive/backup/files/css/index7/ /datadrive/tomcat/webapps/eisi/css/index7/
    rsync -a /datadrive/backup/files/css/colorEscuela.css /datadrive/tomcat/webapps/eisi/css/
    rsync -a /datadrive/backup/files/images/ /datadrive/tomcat/webapps/eisi/images/
    rsync -a /datadrive/backup/files/ArchivosProfesores/ /datadrive/tomcat/webapps/eisi/ArchivosProfesores/
    rsync -a /datadrive/backup/files/WebProfesor/ /datadrive/tomcat/webapps/eisi/WebProfesor/
    rsync -a /datadrive/backup/files/grupo/ /datadrive/tomcat/webapps/eisi/grupo/

    echo "Finished copying current files."
fi

cd /datadrive/realtime

source $HOME/.nvm/nvm.sh && pm2 start pm2.json

cd /datadrive/tomcat

service cron start

catalina.sh run