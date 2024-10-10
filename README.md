# COMA Arquitectura Docker

Describe la arquitectura de Docker utilizada para la migración de COMA hacia un servidor centralizado, el cual utiliza Docker.

# Versiones Utilizadas
- Tomcat v9.0.95
- MySQL v5.7.44
- Nginx v1.27.1
- JDK 21 (LTS)
- Actions Runner v2.319.1 con Ubuntu 24.04

# Descripción

### Portales

Cada portal fue creado a partir de un **.yml** presente en `/compose/template.yml`. Dicho .yml contiene un template para desplegar un nuevo portal, dónde se especifican todos los parámetros como variables de entorno.

Para crear un nuevo portal, se duplica el template y se cambian las variables de acuerdo a la escuela que va a desplegarse.

### Tomcat
El proyecto COMA fue migrado en el año 2024 hacia un servidor centralizado dentro de la universidad, perteneciente al grupo. Se conservó la estructura de los servidores anteriores, por lo que Tomcat y los archivos están en las rutas:
- `/datadrive/tomcat/`
- `/datadrive/archivos/`

Cada escuela tiene su propio contenedor de Tomcat.

#### Startup de Tomcat
El archivo `/config/startup.sh` del repositorio contiene un script que se ejecuta cada vez que el contenedor inicia. En este script está la lógica de conservación de archivos, portales de profesores y grupos, entre otros, para que cuándo se haga un despliegue, Tomcat no sobreescriba éstos archivos cuando detecta un cambio en el .war.

La primera vez que se crea el contenedor (es decir, cuándo se va a crear un nuevo portal web), sucede lo siguiente:
- Se crea el archivo `/tmp/initializated` para indicar que ya se ejecutó la configuración inicial.
- 


# Nombres de Contenedores

Los nombres de los contenedores siguen la nomenclatura de `coma_nombrecortoescuela`. A continuación se presenta una tabla con los nombres de los portales desplegados.

| Escuela | Nombre del Contenedor |
| :---:   | :---: |
| Sistemas | coma_eisi |
| Ingeniería Industrial | coma_eeie |
| Mecánica | coma_eim |
| Petróleos | coma_eip |
| E3T | coma_e3t |
| Biología | coma_bio |
| Economía | coma_e2con |
| Civil | coma_eci |
| Derecho | coma_eder |
| Diseño Industrial | coma_edi |
| Educación | coma_edu |
| Artes | coma_eart |
| Metalúrgica | coma_eimt |
| Ingeniería Química | coma_eiq |
| Filosofía | coma_esfil |
| Física | coma_esfis |
| Geología | coma_esgeo |
| Química | coma_esquim |
| Historia | coma_his |
| Trabajo Social | coma_trs |
| Idiomas | coma_idio |
| Matemáticas | coma_mat |
| Medicina | coma_esmed |
| Nutrición | coma_nutri |
| Fisioterapia | coma_efis |
| Microbiología | coma_em |
| Enfermería | coma_esenf |
| Facultad de Fisicomecánica | coma_fifme |
| Facultad de Fisicoquímicas | coma_fifqui |
| Facultad de Ciencias | coma_cie |
| Facultad de C. Humanas | coma_fch |
| Unidades de Apoyo | coma_vac |
| IPRED | coma_ipred |

# Comandos Frecuentes

Para ejecutar estos comandos, es necesario entrar por SSH al servidor donde se encuentran desplegadas los diversos portales.

- Para acceder a un contenedor, utilizar 

