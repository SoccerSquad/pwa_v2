

import { html } from '@polymer/lit-element';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import 'paper-input-place/paper-input-place.js';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-time-picker';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
// These are the actions needed by this element.
import { game_submit, game_reset } from '../actions/create-game.js';

// We are lazy loading its reducer.
import pending_games from '../reducers/pendingGames.js';
store.addReducers({
  pending_games
});


class CreateGame extends connect(store)(PageViewElement) {
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
      vaadin-time-picker {
          width: 150px;
          margin: auto;
      }
      paper-input + p {
          margin-top: 30px;
      }
      paper-input-place + p {
          margin-top: 30px;
      }
      vaadin-date-picker + p {
          margin-top: 30px;
      }
      vaadin-time-picker + p {
          margin: auto;
          margin-top: 30px;
      }
      paper-dropdown-menu + p {
          margin-top: 30px;
      }
      iron-form {
          text-align: center;
          width: 600px;
          margin: auto;
      }
      form {
          text-align: center;
          width: 600px;
          margin: auto;
      }
      paper-item {
          text-align: center;
          width: 400px;
          margin: auto;
      }
      .headers {
          margin: auto;
      }
    </style>

    <section style = "text-align:center">

        <iron-form id="form1" allowRedirect="true">
            <form action="/createGame" method="get">
                <paper-item><div class="headers">Pick one of the available fields:</div></paper-item>
                <paper-input-place id="location" api-key="AIzaSyAzpe2bMiDOVEUjAyS29f9JyZlM5Y2K6rY" value=""
                label="Pick a place" hide-error></paper-input-place>
                <p></p>
                <paper-item><div class="headers">Pick one of the available dates:</div></paper-item>
                <vaadin-date-picker id="date" label="Game Day" value="${this.today}"></vaadin-date-picker>
                <p></p>
                <paper-item><div class="headers">Pick one of the available time slots:</div></paper-item>
                <vaadin-time-picker id="time" label="Time" value="00:00"></vaadin-time-picker>
                <p></p>
                <paper-dropdown-menu label="Players" id="players" required>
                  <paper-listbox class="dropdown-content" slot="dropdown-content">
                    <paper-item value="0">0</paper-item>
                    <paper-item value="2">2</paper-item>
                    <paper-item value="4">4</paper-item>
                    <paper-item value="6">6</paper-item>
                    <paper-item value="8">8</paper-item>
                    <paper-item value="10">10</paper-item>
                    <paper-item value="12">12</paper-item>
                    <paper-item value="14">14</paper-item>
                    <paper-item value="16">16</paper-item>
                    <paper-item value="18">18</paper-item>
                    <paper-item value="20">20</paper-item>
                    <paper-item value="22">22</paper-item>
                  </paper-listbox>
                </paper-dropdown-menu>
                <p></p>
                <paper-button raised @click="${this._submit}">Create Game</paper-button>
                <br><br>
                <paper-button raised><a href="/pendingGames">Pending Games</a></paper-button>
            </form>
        </iron-form>
        <br><br>
        <paper-toast id="saved" text="Game Created"></paper-toast>
        <paper-toast id="invalid" text="Ensure that the Create Game form has been completely filled"></paper-toast>
    </section>
    `;
    }

    constructor () {
        super();
        var d = new Date();
        this.today = (d.getYear()+1900).toString() + '-' + d.getMonth().toString() + '-' + d.getDate().toString();
    }

    static get properties() { return {
        // This is the data from the store.
        _pendingGames: { type: Array },
        _roster: { type: Object }
    }}

    _submit() {
        var temp_loc = this.shadowRoot.querySelector("#location");
        var temp_date = this.shadowRoot.querySelector("#date");
        var temp_time = this.shadowRoot.querySelector("#time");
        var temp_players = this.shadowRoot.querySelector("#players");
        var temp_saved = this.shadowRoot.querySelector("#saved");
        if (typeof temp_loc.value !== 'undefined' && temp_loc.value.search !== '' && typeof temp_date.value !== 'undefined' && typeof temp_time.value !== 'undefined' && typeof temp_players.value !== 'undefined') {
            var total_players = parseInt(temp_players.value, 10);
            var filled_spots = 1;
            var roster = [JSON.parse(JSON.stringify(this._roster))];
            temp_saved.show();
            store.dispatch(game_submit(temp_loc.value.search, temp_date.value, temp_time.value, total_players.toString(), filled_spots.toString(), roster));
        } else {
            var temp_invalid = this.shadowRoot.querySelector("#invalid");
            temp_invalid.show();
        }
    }

    // This is called every time something is updated in the store.
    stateChanged(state) {
        this._pendingGames = state.pending_games.pending_games;
        this._roster = JSON.parse(JSON.stringify(state.profile));
    }
}

window.customElements.define('ss-create-game', CreateGame);
