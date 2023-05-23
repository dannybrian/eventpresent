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
            n: "Productive",
            msg: "Low Code Is More Productive Than Pro Code.",
            ty: "Thank you for your answer.",
            opts: [{id:"true",text:"True"}, {id:"false",text:"False"}],

        },

        {
            id: "e1.5",
            n: "Productive reveal",
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
            n: "Lock in",
            msg: "Some LCAPs Reduce Vendor Lock-In Better Than Others",
            opts: [{id:"true",text:"True"}, {id:"false",text:"False"}],
            ty: "We hope you agree with us here."
        },

        {
            id: "e2.5",
            n: "Lock in reveal",
            t: "reveal",
            revid: "e2"
        },

        {
            id: "e3",
            t: "msg",
            n: "Risk.",
            msg: "The Biggest Risk of LCAP Adoption Is — Citizen Development, Scalability, Security or Vendor Lock-In",
            opts: [{id:"true",text:"True"}, {id:"false",text:"False"}],
            ty: "We hope you will agree with us on this one."
        },

        {
            id: "e3.5",
            n: "Risk reveal",
            t: "reveal",
            revid: "e3"
        },

        {
            id: "e4",
            t: "msg",
            n: "Jobs",
            msg: "Pro Developers Are at a Risk of Losing Their Jobs Due to LCAP Adoption",
            opts: [{id:"true",text:"True"}, {id:"false",text:"False"}],
            ty: "Kyle will be wrong about everything, by the way."
        },

        {
            id: "e4.5",
            n: "Jobs reveal",
            t: "reveal",
            revid: "e4"
        },
        
        {
            id: "e5",
            t: "msg",
            n: "Pick right",
            msg: "Pro Developers Are at a Risk of Losing Their Jobs Due to LCAP Adoption",
            opts: [{id:"true",text:"True"}, {id:"false",text:"False"}],
            ty: "Kyle will be wrong about everything, by the way."
        },
        
        {
            id: "e5.5",
            n: "Pick right reveal",
            t: "reveal",
            revid: "e5"
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
 