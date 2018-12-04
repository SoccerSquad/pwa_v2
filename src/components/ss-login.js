

import { html } from '@polymer/lit-element';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@vaadin/vaadin-text-field/vaadin-password-field.js';
import { PageViewElement } from './page-view-element.js';

import {
  navigate
} from '../actions/app.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
// These are the actions needed by this element.
import { submit, reset } from '../actions/profile-submit.js';

// We are lazy loading its reducer.
import profile from '../reducers/profile.js';
store.addReducers({
  profile
});

class Login extends connect(store)(PageViewElement) {
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
                paper-input + p {
                    margin-top: 30px;
                }
                paper-dropdown-menu + p {
                    margin-top: 30px;
                }
                paper-button + p {
                    margin-top: 70px;
                }
                a.disabled {
                    pointer-events: none;
                    cursor: default;
                }
            </style>
            <section>
                <H1>Login</H1>
                <paper-input type="text" id="username_login" required label="Username" value="User"></paper-input>
                <vaadin-password-field type="text" id="password_login" placeholder="Enter password" label="Password"></vaadin-password-field>
                <p></p>
                <paper-button id="login_check" raised @click="${this._check_profile}"><a href="/home" class="disabled" id="login">Login</a></paper-button>
                <p></p>
                <p></p>
                <H1>Create Profile Below</H1>
                <iron-form id="form1" allowRedirect="true">
                    <form action="/profile" method="get">
                        <paper-input type="text" id="username_create" required label="Username" value="Player1"></paper-input>
                        <p></p>
                        <vaadin-password-field type="text" id="password_create" placeholder="Password" label="Password"></vaadin-password-field>
                        <p></p>
                        <paper-dropdown-menu label="Position" id="position" value="GK (Goalkeeper)" required>
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
                        <paper-dropdown-menu label="Skill Level" value="Intermediate" id="skill" required>
                            <paper-listbox class="dropdown-content" slot="dropdown-content">
                                <paper-item value="Beginner">Beginner</paper-item>
                                <paper-item value="Intermediate">Intermediate</paper-item>
                                <paper-item value="Professional">Professional</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        <br><br>
                        <paper-button raised @click="${this._submit}">Create Profile</paper-button>
                        <paper-button raised @click="${this._reset}">Reset to Default</paper-button>
                    </form>
                </iron-form>
                <br><br>
                <paper-toast id="create_profile_first" text="Please create a profile first to login"></paper-toast>
                <paper-toast id="fill_all_profile_fields" text="Please fill all fields to save a profile"></paper-toast>
                <paper-toast id="incorrect_login" text="Incorrect Username or Password"></paper-toast>
                <paper-toast id="saved" text="Profile Created, you may now login"></paper-toast>
                <paper-toast id="reset" text="Profile Reset"></paper-toast>
            </section>
        `;
    }

    constructor() {
      super();
      this._saved = 'false';
      this._password = '';
    }

    static get properties() { return {
        // This is the data from the store.
        _name: { type: String },
        _position: { type: String },
        _skill: {type: String},
        _saved: {type: String},
        _password: { type: String },
    }}

    _check_profile() {
        var temp_name = this.shadowRoot.querySelector("#username_login");
        var temp_password = this.shadowRoot.querySelector("#password_login");
        if (this._saved !== 'true') {
            this.shadowRoot.querySelector("#create_profile_first").show();
        } else if (this._name !== temp_name.value || this._password !== temp_password.value) {
            this.shadowRoot.querySelector("#incorrect_login").show();
        } else {
            window.history.pushState({}, '', '/home');
            store.dispatch(navigate(decodeURIComponent(window.location.pathname)));
        }
    }

    _submit() {
        var temp_name = this.shadowRoot.querySelector("#username_create");
        var temp_password = this.shadowRoot.querySelector("#password_create");
        var temp_pos = this.shadowRoot.querySelector("#position");
        var temp_skill = this.shadowRoot.querySelector("#skill");
        var temp_saved = this.shadowRoot.querySelector("#saved");
        var saved = "true";
        if ((typeof temp_name.value !== 'undefined' && temp_name.value !== '') && (typeof temp_password.value !== 'undefined' && temp_password.value !== '') && (typeof temp_pos.value !== 'undefined' && typeof temp_skill.value !== 'undefined')) {
            temp_saved.show();
            // var temp_login = this.shadowRoot.querySelector("#login");
            // temp_login.className = "enabled";
            this._saved = 'true';
            this._password = temp_password.value;
            store.dispatch(submit(temp_name.value, temp_pos.value, temp_skill.value, saved));
        } else {
            this._saved = 'false';
            this._password = '';
            var temp_fill_all_profile_fields = this.shadowRoot.querySelector("#fill_all_profile_fields");
            // var temp_login = this.shadowRoot.querySelector("#login");
            // temp_login.className = "disabled";
            temp_fill_all_profile_fields.show();
        }
    }

    _reset() {
        this._saved = 'false';
        var temp_login = this.shadowRoot.querySelector("#login");
        temp_login.className = "disabled";
        var temp_name = this.shadowRoot.querySelector("#name");
        var temp_pos = this.shadowRoot.querySelector("#position");
        var temp_skill = this.shadowRoot.querySelector("#skill");
        temp_name.value = 'Player1';
        temp_pos.value = 'GK (Goalkeeper)';
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
        this._saved = state.profile.saved;
    }
}

window.customElements.define('ss-login', Login);
