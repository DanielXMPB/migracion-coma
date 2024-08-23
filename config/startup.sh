if [ ! -f /tmp/initializated ]; then
    echo "Running one-time initialization command..."

    touch /tmp/initializated

    mkdir -p /datadrive/tomcat/webapps/eisi/
    cp -r /datadrive/build/eisi.war -d /datadrive/tomcat/webapps/

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "Finished unzipping eisi.war"

    rm -rf /datadrive/tomcat/webapps/eisi/css/*
    rm -rf /datadrive/tomcat/webapps/eisi/images/*
    rm -rf /datadrive/tomcat/webapps/eisi/ArchivosProfesores/*

    mkdir -p /datadrive/tomcat/webapps/eisi/WebProfesor
    mkdir -p /datadrive/tomcat/webapps/eisi/grupo
    #mkdir -p /datadrive/archivos

    mkdir -p /datadrive/backup/files/css
    mkdir -p /datadrive/backup/files/images
    mkdir -p /datadrive/backup/files/ArchivosProfesores
    mkdir -p /datadrive/backup/files/WebProfesor
    mkdir -p /datadrive/backup/files/grupo

    # Backups de bases de datos
    mkdir -p /datadrive/backup/db/diamante
    mkdir -p /datadrive/backup/db/poseidon
    mkdir -p /datadrive/backup/db/division

    # Copies original file from first time creation
    cp -r /datadrive/original_files/css/* /datadrive/tomcat/webapps/eisi/css/
    cp -r /datadrive/original_files/images/* /datadrive/tomcat/webapps/eisi/images/
    cp -r /datadrive/original_files/ArchivosProfesores/* /datadrive/tomcat/webapps/eisi/ArchivosProfesores/
    cp -r /datadrive/original_files/WebProfesor/* /datadrive/tomcat/webapps/eisi/WebProfesor/
    cp -r /datadrive/original_files/grupo/* /datadrive/tomcat/webapps/eisi/grupo/

    #cp -r /datadrive/tomcat/datos/archivosDatadrive/* /datadrive/archivos/
    cp -r /datadrive/original_files/Profesores/* /datadrive/tomcat/webapps/

    echo "Finished transferring files."
else
    cp -ru /datadrive/tomcat/webapps/eisi/css/* /datadrive/backup/files/css/
    cp -ru /datadrive/tomcat/webapps/eisi/images/* /datadrive/backup/files/images/
    cp -ru /datadrive/tomcat/webapps/eisi/ArchivosProfesores/* /datadrive/backup/files/ArchivosProfesores/
    cp -ru /datadrive/tomcat/webapps/eisi/WebProfesor/* /datadrive/backup/files/WebProfesor/
    cp -ru /datadrive/tomcat/webapps/eisi/grupo/* /datadrive/backup/files/grupo/

    rm -rf /datadrive/tomcat/webapps/eisi/*

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "Finished unzipping AGAIN"

    rm -rf /datadrive/tomcat/webapps/eisi/css/*

    cp -r /datadrive/backup/files/css/* /datadrive/tomcat/webapps/eisi/css/
    cp -r /datadrive/backup/files/images/* /datadrive/tomcat/webapps/eisi/images/
    cp -r /datadrive/backup/files/ArchivosProfesores/* /datadrive/tomcat/webapps/eisi/ArchivosProfesores/
    cp -r /datadrive/backup/files/WebProfesor/* /datadrive/tomcat/webapps/eisi/WebProfesor/
    cp -r /datadrive/backup/files/grupo/* /datadrive/tomcat/webapps/eisi/grupo/

    echo "Finished copying current files."
fi

catalina.sh run