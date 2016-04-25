// Prerequisits
require("webcomponents-lite");
require('../../');  

var style = require("code-style");

style.import("svg");
style.import("css");

document.title = "Table-Matrix";

var matrix = document.querySelector("table-matrix"); 

matrix.set([
  
  // First row
  [
    { "icon":"dosierung", color:"black" },
    { "icon":"indication", color:"black", data:"hallo" },
    { "icon":"kontra", color:"black" },
    { "icon":"niere", color:"grey" },
    { "icon":"selbst", color:"grey" },
    { "icon":"fremd" },
    { "icon":"qtc" },
    { "icon":"schwanger" },
    { "icon":"alter" }
  ],
  [
    { "icon":"box", text:"A", color:"green" },
    { "icon":"box", text:"B", color:"yellow" },
    { "icon":"box", color:"orange" },
    { "icon":"box", color:"red" },
    { "icon":"box", color:"darkred" },
    // should not show anything only grey box
    { "icon":"box", color:"blue" }, 
    // noch nicht bearbeitet => sanduhr
    { "icon":"wait" }, 
    // Unzutreffend Schwanger Mann => pause
    { "icon":"pause" }, 
    // fehlende Angaben des Patienten => crossout search
    { icon:"notfound" }, 
    // ohne Klassifikation aber bearbeitet => info
    { icon:"info", color:"blue" }, 
  ],
  [ 
    { "icon":"right",  sup:"88" },
    { "icon":"right",  sup:"8" },
    { "icon":"left",  }
  ],
  [
    { "icon":"line", color:"orange", text:"BBB" },
    { "icon":"line", color:"green", text:"AAA" },
    { "icon":"line", color:"black", text:"AAA" }
  ]
]);

matrix.on("select", function(element,data) {
  if(element.hasAttribute("data-type")) {
    console.log( element.getAttribute("data-type"),data );
  }
});
