#/usr/local/sbin/mosquitto -c ./servers/mosquitto.conf -d
# node-red -s ./servers/node-red-settings.json
# node servers/admin-node.js
sudo nginx -s stop
killall node
killall node-red
killall mosquitto


