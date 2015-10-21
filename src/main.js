var factory = require("component-factory");
var css = require("insert-css");
var fs = require("fs");
var domify = require("domify");

css( fs.readFileSync(__dirname + "/style.css", "utf-8"));

var matrix = factory(HTMLElement.prototype);

matrix.createdCallback = function(){

  var html = fs.readFileSync(__dirname + "/template.html", "utf8");
  this.appendChild( domify(html) );

  this.table = this.querySelector("table");
  this.height = this.getAttribute("height");
  this.width = this.getAttribute("width");
  
};

matrix.attachedCallback = function() {
  
  this.touchable("td");

  this.on("touch", function(element, data){

    var active = this.table.querySelector(".active");

    if (element.classList.contains("active")){
      element.classList.remove("active");
      this.emit("unselect", element, element.getData());

    } else {
      if (!!active) active.classList.remove("active");
      element.classList.add("active");
      this.emit("select", element, element.getData());
    }
  });

};

matrix.detachedCallback = function() {
  this.untouchable();
}

matrix.select = function(el) {
  var td;

  if (el instanceof HTMLElement) td = el;
  if (typeof el == "string") td = this.table.querySelector(el);

  this.deSelectAll();

  td.classList.add("active");
};

matrix.deSelectAll = function() {
  var actives = this.table.querySelectorAll(".active");

  [].forEach.call( actives, function(active){
    active.classList.remove("active");
  });
};

matrix.set = function( rows ){

  this.delete();

  this.data = rows;

  if (!rows) return;
  
  var content = document.createDocumentFragment();

  for ( var r = 0; r < rows.length; r++) {

    var row = document.createElement("tr");
    
    if( this.height ) {
      row.style.height = this.height+"px";
    }

    for ( var c = 0; c < rows[r].length; c++ ) {

      var point = rows[r][c];

      if ( point ) {
        var cell = document.createElement("td");
        
        cell.getData = function() {
          return point;
        };
        // DATA KEYS
        for ( var key in point ) {
          if (point[key] != null){
            cell.setAttribute("data-" + key, point[key]);
          }
        }
        if (!!this.width){
            cell.style.width = this.width+"px";
        }
        
        row.appendChild(cell);
      }
    }
    content.appendChild(row);

  };
  this.table.style.width = (rows[0].length * this.width) + "px";

  this.table.innerHTML = "";
  this.table.appendChild(content);
};

matrix.get = function(){ return this.data; };

matrix.delete = function(){
  this.table.innerHTML = "";
  this.table.style.width = "0px";
};

matrix.show = function() {
  this.hidden = false;
};

matrix.hide = function() {
  this.hidden = true;
};

document.registerElement("table-matrix", {
  "prototype": matrix
});