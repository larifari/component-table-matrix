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
    { origin:false, atc:false, alternatives:8 },
    { origin:false, atc:"J01CR02", substance:"Irbesartan", grad:"B" },
    { origin:false, atc:"J01CR02", substance:"Irbesartan", grad:"C", text:"CCC" },
  ],
  [ 
    { atc1:"J02R23", grad:"D" },
    { atc1:"J02R23", grad:"D" },
    { atc1:"J02R23", grad:"D" }
  ]

]);

matrix.on("select", function(element,data) {
  console.log(data);
});
