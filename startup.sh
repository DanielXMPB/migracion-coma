#!/bin/bash

# Iniciar Tomcat
catalina.sh run

sleep 5

# Copiar archivos desde eip_css a la ubicación deseada
rsync -av --delete /usr/local/tomcat/datos /usr/local/tomcat/webapps/eisi/css/
