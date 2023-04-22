/* I've included this here just to test out the alternatives when it comes
   to client connections and a Node-based MQTT client. However, I've decided 
   to ditch this entirely in favor of a mosquitto + Node-RED solution. I'm 
   leaving this in order to keep the tests as-is in case I need an alternative.
*/

import { WebSocketServer } from "ws";
import { connect } from "mqtt";

const wss = new WebSocketServer({ port: 8091 });
const mqtt = connect('mqtt://localhost');

wss.on('connection', function connection(ws) {
    console.log('connection');
    // input from admin app client
    ws.on('message', function message(data) {
        try {
            let dataObj = JSON.parse(data);
            console.log('received: ' + data);
            if (dataObj.apass !== "12345") { // FIXME
                console.log('not admin!');
                ws.send(JSON.stringify({ "t": "leave" }));
                ws.close();
                return;
            }
            switch (dataObj.t) {
                // handle locally for a few things
                case "":
                    break;
                default:
                    // pass it through
                    mqtt.publish('admin/in', data);
            }
        } catch (err) {
            console.log(err.message);
            return;
        }
        
    });
});

mqtt.on('connect', function () {
    mqtt.subscribe('admin/out', function (err) {
        if (!err) {
            // mqtt.publish('user/in', 'Hello mqtt');
        }
    });
});

mqtt.on('message', function (topic, message) {
    console.log(message.toString());
    switch (topic) {
        // message from broker to admin app client
        case 'admin/out':
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
            break;
        case 'big':
            break;
    }
    // mqtt.end();
});

