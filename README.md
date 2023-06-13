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

== launch ngrok ==

# ngrok tcp 9001

== kill mosquitto server ==

# pkill mosquitto
