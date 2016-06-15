var factory = require("component-factory");
var css = require("insert-css");
var fs = require("fs");
var domify = require("domify");
var style = require("code-style");

css( fs.readFileSync(__dirname + "/style.css", "utf-8"));

var matrix = factory(HTMLElement.prototype);

matrix.createdCallback = function(){

  var html = fs.readFileSync(__dirname + "/template.html", "utf8");
  this.appendChild( domify(html) );

  this.table = this.querySelector("table");
  this.height = this.getAttribute("height") || "50";
  this.width = this.getAttribute("width") || "50";
  
};

matrix.attachedCallback = function() {
  
  this.touchable("td");

  this.on("touch", function(element, data){

    var active = this.table.querySelector(".active");

    if (element.classList.contains("active")){
      element.classList.remove("active");
      this.emit("unselect", element, element.data);

    } else {
      if (!!active) active.classList.remove("active");
      element.classList.add("active");
      this.emit("select", element, element.data);
    }
  });

};

matrix.detachedCallback = function() {
  this.untouchable();
  this.off("touch");
}

matrix.select = function(el) {
  var td;

  if (el instanceof HTMLElement) td = el;
  if (typeof el == "string") td = this.table.querySelector(el);

  this.deSelectAll();

  td.classList.add("active");
};

matrix.selected = function(){
  return this.table.querySelector(".active");
};

matrix.selectedAll = function() {
  return this.table.querySelectorAll(".active");
};

matrix.deSelectAll = function() {
  var actives = this.table.querySelectorAll(".active");

  [].forEach.call( actives, function(active){
    active.classList.remove("active");
  });
};

matrix.selectIndex = function(index){
  this.select( this.table.childNodes[index] );
  return this;
};

matrix.selectedIndex = function(){
  return [].indexOf.call( this.table.childNodes, this.selected() );
};

matrix.selectFirst = function(){
  this.select( this.ul.firstChild );
  return this;
};

matrix.selectLast = function(){
  this.select( this.ul.lastChild );
  return this;
};

matrix.set = function( rows ){

  this.delete();

  this.data = rows;

  if (!rows) return;
  
  var content = document.createDocumentFragment();

  for ( var r = 0; r < rows.length; r++) {

    var row = document.createElement("tr");
    
    row.style.height = this.height+"px";

    for ( var c = 0; c < rows[r].length; c++ ) {
      var item = rows[r][c];
      var cell = document.createElement("td");
      cell.style.width = this.width+"px";
        
      cell.data = item.data ? JSON.parse(JSON.stringify(item.data)) : null;

      if( item.color ) cell.setAttribute("data-color", item.color);
      if( item.text ) cell.setAttribute("data-text", item.text);
      if( item.sup ) cell.setAttribute("data-sup", item.sup);

      if( item.icon ) {
        cell.setAttribute("data-icon", item.icon);
        cell.appendChild( style.import("svg", item.icon ) );
      }

      row.appendChild(cell);
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