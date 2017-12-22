import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'app-chat',
  styleUrl: 'app-chat.scss'
})
export class AppChat {

  @Prop() dialogflowtoken: string;
  @State() open: boolean = false;
  
  componentDidLoad() {
    console.log("dialogflowToken "+this.dialogflowtoken);
    document.getElementById("header").addEventListener('click', function(){
      console.log("Clicked header");
      this.onHeaderClick();
    }.bind(this));
  }

  onHeaderClick(){
    let elt = document.getElementById('chat');    
    if(!this.open){
      //then close
      elt.classList.remove("slidedown");
      elt.classList.add("slideup");
    } else {
      elt.classList.remove("slideup");
      elt.classList.add("slidedown");
    }
    this.open = !this.open;
  }

  render() {
    return (
      <div class="app-container">
        <header id="header">
          <h1>Chabot</h1>
        </header>

        <main id="chat" class="slidedown">
          <stencil-router>
            <stencil-route url='/' component='app-home' 
              componentProps={{ 'dialogflowtoken': this.dialogflowtoken}} exact={true}>
            </stencil-route>
          </stencil-router>
        </main>
      </div>
    );
  }
}
