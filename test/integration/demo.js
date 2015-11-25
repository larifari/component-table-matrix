// Prerequisits
require("webcomponents-lite");
require("asset-css").master();
require("insert-css")("body { margin:6px; }");
require('../../');  

document.title = "Table-Matrix";

var matrix = document.querySelector("table-matrix"); 

matrix.set([
  
  // First row
  [
    { "type":"expert", "icon":"indikation", data:"hallo" },
    { "type":"expert", "icon":"kontra" },
    { "type":"expert", "icon":"dosing" },
    { "type":"expert", "icon":"niere" },
    { "type":"expert", "icon":"matrix-selbst" },
    { "type":"expert", "icon":"matrix-fremd" },
    { "type":"expert", "icon":"qt" },
    { "type":"expert", "icon":"schwangerschaft" },
    { "type":"expert", "icon":"alter" }
  ],
  [
    { "type":"box", grad:"A" },
    { "type":"box", grad:"B" },
    { "type":"box", grad:"C" },
    { "type":"box", grad:"D" },
    { "type":"box", grad:"X" },
    // should not show anything
    { "type":"box", grad:"Z" }, 
    // noch nicht bearbeitet  
    { "type":"box", grad:"?", icon:"" }, 
    // Unzutreffend Schwanger Mann
    { "type":"box", grad:"U", icon:"" }, 
    // fehlende Angaben des Patienten 
    { "type":"box", grad:"!", icon:"" }, 
    // ohne Klassifikation aber bearbeitet
    { "type":"box", grad:"O", icon:"" }, 
  ],
  [ 
    { "type":"expand", "icon":"open",  text:"88" },
    { "type":"expand", "icon":"open",  text:"8" },
    { "type":"expand", "icon":"close", text:"88" }
  ],
  [ 
    { "type":"left", grad:"A" },
    { "type":"left", grad:"B" },
    { "type":"left", grad:"C" },
    { "type":"left", grad:"D" },
    { "type":"left", grad:"X" },
    // should not show any label
    { "type":"left", grad:"Z" }
  ],
  [
    { "type":"line", grad:"B", text:"BBB" },
    { "type":"line", grad:"A", text:"AAA" },
    { "type":"line", grad:"Z", text:"AAA" }
  ]
]);

matrix.on("select", function(element,data) {
  if(element.hasAttribute("data-type")) {
    console.log( element.getAttribute("data-type"),data );
  }
});
