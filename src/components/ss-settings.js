

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
        <paper-button raised><a href="/editProfile">Edit Profile</a></paper-button>
        <p>FAQ</p>
        <p>How do I edit my profile?</p>
        <p>Click on the button labelled "Edit Profile" above this FAQ section.</p>
        <p>How do I change my location?</p>
        <p>Enable GPS functionality so the app can detect your location</p>
    </section>
    `;
  }
}

window.customElements.define('ss-settings', Settings);
