/usr/local/sbin/mosquitto -c ./servers/mosquitto.conf &> ./servers/logs/mosquitto.log &
node-red -s ./servers/node-red-settings.cjs &> ./servers/logs/node-red.log &
node servers/admin-node.js &> ./servers/logs/admin-node.log &
nginx -c servers/nginx.conf -p /Users/dbrian/Sources/eventpresent/


