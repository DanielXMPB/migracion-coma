#!/bin/bash

# List of your Docker Compose files
COMPOSE_FILES=("eisi.yml" "fifme.yml" "edi.yml" "fifqui.yml" "trs.yml" "fch.yml" "vac.yml" "esfis.yml" "cie.yml" "esquim.yml" "eci.yml" "esmed.yml" "em.yml" "his.yml" "mat.yml" "bio.yml" "idio.yml" "ipred.yml" "eeie.yml" "eder.yml" "eart.yml" "e2con.yml" "efis.yml" "esfil.yml" "esenf.yml" "edu.yml" "nutri.yml" "eim.yml" "eip.yml" "eiq.yml" "eimt.yml" "esgeo.yml" "e3t.yml")
CONTAINER_NAMES=("eisi" "fifme" "edi" "fifqui" "trs" "fch" "vac" "esfis" "cie" "esquim" "eci" "esmed" "em" "his" "mat" "bio" "idio" "ipred" "eeie" "eder" "eart" "e2con" "efis" "esfil" "esenf" "edu" "nutri" "eim" "eip" "eiq" "eimt" "esgeo" "e3t")

# Loop through each file and bring down the services
for FILE in "${COMPOSE_FILES[@]}"
#for FILE in "${CONTAINER_NAMES[@]}"
do
    #echo "Bringing down services from $FILE"
    docker compose -f "$FILE" up -d
    #docker compose -f "$FILE" down
    #docker volume rm "coma_${FILE}_files_backup"
done

echo "All services stopped."