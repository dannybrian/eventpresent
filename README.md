# eventPresent

A simple audience polling solution intended for custom-developed overlays to full-screen
presentations. Think mild interactivity in the middle of an otherwise traditional stage 
engagement. This is an evolution of something I've been doing in my own presentations for
a long time, but more flexible and stable.

The components:

* The big screen presentation. This is pure HTML5, CSS, and JavaScript, and uses 
  vanilla WebSocket. One of my goals here was to have zero dependencies, and I achieved that
  pretty easily with Custom Elements.

* The audience app. This is a PWA, zero dependencies, that prompts users with questions.

* The speaker app. This is a PWA, also with zero dependencies. It controls everything else.

* An nginx web server for static assets, and reverse proxy for WebSocket.

* A Mosquitto server, which allows the Node servers to communicate. I considered using 
  MQTT also from all the apps, if only as insurance for the connection volume and payloads.
  But I decided to just use it for backend stuff.

* Node-RED, which contain all the (minimal) backend logic for messages and message
  routing.


