

import { html } from '@polymer/lit-element';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import { PageViewElement } from './page-view-element.js';

class Login extends PageViewElement {
    render() {
        return html`
            <style>
                section {
                  text-align: center;
                  padding-top: 100px;
                  width: 600px;
                  margin: auto;
                }
                paper-input {
                  margin: auto;
                  width: 250px;
                }
                paper-item {
                  text-align: center;
                  width: 400px;
                  margin: auto;
                }
            </style>
            <section>
                <paper-input type="text" id="name" required label="Username" value="User"></paper-input>
                <paper-input type="text" id="password" required label="Password" value="..."></paper-input>
                <paper-button raised><a href="/home">Login</a></paper-button>
            </section>
        `
    }
}

window.customElements.define('ss-login', Login);
