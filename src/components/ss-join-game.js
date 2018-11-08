

import { html } from '@polymer/lit-element';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-list/iron-list.js';
import 'paper-input-place/paper-input-place.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
// These are the actions needed by this element.
import { game_join, game_cancel } from '../actions/join-game.js';
import data from './ss-available-games-data.js';

// We are lazy loading its reducer.
import pending_games from '../reducers/pendingGames.js';
store.addReducers({
  pending_games
});

class JoinGame extends connect(store)(PageViewElement) {
    render() {
        return html`
        <style>
          section {
              text-align: center;
              width: 600px;
              padding-top: 100px;
              margin: auto;
          }
          paper-item {
              width: 400px;
              margin: auto;
          }
          .headers {
              margin: auto;
          }
          span {
              width: 150px;
              font-weight: bold;
          }
          iron-list {
              --iron-list-items-container: {
                  margin: auto;
              };
              text-align: center;
              width: 450px;
              margin: auto;
              height: 30vh; /* don't use % values unless the parent element is sized. */
          }
          paper-button {
              font-size: 12px;
          }
          .details {
              width: 600px;
              margin: auto;
          }
          .game_header {
              width: 450px;
              margin: auto;
          }
          .join_game_button {
              font-size: 15px;
          }
        </style>

        <section style = "text-align:center">
            <paper-item><div class="headers">Pick an available game:</div></paper-item>
            <vaadin-combo-box label="Available games" item-label-path="location" item-value-path="time" id="available_games" items="${JSON.stringify(this.available_games)}">
                <template>
                    ([[index]]) <b>[[item.location]], <sub>[[item.date]], [[item.time]], [[item.filled_spots]]/[[item.total_players]]</sub></b>
                </template>
            </vaadin-combo-box>
            <paper-button raised @click="${this._viewDetails}">View Details</paper-button>
            <paper-item><span>Game: ${this.game.location}</span><span>Date: ${this.game.date}</span><span>Time: ${this.game.time}</span><span>Spots Filled: ${this.game.filled_spots}/${this.game.total_players}</span></paper-item>
            <div class="details">
                <paper-item>Roster: </paper-item>
                <iron-list class="roster" items="${JSON.stringify(this.game.roster)}" as="player">
                    <template>
                        <paper-item class="game_header"><span>Name: [[player.name]]</span><span>Position: [[player.position]]</span><span>Skill: [[player.skill]]</span></paper-item>
                    </template>
                </iron-list>
            </div>
            <br><br>
            <paper-button class="join_game_button" raised @click="${this._joinGame}">Join Game</paper-button>
            <paper-toast id="joined" text="Game Joined"></paper-toast>
        </section>
        `;
    }

    _viewDetails(e) {
        var selected_game = this.shadowRoot.querySelector("#available_games").selectedItem;
        if (typeof selected_game !== 'undefined') {
            this.game = JSON.parse(JSON.stringify(selected_game));
        }
    }

    static get properties() { return {
        // This is the data from the store.
        available_games: { type: Array },
        game: { type: Object},
        profile: { type: Object }
    }}

    constructor() {
      super();
      this.available_games = data;
      this.game = {
          location: "",
          date: "",
          time: "",
          total_players: "",
          filled_spots: "",
          roster: []
      };
      this.profile = {
          name: "You",
          position: "GK",
          skill: "Intermediate"
      };
    }

    _joinGame() {
        var selected_game = this.shadowRoot.querySelector("#available_games").selectedItem;
        if (typeof selected_game !== 'undefined' && this.game.location !== "" && this.profile.name !== "") {
            var temp_joined = this.shadowRoot.querySelector("#joined");
            var filled_spots = parseInt(this.game.filled_spots, 10);
            var filled_spots = filled_spots+1;
            var roster = JSON.parse(JSON.stringify(this.game.roster));
            roster.push(JSON.parse(JSON.stringify(this.profile)));
            temp_joined.show();
            store.dispatch(game_join(this.game.location, this.game.date, this.game.time, this.game.total_players, filled_spots, roster));
        }
    }

    stateChanged(state) {
        if (typeof state.profile !== 'undefined') {
            this.profile = JSON.parse(JSON.stringify(state.profile));
        }
    }
}

window.customElements.define('ss-join-game', JoinGame);
