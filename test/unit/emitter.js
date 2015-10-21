require("webcomponents-lite");
require('../../');

Promise.resolve().then(function() {

  console.time("Emitter assertions");
  
  var matrix = document.createElement("table-matrix");  
  console.assert(!!matrix,"not registered", matrix);
  console.assert(!!matrix.on,"missing on", matrix);
  console.assert(!!matrix.emit,"missing emit", matrix); 
})
.then(function(counter) {  
  
  console.timeEnd( "Emitter assertions");
})