import "./style.css";
import "component-button-color";
import "component-ic-on";
import "dom-builder";

class tableMatrix extends HTMLElement{

  set data(val){
    this.sync = false;
    this._data = val;
  }

  get data(){
    return this._data;
  }

  set ontouch(callback) {
    this._callback = callback;
  }

  get ontouch(){
    return this._callback;
  }

  connectedCallback() {
    this.render();
  };

  getClass(indication){
    indication = indication.toUpperCase();
    switch (indication){
      case "A" : return "green-matrix";
      case "B" : return "yellow-matrix";
      case "C" : return "orange-matrix";
      case "D" : return "red-matrix";
      case "X" : return "dark-red-matrix";
      default : return "grey-matrix";
    }
  } 

  getContent(indication){
    indication = indication.toUpperCase();
    if(indication.toUpperCase() == "A" ||
       indication.toUpperCase() == "B" || 
       indication.toUpperCase() == "C" || 
       indication.toUpperCase() == "D" || 
       indication.toUpperCase() == "X"){ return  `<span>${indication}</span>`;
    }else if(indication.toUpperCase() !== "Z"){
      let icon;
      switch (indication){
        case "O" : icon = "info";
        break;
        case "?" : icon = "wait";
        break;
        case "U" : icon = "pause";
        break;
        case "!" : icon = "info";
        break;
      }
      return `<ic-on art=${icon}></ic-on>`
    }else{
      return "";
    }
  }

  render(){
    if( this.sync ) return this.innerHTML;
    if(!this.sync ) this.sync = true;
    let columnIndex = 0,
        rowIndex = 0,
        content  = builder`
        <section id="table-container">
        </section>
    `;
    
    new Promise((resolve) => {
      let rowIndex=0,
          columnIndex = 0;

      this.data.forEach((row) => {
        row = builder`
          <section class="table-row">
          </section>
        `

        this.data[rowIndex].forEach((indication) => {
          let data = {"row" : rowIndex, "column" : columnIndex}
          let button = builder`
            <button-color data=${data} data-row=${rowIndex} data-column=${columnIndex} class=${this.getClass(indication)} ontouch=${this.ontouch}></button-color>
          `

          button.innerHTML = this.getContent(indication)
          columnIndex++;
          if(columnIndex == 9) columnIndex = 0;
          row.appendChild(button);
        })
        content.appendChild(row);
        rowIndex++;
      })
      this.appendChild(content)
      resolve('Success');
    })
    .then(() => {

    })
  }
}

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
}catch(e){
  console.log('table-matrix already exists');
}

export default tableMatrix;