# eventPresent

A simple (?) audience interactivity solution intended for custom-developed overlays to full-screen presentations. This is an evolution of something I've been doing in my own presentations for a long time, but more flexible and stable than what I'd built previously.

<img width="300" alt="image" src="https://github.com/dannybrian/eventpresent/assets/272520/94d86a19-e8d8-41d8-98db-19f6f070c731">
<img width="290" alt="image" src="https://github.com/dannybrian/eventpresent/assets/272520/d7c9f7ec-4019-4ca9-a225-9b83116dca94">
<img width="800" alt="image" src="https://github.com/dannybrian/eventpresent/assets/272520/6e593b41-dcc1-4214-b302-a6862653297d">

## The Components

* The big screen presentation at `web/big/`. One of my goals here was to have zero UI dependencies, and I achieved that pretty easily. All the frontends use the Paho MQTT client (32K), loaded via CDN.

* The audience app at `web/`. This app prompts users with questions. Also zero UI dependencies. The `index.html` gets generated via `index-src.html` using Parcel.

* The speaker app at `web/admin/`. It controls everything else as an authenticated admin user.

* An nginx web server for static assets, and reverse proxy for WebSocket/MQTT.

* Node-RED, which contain all the (minimal) backend logic for messages and message routing.

* A Mosquitto server, which connects all clients and NODE-RED.

## Setup

To get things running, you need to install nginx, Mosquitto, yarn, NodeJS, and Node-RED. Do an `npm install` in the server dir. And really, that's all. See the `start.sh` script to get rolling.

The admin app prompts for a password, which needs to match the `adminapp` Mosquitto password, which you need to set using `mosquitto_passwd`. You also need to make sure the passwords match for the `adminred` user — setting it via the Mosquitto pwfile and also in the node-red flows. When deploying, change the password in Node-RED (the config is shared between nodes) and then via `mosquitto_passwd servers/mosquitto.pwfile USERNAME` for `adminred`, `adminapp`, and `big`; then match the passwords to `web/admin/index.html` and `web/big/index.html`.

There are a bunch of tests at `web/admin/test.html`. Also, all vanilla JS.

From that point, everything is driven via the presentation "script" in `web/admin/script.js`. The admin app sends events over WebSocket to Mosquitto, and from there they get routed to audience and big screen.

## Build

Each .html file has a toggle for ssl. Use `yarn parcel src/index.html` to serve a build, and:

`yarn parcel build --dist-dir web/ src/index.html`

to build to `web/index.html`. The other apps (`big/` and `admin/`) aren't built, and don't need to be.

## Tips

It's easier to troubleshoot with MQTT if you listen for events:

    `% mosquitto_sub -u adminred -P PASSWORD -t "user/in"`
    `% mosquitto_sub -u adminred -P PASSWORD -t "user/out/+"`
    `% mosquitto_sub -t "\$SYS/broker/clients/connected"`
    `% mosquitto_sub -u adminred -P PASSWORD -t "admin/state"`

## Caveats

There is little enforcement here; any user can delete their ID from localStorage and have a new session. This is intentional, to allow for broad anonymous access. This obviously wouldn't be accepetable for anything long-lived, and there is bound to be hack potential.

I'm not entirely clear how Node-RED stores the MQTT server credentials, but I've found it periodically necessary to resupply Node-RED the mosquitto credentials after a restart. If things aren't working, re-login using one of the MQTT nodes in the flow.


