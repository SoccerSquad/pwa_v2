
import { html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

class Home extends connect(store)(PageViewElement) {
  render() {
    return html`
    <style>
      section {
          text-align: center;
          padding-top: 100px;
      }
      paper-button {
          margin: auto;
          width: 250px;
      }
      paper-button + p {
          margin-top: 30px;
      }
    </style>

      <section style = "text-align:center">
          <paper-button raised><a href="/createProfile">Create Profile</a></paper-button>
          <p></p>
          <paper-button raised><a href="/createGame">Create Game</a></paper-button>
          <p></p>
          <paper-button raised><a href="/joinGame">Join Game</a></paper-button>
          <p></p>
          <paper-button raised><a href="/pendingGames">Pending Games</a></paper-button>
          <p></p>
      </section>
    `;
  }
}

window.customElements.define('ss-home', Home);
