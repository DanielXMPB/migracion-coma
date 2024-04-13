apt-get update && \
    apt-get install -y unzip && \
    apt-get clean

unzip -qq /usr/local/tomcat/webapps/eisi.war -d /usr/local/tomcat/webapps/eisi/

printf WAR Descomprimido

rm -r /usr/local/tomcat/webapps/eisi/css/*

cp -r /usr/local/tomcat/datos/* /usr/local/tomcat/webapps/eisi/css/

catalina.sh run