# Crear certificados

# FISICOMECANICAS
docker compose -f docker-compose-proxy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d fisicomecanicas.uis.edu.co -d uisinnova.uis.edu.co -d labolsa.uis.edu.co -d linkingup.uis.edu.co -d ingsistemas.uis.edu.co -d cormoran.uis.edu.co -d calumet.uis.edu.co -d ingenieriacivil.uis.edu.co -d civil.uis.edu.co -d albatros.uis.edu.co -d inme.uis.edu.co -d gph.uis.edu.co -d simposiopuentes2018.uis.edu.co -d disindustrial.uis.edu.co -d geps.uis.edu.co

docker compose -f docker-compose-proxy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d industrial.uis.edu.co -d carpintero.uis.edu.co -d opalo.uis.edu.co -d fym.uis.edu.co -d posgradoseeie.uis.edu.co -d innotec.uis.edu.co -d motivatic.uis.edu.co -d galea.uis.edu.co -d e3t.uis.edu.co -d cidlis.uis.edu.co -d cemos.uis.edu.co -d posgradose3t.uis.edu.co -d mecanicaxserver.uis.edu.co -d posgradosmecanica.uis.edu.co -d dicbot.uis.edu.co

# FISICOQUIMICAS
docker compose -f docker-compose-proxy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d fisicoquimicas.uis.edu.co -d geologia.uis.edu.co -d petroleos.uis.edu.co -d simposiogeomecanica.uis.edu.co -d git.uis.edu.co -d posgradospetroleos.uis.edu.co -d metalurgia.uis.edu.co -d iq.uis.edu.co

# CIENCIAS
docker compose -f docker-compose-proxy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d ciencia.uis.edu.co -d bio.uis.edu.co -d fis.uis.edu.co -d mat.uis.edu.co -d quim.uis.edu.co -d summerschool.uis.edu.co -d intercambiovirtual.uis.edu.co

# HUMANAS
docker compose -f docker-compose-proxy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d humanas.uis.edu.co -d escartes.uis.edu.co -d derecho.uis.edu.co -d esceconomia.uis.edu.co -d educacion.uis.edu.co -d paidopolis.uis.edu.co -d paidofest.uis.edu.co -d escuelafilosofia.uis.edu.co -d historia.uis.edu.co -d eidiomas.uis.edu.co -d trabajosocial.uis.edu.co

# SALUD
docker compose -f docker-compose-proxy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d enfermeria.uis.edu.co -d fisioterapia.uis.edu.co -d medicina.uis.edu.co -d microbiologia.uis.edu.co -d nutricion.uis.edu.co -d vacadem.uis.edu.co




# RENOVAR CERTIFICADOS
docker compose -f docker-compose-proxy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ renew