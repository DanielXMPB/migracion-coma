# If webapps/eisi exists, it means this container has been recreated and previously deployed. Do not deploy again.
# This should only be ran once, when the container is created for the first time and no COMA files exist in webapps.
if [ ! -d /datadrive/tomcat/webapps/eisi ]; then
    echo "Running one-time initialization command..."

    # Creates webapps/eisi directory
    mkdir -p /datadrive/tomcat/webapps/eisi/

    # Unzips COMA
    unzip -qq /datadrive/build/eisi.war -d /datadrive/tomcat/webapps/eisi/

    echo "Finished unzipping eisi.war"

    # Creates directories for certain files in COMA
    mkdir -p /datadrive/tomcat/webapps/eisi/WebProfesor
    mkdir -p /datadrive/tomcat/webapps/eisi/grupo

    # Database backups
    mkdir -p /datadrive/backup/diamante
    mkdir -p /datadrive/backup/poseidon
    mkdir -p /datadrive/backup/division

    # Copies original file from first time creation (migration related)
    rsync -a /datadrive/original_files/css/colorEscuela.css /datadrive/tomcat/webapps/eisi/css/
    rsync -a /datadrive/original_files/images/ /datadrive/tomcat/webapps/eisi/images/
    rsync -a /datadrive/original_files/ArchivosProfesores/ /datadrive/tomcat/webapps/eisi/ArchivosProfesores/
    rsync -a /datadrive/original_files/WebProfesor/ /datadrive/tomcat/webapps/eisi/WebProfesor/
    rsync -a /datadrive/original_files/grupo/ /datadrive/tomcat/webapps/eisi/grupo/
    rsync -a /datadrive/original_files/archivos/ /datadrive/archivos/
    rsync -a /datadrive/original_files/Profesores/ /datadrive/tomcat/webapps/

    echo "Finished transferring files."
fi

# Create maintenance directory IF it doesn't exist
if [ ! -d /datadrive/maintenance ]; then
    mkdir -p /datadrive/maintenance
fi

# Start crontab
service cron start

# Start Tomcat
catalina.sh run