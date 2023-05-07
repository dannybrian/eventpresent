mosquitto -c ./servers/mosquitto.conf > ./servers/logs/mosquitto.log 2>&1 &
node-red -s ./servers/node-red-settings.cjs ./servers/node-red-flows.json > ./servers/logs/node-red.log 2>&1 &
node servers/admin-node.js > ./servers/logs/admin-node.log 2>&1 &
sudo nginx -c servers/nginx.conf -p /home/dbrian/Sources/eventpresent/

