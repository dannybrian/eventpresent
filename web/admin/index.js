"use strict";

(function go() {

    const ssl = false;
    
    const adminpass = "Plymouth34"; // FIXME

    /* Copyright 2017 Andrey Sitnik <andrey@sitnik.ru> */
    const nanoid = (t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
    /* Thanks Andrey */
        
    let unid = localStorage.getItem('unid');
    if (unid == null) {
        unid = nanoid(10);
        localStorage.setItem('unid', unid);
        // this won't pretent resets or incognito mode, but don't really care.
    }

    let template = document.getElementsByTagName("template")[0];
    let rowtemplate = template.content.querySelector("div");
    let table = document.querySelector("body");

    const mqtt = new Paho.MQTT.Client(`${location.hostname}/mqtt`, 80, unid);
    mqtt.connect({ 
	          useSSL: (ssl ? true : false),
	          keepAliveInterval: (60 * 5),
                  userName: "adminapp", password: adminpass,
                  onSuccess: function(msg) {
                        console.log("mqtt connected");
                        mqtt.onConnectionLost = function(response) {
                            if (response.errorCode !== 0) {
                                console.log("onConnectionLost:"+response.errorMessage);
                            }
                        }
                        mqtt.subscribe('user/state');
                        mqtt.subscribe('admin/state');
                        mqtt.subscribe('big');
                        mqtt.onMessageArrived = function (message) { 
                            let payload = JSON.parse(message.payloadString);
                            switch (message.destinationName) {
                                case "user/state":
                                    // highlight the successful round trip
                                    clearHighlights("user");
                                    highlightEvent(payload.id, "user");
                                    break;
                                case "admin/state":
                                    if (payload.t === "clear") {
                                        // highlightEvent(payload.id, "big");
                                        clearHighlights();
                                    }
                                    // console.log(payload.clients);
                                    break;
                                case "big":
                                    if (payload.t === "reveal") {
                                        clearHighlights("big");
                                        highlightEvent(payload.id, "big");
                                    }
                                    // console.log(payload.clients);
                                    break;
                                default:
                            }
                        };
                  },
                  onFailure: function(msg) { console.log("mqtt connection failed: " + JSON.stringify(msg)) }
            });

    // create list of tests
    events.forEach((test, index) => {
        let row = document.importNode(rowtemplate, true);
        row.setAttribute('id', test.id);
        row.querySelectorAll('div.column p')[0].textContent = test.n;
        let button = row.querySelectorAll('div div.button')[0];
        button.onclick = function() {
            button.classList.add('active');
            setTimeout( function() { button.classList.remove('active') }, 1000);
            sendEvent(index);
        }
        table.appendChild(row);
    });

    async function sendEvent(eventnum) {
        let cb = function(index, success, message) {
            message = (typeof message === 'undefined') ? "" : message;
            toggletest(index, success, message);
        }
        mqtt.send('admin/in', JSON.stringify(events[eventnum]));
        //events[eventnum].f(cb, eventnum);
    }

    function highlightEvent(id, type) {
        //console.log(id);
        if (id !== null) {
            let tr = document.getElementById(id);
            if (tr !== null) {
                tr.classList.add('highlight');
                tr.classList.add(type);
            }
        }
    }
    
    function clearHighlights(type) {
        var rows;
        if (type != undefined) {
            rows = document.querySelectorAll('.row.' + type);
        }
        else
        {
            rows = document.querySelectorAll('.row');
        }
        rows.forEach((tr) => {
            tr.classList.remove('highlight', 'user', 'big');
        });
    }

})();
 
