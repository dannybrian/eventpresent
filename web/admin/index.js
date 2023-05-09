"use strict";

(function go() {
    
    const events = [

        { 
            id: "e000",
            n: "Clear retained messages",
            t: "clear",
        },

        {
            id: "e0",
            t: "msg",
            n: "Welcome",
            msg: "Thank you for joining this quick survey! Four quick questions. This won't take long...",
            url: "show",
        },

        {
            id: "e1",
            t: "msg",
            n: "Build versus Buy! Pick a side.",
            msg: "Build versus Buy! Pick a side.",
            ty: "(We know that was an unfair question. Sorry.)",
            opts: [{id:"buy",text:"Build"}, {id:"build",text:"Buy"}],

        },

        {
            id: "e1.5",
            n: "Build v buy reveal",
            t: "reveal",
            revid: "e1"
        },

        /*{
            id: "e1",
            t: "msg",
            n: "Code, asset or liability",
            msg: "Code is a[n]...",
            ty: "How typical.",
            opts: [{id:"asset",text:"Asset"}, {id:"liability",text:"Liability"}],

        },*/


        {
            id: "e2",
            t: "msg",
            n: "Low-Code! Take a side.",
            msg: "Low-Code? Take a side.",
            opts: [{id:"no",text:"Heck No!"}, {id:"maybe",text:"Maybe So"}, {id:"yes",text:"Let's Go!"}],
            ty: "(Again, very unfair. But thank you for your answer.)"
        },

        {
            id: "e2.5",
            n: "Low-code reveal",
            t: "reveal",
            revid: "e2"
        },

        {
            id: "e3",
            t: "msg",
            n: "The job of architects.",
            msg: "The primary job of architects to \"protect the enterprise from the future.\"",
            opts: [{id:"agree",text:"Agree"}, {id:"disagree",text:"Disagree"}],
            ty: "We hope you will agree with us on this one."
        },

        {
            id: "e3.5",
            n: "Job of architects reveal",
            t: "reveal",
            revid: "e3"
        },

        /*{
            id: "e4",
            t: "msg",
            n: "TMNT. Take a side.",
            msg: "TMNT. Take a side.",
            opts: [{id:"dumb",text:"Dumb"}, {id:"reallydumb",text:"Really dumb"}],
            ty: "Jason doesn't know I put this question in."
        },*/

        {
            id: "e10",
            t: "msg",
            n: "Thank you",
            msg: "Thank you for participating in this survey. (And I will take pull requests!)"
        },

    ];

    const adminpass = "Plymouth34"; // FIXME

    /* Copyright 2017 Andrey Sitnik <andrey@sitnik.ru> */
    const nanoid = (t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");
    let unid = localStorage.getItem('unid');
    if (unid == null) {
        unid = nanoid(10);
        localStorage.setItem('unid', unid);
        // this won't pretent resets or incognito mode, but don't really care.
    }

    let template = document.getElementsByTagName("template")[0];
    let rowtemplate = template.content.querySelector("div");
    let table = document.querySelector("p");

    const mqtt = new Paho.MQTT.Client(location.hostname, 8090, unid);
    mqtt.connect({ keepAliveInterval: (60 * 5),
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
                                    highlightEvent(payload.id);
                                    break;
                                case "admin/state":
                                    if (payload.t === "clear") {
                                        highlightEvent(payload.id);
                                    }
                                    // console.log(payload.clients);
                                    break;
                                case "big":
                                    if (payload.t === "reveal") {
                                        highlightEvent(payload.id);
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

    function highlightEvent(id) {
        if (id !== null) {
            let tr = document.getElementById(id);
            if (tr !== null) {
                tr.classList.add('highlight');
            }
        }
    }

})();
 
