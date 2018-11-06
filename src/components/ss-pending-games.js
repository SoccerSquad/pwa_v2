

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
            .details {
                position: absolute;
                z-index: -1;
            }
            paper-item + p {
                margin-top: 3px;
            }
            simple-expand-collapse {
                margin: auto;
                text-align: center;
            }
            iron-list {
                --iron-list-items-container: {
                    margin: auto;
                };
                text-align: center;
                width: 600px;
                margin: auto;
                height: 50vh; /* don't use % values unless the parent element is sized. */
            }
            span {
                width: 200px;
                font-weight: bold;
            }
            paper-card {
                width: 100%;
                margin: auto;
            }
        </style>
        <section style = "text-align:center">
            <iron-list id="all_games" items="${JSON.stringify(this._pendingGames)}" as="game">
                <template>
                    <div class="vertical-section-container">
                        <paper-card>
                            <paper-item><span>Game: [[game.location]]</span><span>Date: [[game.date]]</span><span>Time: [[game.time]]</span></paper-item>
                            <simple-expand-collapse>
                                <div class="details">
                                    <paper-item>Roster: </paper-item>
                                    <iron-list items="[[game.roster]]" as="player">
                                        <template>
                                            <paper-item><span>Name: [[player.name]]</span><span>Position: [[player.position]]</span><span>Skill: [[player.skill]]</span></paper-item>
                                        </template>
                                    </iron-list>
                                </div>
                            </simple-expand-collapse>
                        </paper-card>
                    </div>
                </template>
            </iron-list>
        </section>
        `;
    }

    static get properties() { return {
        _pendingGames: { type: Array },
    }}

    stateChanged(state) {
      this._pendingGames = state.pending_games.pending_games;
    }
}

window.customElements.define('ss-pending-games', PendingGames);
