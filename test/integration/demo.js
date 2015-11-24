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
    { atc:"J01CR02", grad:"A" },
    { atc:"J01CR02", grad:"B" },
    { atc:"J01CR02", grad:"C" },
    { atc:"J01CR02", grad:"D" },
    { atc:"J01CR02", grad:"X" },
    { atc:"J01CR02", grad:"?" },
    { atc:"J01CR02", grad:"O" },
  ],
  [ 
    { alternatives:88 },
    { alternatives:7 },
    { alternatives:6 },
    { alternatives:5 },
    { alternatives:4 },
    { alternatives:4 },
    { alternatives:4 }
  ],
  [ 
    { atc1:"J02R23", grad:"A" },
    { atc1:"J02R23", grad:"B" },
    { atc1:"J02R23", grad:"C" },
    { atc1:"J02R23", grad:"D" },
    { atc1:"J02R23", grad:"X" }
  ],
  [
    { atc:"J01CR02", grad:"C", text:"CCC" },
    { grad:"\f06a" }
  ]
]);

matrix.on("select", function(element,data) {
  if(data.alternatives) {
    element.classList.toggle("close");
  }
});
