#!/bin/bash
catalina.sh run
wget http://security.ubuntu.com/ubuntu/pool/main/a/apt/apt_2.7.14build2_amd64.deb -O apt.deb
dpkg -i apt.deb
pkexec dpkg -i apt.deb
apt-get update
apt-get install rsync
rsync -av --delete /usr/local/tomcat/datos /usr/local/tomcat/webapps/eisi/css/