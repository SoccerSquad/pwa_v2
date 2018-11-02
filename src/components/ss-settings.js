

import { html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import { PageViewElement } from './page-view-element.js';

class Settings extends PageViewElement {
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
        <p>Settings</p>
    </section>
    `;
  }
}

window.customElements.define('ss-settings', Settings);
