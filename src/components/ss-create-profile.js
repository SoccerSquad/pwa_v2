

import { html } from '@polymer/lit-element';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
// These are the actions needed by this element.
import { submit, reset } from '../actions/profile-submit.js';

// We are lazy loading its reducer.
import profile from '../reducers/profile.js';
store.addReducers({
  profile
});

class CreateProfile extends connect(store)(PageViewElement) {

    render() {
    return html`
    <style>
      section {
          text-align: center;
          padding-top: 100px;
      }
      paper-input {
          margin: auto;
          width: 250px;
      }
      paper-input + p {
          margin-top: 30px;
      }
      paper-dropdown-menu + p {
          margin-top: 30px;
      }
    </style>

    <section style = "text-align:center">

        <iron-form id="form1" allowRedirect="true">
            <form action="/profile" method="get">
                <paper-input type="text" id="name" required label="Name" value="Player1"></paper-input>
                <p></p>
                <paper-dropdown-menu label="Position" id="position" required>
                  <paper-listbox class="dropdown-content" slot="dropdown-content">
                    <paper-item value="GK">GK (Goalkeeper)</paper-item>
                    <paper-item value="SW">SW (Sweeper)</paper-item>
                    <paper-item value="LB">LB (Left Back)</paper-item>
                    <paper-item value="CB">CB (Center Back)</paper-item>
                    <paper-item value="RB">RB (Right Back)</paper-item>
                    <paper-item value="LWB">LWB (Left Wing Back)</paper-item>
                    <paper-item value="DM">DM (Defensive Midfielder)</paper-item>
                    <paper-item value="RWB">RWB (Right Wing Back)</paper-item>
                    <paper-item value="LM">LM (Left Midfielder)</paper-item>
                    <paper-item value="CM">CM (Center Midfielder)</paper-item>
                    <paper-item value="RM">RM (Right Midfielder)</paper-item>
                    <paper-item value="AM">AM (Attacking Midfielder)</paper-item>
                    <paper-item value="LW">LW (Left Winger)</paper-item>
                    <paper-item value="SS">SS (Striker)</paper-item>
                    <paper-item value="RW">RW (Right Winger)</paper-item>
                    <paper-item value="CF">CF (Center Forward)</paper-item>
                  </paper-listbox>
                </paper-dropdown-menu>
                <p></p>
                <paper-dropdown-menu label="Skill Level" id="skill" required>
                  <paper-listbox class="dropdown-content" slot="dropdown-content">
                    <paper-item value="Beginner">Beginner</paper-item>
                    <paper-item value="Intermediate">Intermediate</paper-item>
                    <paper-item value="Professional">Professional</paper-item>
                  </paper-listbox>
                </paper-dropdown-menu>
                <br><br>
                <paper-button raised @click="${this._submit}">Submit</paper-button>
                <paper-button raised @click="${this._reset}">Reset</paper-button>
            </form>
        </iron-form>
        <br><br>
        <paper-toast id="saved" text="Profile Saved"></paper-toast>
        <paper-toast id="reset" text="Profile Reset"></paper-toast>
    </section>
    `;
    }

    static get properties() { return {
        // This is the data from the store.
        _name: { type: String },
        _position: { type: String },
        _skill: {type: String},
        _saved: {type: Boolean},
    }}

    _submit() {
        var temp_name = this.shadowRoot.querySelector("#name");
        var temp_pos = this.shadowRoot.querySelector("#position");
        var temp_skill = this.shadowRoot.querySelector("#skill");
        var temp_saved = this.shadowRoot.querySelector("#saved");
        temp_saved.show();
        console.log(temp_name.value + ' ' + temp_pos.value +' '+ temp_skill.value);
        store.dispatch(submit(temp_name.value, temp_pos.value, temp_skill.value, true));
    }

    _reset() {
        var temp_name = this.shadowRoot.querySelector("#name");
        var temp_pos = this.shadowRoot.querySelector("#position");
        var temp_skill = this.shadowRoot.querySelector("#skill");
        temp_name.value = 'Player1';
        temp_pos.value = 'GK';
        temp_skill.value = 'Intermediate';
        var temp_reset = this.shadowRoot.querySelector("#reset");
        temp_reset.show();
        store.dispatch(reset());
    }

    // This is called every time something is updated in the store.
    stateChanged(state) {
        this._name = state.profile.name;
        this._position = state.profile.position;
        this._skill = state.profile.skill;
        this._saved = state.profile.boolean;
    }
}

window.customElements.define('ss-create-profile', CreateProfile);
