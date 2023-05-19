(function go() {
    
    window.events = [

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

        {
            id: "e4",
            t: "msg",
            n: "Are you afraid of AI?",
            msg: "Are you afraid of AI?",
            opts: [{id:"alittle",text:"A Little Bit"}, {id:"yes",text:"Terrified"},  {id:"no",text:"Bring It On"}],
            ty: "That's understandable."
        },

        {
            id: "e4.5",
            n: "Afraid of AI reveal",
            t: "reveal",
            revid: "e4"
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
            msg: "Thank you for participating in this survey."
        },

    ];


})();
 