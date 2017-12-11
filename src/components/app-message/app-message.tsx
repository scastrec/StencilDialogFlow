import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'app-message',
  styleUrl: 'app-message.scss'
})
export class AppMessages {

  @Prop() message: any;

  render() {
    return (
        <div>
        {this.message.input 
            ?  
            <div class="container">                                
                <div class="speech-bubble">
                    <p>{this.message.message}</p>
                </div>  
                <div class="avatar">          
                    <i class="material-icons">adb</i>
                </div>
            </div> 
            :
            <div class="container me">  
                <div class="avatar me">          
                    <i class="material-icons">person</i>
                </div>              
                <div class="speech-bubble me">
                    <p>{this.message.message}</p>
                </div> 
            </div>
        }
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
        </div>    
    );
  }
}