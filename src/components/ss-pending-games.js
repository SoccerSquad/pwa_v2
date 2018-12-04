

import { html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-list/iron-list.js';
import './simple-expand-collapse.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-material/paper-material.js';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';

class PendingGames extends connect(store)(PageViewElement) {
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
                margin: auto;
            }
            .vertical-section-container {
                width: 100%;
                margin: auto;
            }
            paper-item + p {
                margin-top: 3px;
            }
            simple-expand-collapse {
                margin: auto;
                text-align: center;
            }
            .all_games {
                --iron-list-items-container: {
                    margin: auto;
                };
                text-align: center;
                width: 600px;
                margin: auto;
                height: 150vh; /* don't use % values unless the parent element is sized. */
            }
            .roster {
                20vh;
            }
            .player {
                width: 200px;
            }
            span {
                width: 150px;
                font-weight: bold;
            }
            paper-card {
                width: 100%;
                margin: auto;
            }
            a {
                padding-left: 3em;
                padding-right: 3em;
            }
        </style>
        <section style = "text-align:center">
            <iron-list class="all_games" items="${JSON.stringify(this._pendingGames)}" as="game">
                <template>
                    <div class="vertical-section-container">
                        <paper-card>
                            <paper-item><span>Game [[index]]: [[game.location]]</span><span>Date: [[game.date]]</span><span>Time: [[game.time]]</span><span>Spots Filled: [[game.filled_spots]]/[[game.total_players]]</span></paper-item>
                            <div class="details">
                                <paper-item>Roster: </paper-item>
                                <iron-list class="roster" items="[[game.roster]]" as="player">
                                    <template>
                                        <paper-item><span class="player">[[player.name]]</span><span class="player">[[player.position]]</span><span class="player">Skill: [[player.skill]]</span></paper-item>
                                    </template>
                                </iron-list>
                            </div>
                        </paper-card>
                    </div>
                </template>
            </iron-list>
            <p></p>
            <paper-button raised><a href="/createGame">Create Game</a></paper-button>
            <p></p>
            <paper-button raised><a href="/joinGame">Join Game</a></paper-button>
            <p></p>
        </section>
        `;
    }

    constructor() {
        super();
        this._pendingGames = "";
    }

    static get properties() { return {
        _pendingGames: { type: Array },
    }}

    stateChanged(state) {
        if (typeof state.pending_games !== 'undefined') {
            this._pendingGames = state.pending_games.pending_games;
        }
    }
}

window.customElements.define('ss-pending-games', PendingGames);
