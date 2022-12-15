/* This is the admin Node WebSocket pooler and bridge to Mosquitto.
   Why not use Mosquitto directly from a browser library? I had a few
   reasons:
   
      1. I know Node can handle the WebSocket connections; Mosquitto is
         a bit of an unknown for me to public face it. So instead I'm 
         using them what they are good for.
      2. I wanted to avoid any and all front-end dependencies. This lets
         me use vanilla everything on the front-end.
*/

import { WebSocketServer } from "ws";
import { connect } from "mqtt";

const wss = new WebSocketServer({ port: 80 });
const mqtt = connect('mqtt://localhost');

wss.on('connection', function connection(ws) {
    console.log('connection');
    // input from admin app client
    ws.on('message', function message(data) {
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

