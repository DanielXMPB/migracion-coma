if [ ! -f /tmp/initializated ]; then
    echo "Running one-time initialization command..."

    touch /tmp/initializated

    apt-get update && \
    apt-get install -y unzip && \
    apt-get clean

    unzip -qq /datadrive/tomcat/webapps/eisi.war -d /datadrive/tomcat/webapps/eisi/

    printf WAR Descomprimido

    rm -r /datadrive/tomcat/webapps/eisi/css/*
    rm -r /datadrive/tomcat/webapps/eisi/images/*

    cp -r /datadrive/tomcat/datos/css/* /datadrive/tomcat/webapps/eisi/css/
    cp -r /datadrive/tomcat/datos/images/* /datadrive/tomcat/webapps/eisi/images/
    cp -r /datadrive/tomcat/datos/archivos/* /datadrive/archivos/
fi

catalina.sh run