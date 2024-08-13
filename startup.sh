if [ ! -f /tmp/initialized ]; then
    echo "Running one-time initialization command..."

    touch /tmp/initialized

    # apt-get update && \
    # apt-get install -y unzip && \
    # apt-get clean

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "Finished unzipping eisi.war"

    rm -rf /datadrive/tomcat/webapps/eisi/css/*
    rm -rf /datadrive/tomcat/webapps/eisi/images/*
    rm -rf /datadrive/tomcat/webapps/eisi/Archivos/*
    rm -rf /datadrive/tomcat/webapps/eisi/ArchivosProfesores/*
    mkdir /datadrive/tomcat/webapps/eisi/grupo
    mkdir /datadrive/tomcat/webapps/eisi/WebProfesor

    cp -r /datadrive/tomcat/datos/css/* /datadrive/tomcat/webapps/eisi/css/
    cp -r /datadrive/tomcat/datos/images/* /datadrive/tomcat/webapps/eisi/images/
    cp -r /datadrive/tomcat/datos/Archivos/* /datadrive/tomcat/webapps/eisi/Archivos/
    cp -r /datadrive/tomcat/datos/ArchivosProfesores/* /datadrive/webapps/tomcat/eisi/ArchivosProfesores/
    cp -r /datadrive/tomcat/datos/WebProfesor/* /datadrive/tomcat/webapps/eisi/WebProfesor/
    cp -r /datadrive/tomcat/datos/grupo/* /datadrive/tomcat/webapps/eisi/grupo/

    cp -r /datadrive/tomcat/datos/archivosDatadrive/* /datadrive/archivos/
    cp -r /datadrive/tomcat/datos/Profesores/* /datadrive/tomcat/webapps/

    echo "Finished transferring files."
fi

catalina.sh run