# eventPresent

A simple (?) audience interactivity solution intended for custom-developed overlays to full-screen
presentations. This is an evolution of something I've been doing in my own presentations for
a long time, but more flexible and stable than what I'd built previously.

The components:

* The big screen presentation at `web/big/`. One of my goals here was to have zero UI dependencies,
  and I achieved that pretty easily with Custom Elements. All the frontends use the Paho MQTT client (32K).

* The audience app at `web/`. This is a PWA that prompts users with questions. Also zero UI dependencies.

* The speaker app at `web/admin/`. This is a PWA. It controls everything else as an authenticated admin user.

* An nginx web server for static assets, and reverse proxy for WebSocket.

* A Mosquitto server, which allows the Node servers to communicate. I considered using 
  MQTT also from all the apps, if only as insurance for the connection volume and payloads.
  But I decided to just use it for backend stuff.

* Node-RED, which contain all the (minimal) backend logic for messages and message
  routing.

To get things running, you need to install nginx, Mosquitto, yarn, NodeJS, and Node-RED. Do an `npm install` in the server dir. And really, that's all. See the `start.sh` script to get rolling.

The admin app prompts for a password, which needs to match the `adminapp` Mosquitto password, which you need to set using `mosquitto_passwd`. You also need to make sure the passwords match for the `adminred` user — setting it via the Mosquitto pwfile and also in the node-red flows. When deploying, change the password in Node-RED (the config is shared between nodes) and then via `mosquitto_passwd servers/mosquitto.pwfile USERNAME` for `adminred`, `adminapp`, and `big`; then match the passwords to `admin/index.html` and `big/index.html`.

There are a bunch of tests at `web/admin/test.html`. Also, all vanilla JS.

From that point, everything is driven via the presentation "script" at `web/admin/script.json`. The admin app sends events to Mosquitto, and from there they get routed to audience and big screen.

Lastly, use `yarn parcel web/index.html` to serve a build, and `yarn parcel build web/index.html` to built to `./dist`.

## Tips

It's easier to troubleshoot with MQTT if you listen for events:

    `% mosquitto_sub -u adminred -P PASSWORD -t "user/in"`
    `% mosquitto_sub -u adminred -P PASSWORD -t "user/out/+"`
    `% mosquitto_sub -t "\$SYS/broker/clients/connected"`
    `% mosquitto_sub -u adminred -P PASSWORD -t "admin/state"`

## Caveats

There is little access control here; any user can delete their ID from localStorage and have a new session. This is intentional, to allow for broad anonymous access. This obviously wouldn't be accepetable for anything long-lived, and there is bound to be hack potential.

