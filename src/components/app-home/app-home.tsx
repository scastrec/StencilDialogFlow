import { Component, State, Prop } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() message: string;
  @State() messages: any = [];
  @State() loading : boolean;

  @Prop() url = "https://api.dialogflow.com/v1";
  @Prop() dialogflowtoken :string;
  
  
  
  componentDidLoad() {
    //load messages
    this.messages = JSON.parse(localStorage.getItem("messages")) || [];
    this.goToBottomMessages();
  }

  componentDidUpdate() {
    //ugly but if no timeout, missed a message size
    setTimeout(function(){this.goToBottomMessages();}.bind(this),200);        
  }
  
  goToBottomMessages() {
    window.scrollTo(0,document.body.scrollHeight+200);
  }

  saveMessage(msgs:string){
    localStorage.setItem("messages", JSON.stringify(msgs));
  }

  getSessionId = function(){
    let sessionId = sessionStorage.getItem("sessionId");
    if(!sessionId){
      sessionId = "" + Math.floor((1 + Math.random()) * 0x10000);
      sessionStorage.setItem("sessionId", sessionId)
    }
    return sessionId;
  }

  postMessage(e) {
    e.preventDefault();

    if(!this.message){
        //no message, do nothing
        return;
    }

    let sessionId = this.getSessionId();

    //first add message to messages
    this.addMessageToList({
      message : this.message,
      input : false,
      time: new Date()
    });

    let params = "&contexts=&lang=fr&query="+this.message+"&sessionId="+sessionId+"&timezone=Europe/Paris";
    this.loading = false;
    // do login
    fetch(this.url+"/query?v=20170712"+params, {
      method: 'get',
      headers: {
        "Authorization": "Bearer "+ this.dialogflowtoken
      }
    })
    .then(response => response.json())
    .then(function (data) {
      if(data.status.code == 200){ 
        this.addMessageToList({
          message : data.result.fulfillment.speech,
          input : true,
          time: new Date()
        });
      }
      this.loading = false;
    }.bind(this))
    .catch(function (error) {
      console.log('message sent KO', error);
      this.loading = false;
    }.bind(this));
    this.message = "";

  }

  addMessageToList(msg){
    this.messages = [...this.messages, msg];
    this.saveMessage(this.messages);
    this.goToBottomMessages();
  }

  handleMessageChange(event) {
    this.message = event.target.value;
  }


  render() {
    return (
      <div class="main">        
        <div id="list" class="list">
          {this.messages.map(m =>
            <app-message message={m}></app-message>
          )}
          {this.loading
            ? <div class="loading"/>
            : <div></div>
          }
        </div>
        <form onSubmit={(e) => this.postMessage(e)} class="footer">
          <input placeholder="Votre message" value={this.message} onInput={() => this.handleMessageChange(event)}/>
          <button type="submit">
            <i class="material-icons">send</i>
          </button>
        </form>
      </div>
    );
  }
}
