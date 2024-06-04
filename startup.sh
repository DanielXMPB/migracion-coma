if [ ! -f /tmp/initializated ]; then
    echo "Running one-time initialization command..."

    touch /tmp/initializated

    apt-get update && \
    apt-get install -y unzip && \
    apt-get clean

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "WAR Descomprimido"

    rm -rf /datadrive/tomcat/webapps/eisi/css/*
    rm -rf /datadrive/tomcat/webapps/eisi/images/*
    rm -rf /datadrive/tomcat/eisi/Archivos/*
    rm -rf /datadrive/tomcat/eisi/ArchivosProfesores/*

    cp -r /datadrive/tomcat/datos/css/* /datadrive/tomcat/webapps/eisi/css/
    cp -r /datadrive/tomcat/datos/images/* /datadrive/tomcat/webapps/eisi/images/
    cp -r /datadrive/tomcat/datos/Archivos/* /datadrive/tomcat/eisi/Archivos/
    cp -r /datadrive/tomcat/datos/ArchivosProfesores/* /datadrive/tomcat/eisi/ArchivosProfesores/
    cp -r /datadrive/tomcat/datos/WebProfesor/* /datadrive/tomcat/webapps/eisi/WebProfesor/
    cp -r /datadrive/tomcat/datos/grupo/* /datadrive/tomcat/webapps/eisi/grupo/

    cp -r /datadrive/tomcat/datos/archivosDatadrive/* /datadrive/archivos/
    cp -r /datadrive/tomcat/datos/Profesores/* /datadrive/tomcat/webapps/
fi

catalina.sh run