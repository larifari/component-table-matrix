(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require("./style.css");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttonColor = function (_HTMLElement) {
  _inherits(buttonColor, _HTMLElement);

  function buttonColor() {
    _classCallCheck(this, buttonColor);

    return _possibleConstructorReturn(this, (buttonColor.__proto__ || Object.getPrototypeOf(buttonColor)).apply(this, arguments));
  }

  _createClass(buttonColor, [{
    key: "onclick",
    value: function onclick(e) {
      if (e.target.tagName == "BUTTON-COLOR") {
        this.callback(this.data);
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      this.setAttribute('disabled', true);
    }
  }, {
    key: "enable",
    value: function enable() {
      this.removeAttribute('disabled', false);
    }
  }, {
    key: "data",
    set: function set(val) {
      this._data = val;
    },
    get: function get() {
      return this._data;
    }
  }, {
    key: "ontouch",
    set: function set(callback) {
      this.callback = callback;
      this.addEventListener("click", this.onclick);
    }
  }]);

  return buttonColor;
}(HTMLElement);

try {
  customElements.define('button-color', buttonColor);
} catch (e) {
  console.log(' button-color already exists');
}

exports.default = buttonColor;

},{"./style.css":3}],3:[function(require,module,exports){
var css = "button-color {\n  display: inline-block;\n  position: relative;\n  border-radius: 4px;\n  cursor: pointer;\n  opacity: 0.9;\n  outline: none;\n  height: 40px;\n  border: 2px solid blue;\n  min-width: 20px;\n  text-decoration: none;\n  transition: background-color 0.2s, color fill 0.2s;\n  padding-left: 5px;\n  padding-right: 5px;\n  margin: 9px;\n  vertical-align: middle;\n  white-space: nowrap;\n  overflow: hidden;\n}\nbutton-color > * {\n  display: inline-block !important;\n  pointer-events: none !important;\n}\nbutton-color ic-on svg {\n  height: 40px;\n  /* size with padding */\n  padding-top: 5px;\n  padding-bottom: 5px;\n  vertical-align: middle;\n  box-sizing: border-box;\n}\nbutton-color span {\n  vertical-align: middle;\n  line-height: 40px;\n  font-size: 1.2rem !important;\n}\nbutton-color.big {\n  height: 50px;\n}\nbutton-color.big svg {\n  height: 50px;\n  padding: 4px;\n  vertical-align: middle;\n}\nbutton-color.big span {\n  vertical-align: middle;\n  line-height: 50px;\n  /*font-size: 1.2rem !important;*/\n  margin-left: 5px;\n  margin-right: 5px;\n}\nbutton-color {\n  color: #555;\n  fill: #555;\n  background: none;\n  border: 1px solid #696969;\n  cursor: pointer;\n}\nbutton-color.selected {\n  color: #f2f1ec;\n  fill: #f2f1ec;\n  background: #696969;\n  border: 1px solid #696969;\n  cursor: pointer;\n}\nbutton-color[disabled=true] {\n  pointer-events: none;\n  color: #b2b2b2;\n  fill: #b2b2b2;\n}\nbutton-color.none {\n  color: #555;\n  fill: #555;\n  background: none;\n  border: none;\n}\nbutton-color.none.selected {\n  color: #f2f1ec;\n  fill: #f2f1ec;\n  background: none;\n  border: none;\n}\nbutton-color.none[disabled=true] {\n  pointer-events: none;\n  color: #b2b2b2;\n  fill: #b2b2b2;\n  background: none;\n  border: none;\n}\nbutton-color.white {\n  color: #555555;\n  fill: #555;\n  background: #fff;\n  border: 1px solid #fff;\n}\nbutton-color.white.selected {\n  color: #ffffff;\n  fill: #555;\n  background: #555;\n  border: 1px solid #fff;\n}\nbutton-color.white[disabled=true] {\n  pointer-events: none;\n  color: #b2b2b2;\n  fill: #555;\n  cursor: default;\n}\n/*button-color.blue svg, button-color.red svg, button-color.green svg, button-color.grey svg {\n  fill : #fff !important;\n}*/\nbutton-color.blue {\n  color: #fff;\n  background: #4887cc;\n  border: 1px solid #4887cc;\n}\nbutton-color.blue.selected {\n  color: #4887cc;\n  fill: #4887cc;\n  background: #fff;\n  border: 1px solid #4887cc;\n}\nbutton-color.blue[disabled=true] {\n  pointer-events: none;\n  color: #4887cc;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.blue ic-on svg {\n  fill: white;\n}\nbutton-color.blue[disabled=true] ic-on svg {\n  fill: #4887cc !important;\n}\nbutton-color.grey {\n  color: #fff;\n  background: #555;\n  border: 1px solid #555;\n}\nbutton-color.grey.selected {\n  color: #555;\n  fill: #555;\n  background: #fff;\n  border: 1px solid #555;\n}\nbutton-color.grey[disabled=true] {\n  pointer-events: none;\n  color: #555;\n  fill: #555;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.grey ic-on svg {\n  fill: white;\n}\nbutton-color.grey[disabled=true] ic-on svg {\n  fill: #555 !important;\n}\nbutton-color.red {\n  color: #fff;\n  background: #D14836;\n  border: 1px solid #D14836;\n}\nbutton-color.red.selected {\n  color: #D14836;\n  fill: #D14836;\n  background: #fff;\n  border: 1px solid #D14836;\n}\nbutton-color.red[disabled=true] {\n  pointer-events: none;\n  color: #D14836;\n  fill: #D14836;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.red ic-on svg {\n  fill: white;\n}\nbutton-color.red[disabled=true] ic-on svg {\n  fill: #D14836 !important;\n}\nbutton-color.green {\n  color: #fff;\n  background: #60b044;\n  border: 1px solid #60b044;\n}\nbutton-color.green.selected {\n  color: #60b044;\n  fill: #60b044;\n  background: #fff;\n  border: 1px solid #60b044;\n}\nbutton-color.green[disabled=true] {\n  pointer-events: none;\n  color: #60b044;\n  fill: #60b044;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.green ic-on svg {\n  fill: white;\n}\nbutton-color.green[disabled=true] ic-on svg {\n  fill: #60b044 !important;\n}\n/*Matrix colors*/\n/*green*/\nbutton-color.green-matrix {\n  /*color:#fff;*/\n  background: #9ee273;\n  border: 1px solid #9ee273;\n}\nbutton-color.green-matrix.selected {\n  color: #9ee273;\n  fill: #9ee273;\n  background: #fff;\n  border: 1px solid #9ee273;\n}\nbutton-color.green-matrix[disabled=true] {\n  pointer-events: none;\n  color: #9ee273;\n  fill: #9ee273;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.green-matrix ic-on svg {\n  fill: white;\n}\nbutton-color.green-matrix[disabled=true] ic-on svg {\n  fill: #9ee273 !important;\n}\n/*dark-red*/\nbutton-color.dark-red-matrix {\n  /*color:#fff;*/\n  background: #f08a88;\n  border: 1px solid #f08a88;\n}\nbutton-color.dark-red-matrix.selected {\n  color: #f08a88;\n  fill: #f08a88;\n  background: #fff;\n  border: 1px solid #f08a88;\n}\nbutton-color.dark-red-matrix[disabled=true] {\n  pointer-events: none;\n  color: #f08a88;\n  fill: #f08a88;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.dark-red-matrix ic-on svg {\n  fill: white;\n}\nbutton-color.dark-red-matrix[disabled=true] ic-on svg {\n  fill: #f08a88 !important;\n}\n/*red*/\nbutton-color.red-matrix {\n  /*color:#fff;*/\n  background: #f0a47f;\n  border: 1px solid #f0a47f;\n}\nbutton-color.red-matrix.selected {\n  color: #f0a47f;\n  fill: #f0a47f;\n  background: #fff;\n  border: 1px solid #f0a47f;\n}\nbutton-color.red-matrix[disabled=true] {\n  pointer-events: none;\n  color: #f0a47f;\n  fill: #f0a47f;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.red-matrix ic-on svg {\n  fill: white;\n}\nbutton-color.red-matrix[disabled=true] ic-on svg {\n  fill: #f0a47f !important;\n}\n/*orange*/\nbutton-color.orange-matrix {\n  /*color:#fff;*/\n  background: #ebc88c;\n  border: 1px solid #ebc88c;\n}\nbutton-color.orange-matrix.selected {\n  color: #ebc88c;\n  fill: #ebc88c;\n  background: #fff;\n  border: 1px solid #ebc88c;\n}\nbutton-color.orange-matrix[disabled=true] {\n  pointer-events: none;\n  color: #ebc88c;\n  fill: #ebc88c;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.orange-matrix ic-on svg {\n  fill: white;\n}\nbutton-color.orange-matrix[disabled=true] ic-on svg {\n  fill: #ebc88c !important;\n}\n/*yellow*/\nbutton-color.yellow-matrix {\n  /*color:#fff;*/\n  background: #e5e67f;\n  border: 1px solid #e5e67f;\n}\nbutton-color.yellow-matrix.selected {\n  color: #e5e67f;\n  fill: #e5e67f;\n  background: #fff;\n  border: 1px solid #e5e67f;\n}\nbutton-color.yellow-matrix[disabled=true] {\n  pointer-events: none;\n  color: #e5e67f;\n  fill: #e5e67f;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\nbutton-color.yellow-matrix ic-on svg {\n  fill: white;\n}\nbutton-color.yellow-matrix[disabled=true] ic-on svg {\n  fill: #e5e67f !important;\n}\n/*grey*/\nbutton-color.grey-matrix {\n  /*color:#fff;*/\n  background: #b9b9b9;\n  border: 1px solid #b9b9b9;\n}\nbutton-color.grey-matrix.selected {\n  color: #b9b9b9;\n  fill: #b9b9b9;\n  background: #fff;\n  border: 1px solid #b9b9b9;\n}\nbutton-color.grey-matrix[disabled=true] {\n  pointer-events: none;\n  color: #b9b9b9;\n  fill: #b9b9b9;\n  cursor: default;\n  background-color: #f5f5f5 !important;\n}\n/*button-color.grey-matrix ic-on svg {\n  fill : white;\n}*/\nbutton-color.grey-matrix[disabled=true] ic-on svg {\n  fill: #e5e67f !important;\n}\nbutton-color.inline {\n  font-size: inherit;\n  padding: 0;\n  margin: 0;\n  white-space: normal;\n  border: none;\n}\nbutton-color.wide {\n  width: calc( 100% - 1rem );\n  text-align: center;\n}\nbutton-color.left {\n  text-align: left;\n}\nbutton-color.pull-right {\n  float: right;\n}\nbutton-color.marked {\n  color: #4887cc;\n  fill: #4887cc;\n}\nbutton-color.link {\n  padding: 0;\n  text-decoration: none;\n  border: none;\n  margin: 0;\n}\nbutton-color.iconless svg {\n  fill: #bbb;\n}\nbutton-color.iconless:hover svg {\n  fill: #4887cc;\n}\nbutton-color.link.selected {\n  color: #4887cc;\n  fill: #4887cc;\n  background: none;\n}\nbutton-color.link:hover {\n  color: #4887cc;\n  fill: #4887cc;\n}\nbutton-color.link:hover span {\n  /* text-decoration: underline; */\n}\nbutton-color[hidden=true],\nbutton-color.hidden {\n  cursor: default;\n  display: none !important;\n}\nbutton-color:hover {\n  opacity: 1;\n}\n"; (require("browserify-css").createStyle(css, { "href": "../node_modules/component-button-color/src/style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('isomorphic-fetch');

var _domify = require('domify');

var _domify2 = _interopRequireDefault(_domify);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IcOn = function (_HTMLElement) {
  _inherits(IcOn, _HTMLElement);

  function IcOn() {
    _classCallCheck(this, IcOn);

    return _possibleConstructorReturn(this, (IcOn.__proto__ || Object.getPrototypeOf(IcOn)).call(this));
  }

  _createClass(IcOn, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.render("art");
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name) {
      if ("art" == name) this.render(name);
    }
  }, {
    key: 'render',
    value: function render(key) {
      var _this2 = this;

      if ("art" == key) {
        var folder = this.getAttribute('folder') || "svg";
        var svg = this.getAttribute("art");
        if (svg !== null) {
          var path = '//static.epha.ch/svg/' + svg + '.svg';
          fetch(path).then(function (res) {
            if (res.status == 403) {
              _this2.innerHTML = "<svg height='100%' width='1792' height='1792' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'><path d='M1664 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z'/></svg>";
              return;
            }
            return res.text();
          }).then(function (text) {
            var item = (0, _domify2.default)(text);
            if (!item.tagName) item = item.querySelector("svg");
            var view = item.getAttribute("viewBox") || "0 0 100 100";
            var ns = 'http://www.w3.org/2000/svg';
            _this2.innerHTML = '<svg height="100%" viewBox="' + view + '" xmlns="' + ns + '">' + item.innerHTML + '</svg>';
          }).catch(function (e) {
            console.log(e);
          });
        }
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.parentNode.removeChild(this);
    }
  }, {
    key: 'art',
    set: function set(value) {
      this.setAttribute("art", value);
    },
    get: function get() {
      this.getAttribute("art");
    }
  }]);

  return IcOn;
}(HTMLElement);

try {
  customElements.define('ic-on', IcOn);
} catch (e) {
  console.log('already exists: ');
}
exports.default = IcOn;

},{"./style.css":5,"domify":9,"isomorphic-fetch":12}],5:[function(require,module,exports){
var css = "ic-on {\n  box-sizing: border-box;\n  display: inline-flex;\n  height: 100%;\n}\nic-on svg {\n  overflow: hidden;\n  text-align: center;\n  vertical-align: middle;\n  fill: #666666;\n}\nic-on.blue svg {\n  fill: #ffffff;\n  background: #28bbee;\n  border: 0px solid #28bbee;\n}\nic-on.grey svg {\n  fill: #9fa0a4;\n  background: #B9B9B9;\n}\n/*normales standard icon innerhalb der matrix*/\nic-on.icon {\n  height: 60px;\n  width: 60px;\n}\nic-on.icon svg {\n  border-radius: 6px;\n}\nic-on.green svg {\n  fill: #1D6622;\n  background: #9EE273;\n}\nic-on.yellow svg {\n  fill: #1D6622;\n  background: #E5E67F;\n}\nic-on.orange svg {\n  fill: #9E6716;\n  background: #EBC88C;\n}\nic-on.red svg {\n  fill: #9E4F2B;\n  background: #F0A47F;\n}\nic-on.dark-red svg {\n  fill: #9E4F2B;\n  background: #F08A88;\n}\n"; (require("browserify-css").createStyle(css, { "href": "../node_modules/component-ic-on/src/style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],6:[function(require,module,exports){
(function (global){
const appendChild = require('./appendChild')
const appendProps = require('./appendProps')
const hyperx = require('hyperx')

function createElement(tag, props, children) {
  var el
  
  // Creation Phase
  // Will call constructor
  el = document.createElement(tag)
  
  appendProps(el,props)

  appendChild(el, children)

  // Enforce render
  // Otherwise it will only happen in DOM with 
  // connnectedCallback, but we need to diff
  if( el.render ) el.render();
  
  return el
}

global.builder = module.exports = hyperx(createElement)
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./appendChild":7,"./appendProps":8,"hyperx":11}],7:[function(require,module,exports){
module.exports = function(el, childs) {
  if (!Array.isArray(childs)) return
  
  for (var i = 0; i < childs.length; i++) {
    var node = childs[i]
    if (Array.isArray(node)) {
      appendChild(el, node)
      continue
    }

    if (typeof node === 'number' ||
      typeof node === 'boolean' ||
      node instanceof Date ||
      node instanceof RegExp) {
      node = node.toString()
    }

    if (typeof node === 'string') {
      if (el.lastChild && el.lastChild.nodeName === '#text') {
        el.lastChild.nodeValue += node
        continue
      }
      node = document.createTextNode(node)
    }

    if (node && node.nodeType) {
      el.appendChild(node)
    }
  }
}
},{}],8:[function(require,module,exports){
module.exports = function(el,props) {
  
  // Create the properties
  for (var p in props) {
    
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }

      // Callbacks
      if("on" == p.substr(0,2)) {
        el[p] = val 
      }    
      // Data Provider
      else if("data" == key) {
        el[p] = val 
      }
      // All others
      else {
        el.setAttribute(p,val);  
      }
    }
    
  }
  
} 
},{}],9:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],10:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],11:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12
var COMMENT = 13

module.exports = function (h, opts) {
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }
  if (opts.attrToProp !== false) {
    h = attrToProp(h)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state) && state !== COMMENT) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === COMMENT && /-$/.test(reg) && c === '-') {
          if (opts.comments) {
            res.push([ATTR_VALUE,reg.substr(0, reg.length - 1)],[CLOSE])
          }
          reg = ''
          state = TEXT
        } else if (state === OPEN && /^!--$/.test(reg)) {
          if (opts.comments) {
            res.push([OPEN, reg],[ATTR_KEY,'comment'],[ATTR_EQ])
          }
          reg = c
          state = COMMENT
        } else if (state === TEXT || state === COMMENT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[^\s"'=/]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr', '!--',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":10}],12:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":13}],13:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n        <section id=\"table-container\">\n        </section>\n    "], ["\n        <section id=\"table-container\">\n        </section>\n    "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          <section class=\"table-row\">\n          </section>\n        "], ["\n          <section class=\"table-row\">\n          </section>\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n            <button-color data=", " data-row=", " data-column=", " class=", " ontouch=", "></button-color>\n          "], ["\n            <button-color data=", " data-row=", " data-column=", " class=", " ontouch=", "></button-color>\n          "]);

require("./style.css");

require("component-button-color");

require("component-ic-on");

require("dom-builder");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tableMatrix = function (_HTMLElement) {
  _inherits(tableMatrix, _HTMLElement);

  function tableMatrix() {
    _classCallCheck(this, tableMatrix);

    return _possibleConstructorReturn(this, (tableMatrix.__proto__ || Object.getPrototypeOf(tableMatrix)).apply(this, arguments));
  }

  _createClass(tableMatrix, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render();
    }
  }, {
    key: "getClass",
    value: function getClass(indication) {
      indication = indication.toUpperCase();
      switch (indication) {
        case "A":
          return "green-matrix";
        case "B":
          return "yellow-matrix";
        case "C":
          return "orange-matrix";
        case "D":
          return "red-matrix";
        case "X":
          return "dark-red-matrix";
        default:
          return "grey-matrix";
      }
    }
  }, {
    key: "getContent",
    value: function getContent(indication) {
      indication = indication.toUpperCase();
      if (indication.toUpperCase() == "A" || indication.toUpperCase() == "B" || indication.toUpperCase() == "C" || indication.toUpperCase() == "D" || indication.toUpperCase() == "X") {
        return "<span>" + indication + "</span>";
      } else if (indication.toUpperCase() !== "Z") {
        var icon = void 0;
        switch (indication) {
          case "O":
            icon = "info";
            break;
          case "?":
            icon = "wait";
            break;
          case "U":
            icon = "pause";
            break;
          case "!":
            icon = "info";
            break;
        }
        return "<ic-on art=" + icon + "></ic-on>";
      } else {
        return "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.sync) return this.innerHTML;
      if (!this.sync) this.sync = true;
      var columnIndex = 0,
          rowIndex = 0,
          content = builder(_templateObject);

      new Promise(function (resolve) {
        var rowIndex = 0,
            columnIndex = 0;

        _this2.data.forEach(function (row) {
          row = builder(_templateObject2);

          _this2.data[rowIndex].forEach(function (indication) {
            var data = { "row": rowIndex, "column": columnIndex };
            var button = builder(_templateObject3, data, rowIndex, columnIndex, _this2.getClass(indication), _this2.ontouch);

            button.innerHTML = _this2.getContent(indication);
            columnIndex++;
            if (columnIndex == 9) columnIndex = 0;
            row.appendChild(button);
          });
          content.appendChild(row);
          rowIndex++;
        });
        _this2.appendChild(content);
        resolve('Success');
      }).then(function () {});
    }
  }, {
    key: "data",
    set: function set(val) {
      this.sync = false;
      this._data = val;
    },
    get: function get() {
      return this._data;
    }
  }, {
    key: "ontouch",
    set: function set(callback) {
      this._callback = callback;
    },
    get: function get() {
      return this._callback;
    }
  }]);

  return tableMatrix;
}(HTMLElement);

/*
render(){
  if( this.sync ) return this.innerHTML;
  if(!this.sync ) this.sync = true;
  console.log('render')
  let columnIndex = 0;
  let rowIndex = 0;
  let content  = `
      <section id="table-container">

        ${
          this.data.map( (item) => {
            let html;
            
            html = `
              <section class="table-row">
                ${
                  item.map((indication) => {
                    let button;
                    //console.log(this.ontouch)
                    button = `
                      <button-color data-row=${rowIndex} data-column=${columnIndex} class=${this.getClass(indication)} ontouch=${this.ontouch}>
                        ${this.getContent(indication)}
                      </button-color>
                    `
                    columnIndex++;
                    if(columnIndex == 9) columnIndex = 0;
                    //console.log(button)
                    return button;
                    
                  })
                  .join('')
                }
              </section>

            `
            rowIndex++;
            //console.log(html)
            return html;
          })
          .join('')
        }
      </section>
  `
  
  new Promise((resolve) => {
    this.innerHTML = content;
    resolve('Success');
  })
  .then(() => {

  })
}
*/

try {
  customElements.define('table-matrix', tableMatrix);
} catch (e) {
  console.log('table-matrix already exists');
}

exports.default = tableMatrix;

},{"./style.css":15,"component-button-color":2,"component-ic-on":4,"dom-builder":6}],15:[function(require,module,exports){
var css = "table-matrix {\n  display: block;\n}\ntable-matrix #table-container .table-row {\n  display: flex;\n}\ntable-matrix #table-container .table-row button-color {\n  flex-grow: 1;\n  flex-basis: 0;\n  text-align: center;\n}\ntable-matrix ic-on[art=info] svg {\n  fill: #4887cc;\n}\n"; (require("browserify-css").createStyle(css, { "href": "style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}]},{},[14]);
