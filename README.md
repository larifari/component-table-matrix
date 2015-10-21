#Table Matrix

## Develop
Look in [demo.js](test/integration/demo.js).
```bash
npm i browser-sync -g
npm i watchify -g
npm i
npm test
```
Open the browser, test the demo and look in the console.

## Options
```
<table-matrix width=60 height=60 expand=true></table-matrix>
```
```javascript
var matrix = document.querySelector("data-matrix");

matrix.set([
  // Rows
  [
    // Columns
    { atc:"A", text:"abc", atc1:"asdf", grad:"A", alternatives:8 }
  ]
]);

```