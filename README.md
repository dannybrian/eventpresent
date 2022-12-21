# eventPresent

A simple (?) audience interactivity solution intended for custom-developed overlays to full-screen
presentations. This is an evolution of something I've been doing in my own presentations for
a long time, but more flexible and stable than what I'd built previously.

The components:

* The big screen presentation. One of my goals here was to have zero UI dependencies, and I achieved that
  pretty easily with Custom Elements. All the frontends use the Paho MQTT client (32K).

* The audience app. This is a PWA that prompts users with questions. Also zero UI dependencies.

* The speaker app. This is a PWA. It controls everything else as an admin user.

* An nginx web server for static assets, and reverse proxy for WebSocket.

* A Mosquitto server, which allows the Node servers to communicate. I considered using 
  MQTT also from all the apps, if only as insurance for the connection volume and payloads.
  But I decided to just use it for backend stuff.

* Node-RED, which contain all the (minimal) backend logic for messages and message
  routing.

To get things running, you need to install nginx, Mosquitto, NodeJS, and Node-RED. And really, that's all. See the
`start.sh` script to get rolling.

The admin app (http://HOSTNAME/admin) prompts for a password, which needs to match the `adminapp` Mosquitto
password, which you need to set using `mosquitto_passwd`. From that point, everything is driven via the 
presentation "script" at `web/admin/script.json`. This can in turn trigger other `adminapp` services such as a Node 
script which runs as a timer, or simply responding to events. 

## Caveats

There is little access control here; any user can delete their ID from localStorage and have a new session. 
This is intentional, to allow for broad anonymous access. This obviously wouldn't be accepetable for anything 
long-lived, and there is bound to be hack potential.


