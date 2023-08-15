# FrontEnd_IOT_PROJECT

# IOT-FRONTEND

== LAUNCH JSON_SERVER ==

# json-server --watch json_Server/db.json -p 8000

== load jsonserver width auth ==

# json-server --watch json_Server/db.json -m ./node_modules/json-server-auth -p 8000

== kill process listenning on port 8000 : lsof -i:8000 ==

# sudo kill -9 <pid>

== launch mosquitto ==

# /usr/local/sbin/mosquitto -v -c /usr/local/etc/mosquitto/mosquitto.conf

# launch ngrok 

ngrok tcp 9001

# kill mosquitto server ==
brew services restart mosquitto
pkill mosquitto


# download icon image multiple format :
npx pwa-asset-generator public/wpa_icon.jpeg icons
# =========================================

# CHECK PORT : sudo lsof -i -P -n
pkill mosquitto if mosquitto running on background
or rebuild mosquitto image if launched on docker

# docker check mosquitto logs
cd mosquitto
sudo cat mosquitto/log/mosquitto.log
# =========================================

# generate certificate

# Problems I Encountered and Notes
While creating and working through these procedures i encountered the following problems

Error when connecting due to the common name on the server certificate not matching.
I password protected the server key and the broker couldn’t read it. I found this command which will remove the passphrase from the key –  openssl rsa -in server.key -out server-nopass.key.


Not using the correct name for the broker. I used the IP address and not the name that I entered into the certificate.You can use the tls_insecure_set(True) option to override name checking as a temporary measure.


Authentication errors as I had previously configured my broker to require passwords. Therefore try to start with a clean conf file and beware that the errors you are getting may not be SSL related.

What is a SAN?
SAN (Subject Alternative Name) is an extension to the X.509 certificate standard that allows multiple domain names to be associated with a single SSL (Secure Sockets Layer) certificate. This allows a single certificate to be used for multiple website domains or subdomains.

#  ===== !! command to shake certificate !! ============
openssl s_client -connect 192.168.1.10:9001  -tls1_2



#  === test 2 =================================

# mosquitto config
#
# Plain MQTT protocol
listener 1883

# End of plain MQTT configuration

# MQTT over TLS/SSL
listener 8883
cafile /etc/mosquitto/certs/ca.crt
certfile /etc/mosquitto/certs/hostname.crt
keyfile /etc/mosquitto/certs/hostname.key

# End of MQTT over TLS/SLL configuration

# Plain WebSockets configuration
listener 9001
protocol websockets

# End of plain Websockets configuration

# WebSockets over TLS/SSL
listener 9883
protocol websockets
cafile /etc/mosquitto/certs/ca.crt
certfile /etc/mosquitto/certs/hostname.crt
keyfile /etc/mosquitto/certs/hostname.key
#

# =================================================================
sudo openssl req -newkey rsa:4096  -x509  -sha512  -days 365 -nodes -out mosquitto_server.pem -keyout mosquitto_server.pem

# read the created certificate
openssl x509 -noout -in mosquitto_server.pem -text

# Extracting the public key from a certificate
sudo openssl req -new -x509 -days 365 -nodes -out mosquitto_server.pem -keyout mosquitto_server.key

# You can generate self signed ssl in a single command

#sudo openssl req -new -x509 -days 365 -nodes
#-out /etc/ssl/certs/dev .io.crt
#-keyout /etc/ssl/private/dev .io.key
#-subj “/C=KE/ST=NAIROBI/L=NAIROBI/O=IT/CN=dev .io”

# set the permissions appropriately

sudo chmod 600 mosquitto*

# main test
# Create CA key pair

openssl genrsa -out ca.key 2048

# Create CA certificate
# !! common name : myCA
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt

# Create Server Certificate used by Mosquitto for SSL/TLS
# The server certificate must be signed with the CA certificate just created.
openssl genrsa -out mosquitto_server.key 2048

# Create Certificate Signing Request
# !! common name : 192.168.1.10
openssl req -new -out mosquitto_server.csr -key mosquitto_server.key

# Verify and Sign the Certificate Request
openssl x509 -req -in mosquitto_server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out mosquitto_server.crt -days 3650

# refresh mqtt broker
sudo docker restart mosquitto
sudo docker ps

# Check in the Mosquitto log file that no errors occurred:
sudo cat mosquitto/log/mosquitto.log

# If you see any errors, stop the Mosquitto container again, try to fix them in the config files and start the container again. IMPORTANT: If you have made any changes to the docker-compose.yaml you must install and start again with the following command (docker start ignores changes in the YAML file):

=> docker-compose up