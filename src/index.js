import "./style.css";
import "component-button-color";
import "component-ic-on";



class tableMatrix extends HTMLElement{

  set data(val){
    this.sync = false;
    this._data = val;
  }

  get data(){
    return this._data;
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

                      button = `
                        <button-color class=${this.getClass(indication)}>
                          ${this.getContent(indication)}
                        </button-color>
                      `
                      columnIndex++;
                      return button;
                      
                    })
                    .join('')
                  }
                </section>

              `
              rowIndex++;
              return html;
            })
            .join('')
          }
        </ssection>
    `
    
    new Promise((resolve) => {
      this.innerHTML = content;
      resolve('Success');
    })
    .then(() => {

    })
  }
}

try {
  customElements.define('table-matrix', tableMatrix);
}catch(e){
  console.log('table-matrix already exists');
}

export default tableMatrix;