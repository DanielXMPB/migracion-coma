if [ ! -f /tmp/initializated ]; then
    echo "Running one-time initialization command..."

    touch /tmp/initializated

    apt-get update && \
    apt-get install -y unzip && \
    apt-get clean

    echo "Unzip installed successfully."

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "Finished unzipping eisi.war"

    ##rm -rf /datadrive/tomcat/webapps/eisi/css/*
    ##rm -rf /datadrive/tomcat/webapps/eisi/images/*
    ##rm -rf /datadrive/tomcat/webapps/eisi/ArchivosProfesores/*

    mkdir -p /datadrive/tomcat/webapps/eisi/WebProfesor
    mkdir -p /datadrive/tomcat/webapps/eisi/grupo
    #mkdir -p /datadrive/archivos

    cp -r /datadrive/tomcat/datos/css/* /datadrive/tomcat/webapps/eisi/css/
    ##cp -r /datadrive/tomcat/datos/images/* /datadrive/tomcat/webapps/eisi/images/
    ##cp -r /datadrive/tomcat/datos/ArchivosProfesores/* /datadrive/tomcat/webapps/eisi/ArchivosProfesores/
    cp -r /datadrive/tomcat/datos/WebProfesor/* /datadrive/tomcat/webapps/eisi/WebProfesor/
    cp -r /datadrive/tomcat/datos/grupo/* /datadrive/tomcat/webapps/eisi/grupo/

    #cp -r /datadrive/tomcat/datos/archivosDatadrive/* /datadrive/archivos/
    cp -r /datadrive/tomcat/datos/Profesores/* /datadrive/tomcat/webapps/

    echo "Finished transferring files."
fi

catalina.sh run