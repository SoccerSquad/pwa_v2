
import { LitElement, html } from '@polymer/lit-element';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';
import '@polymer/paper-item/paper-item.js';

import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';


class ViewProfileElement extends connect(store)(PageViewElement) {

  render() {
    return html`
      <style>
          section {
              text-align: center;
              padding-top: 100px;
          }
          span {
              width: 150px;
              font-weight: bold;
          }
          paper-item {
              margin: auto;
              width: 300px;
          }
          paper-item + p {
              margin-top: 30px;
          }
          paper-button {
              margin: auto;
              width: 300px;
          }
      </style>
      <section>
          <paper-item><span>Name: </span><span>${this._name}</span></paper-item>
          <paper-item><span>Position: </span><span>${this._position}</span></paper-item>
          <paper-item><span>Skill Level: </span><span>${this._skill}</span></paper-item>
          <p></p>
          <paper-button raised><a href="/editProfile">Edit Profile</a></paper-button>
          <p></p>
      </section>
    `;
  }

  static get properties() { return {
    _name: { type: String },
    _position: { type: String },
    _skill: {type: String}
  }};

  constructor() {
    super();
    this._name = 'Player1';
    this._position = 'GK (Goalkeeper)';
    this._skill = 'Intermediate'
  }

  stateChanged(state) {
      this._name = state.profile.name;
      this._position = state.profile.position;
      this._skill = state.profile.skill;
  }
}

window.customElements.define('ss-element-view-profile', ViewProfileElement);
