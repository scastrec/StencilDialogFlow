import { Component } from '@stencil/core';


@Component({
  tag: 'app-chat',
  styleUrl: 'app-chat.scss'
})
export class AppChat {

  render() {
    return (
      <div class="app-container">
        <header>
          <h1>Chabot</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route url='/' component='app-home' exact={true}>
            </stencil-route>
          </stencil-router>
        </main>
      </div>
    );
  }
}
