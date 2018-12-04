/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-list/iron-list.js';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';

class MyApp extends connect(store)(LitElement) {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>

    .main_grid {
        width: 100%;
        padding-top: 190px;
        text-align: center;
      display: grid;
      grid-template-columns: 4fr 1fr;
      grid-gap: 5px;
      grid-auto-rows: minmax(100px, auto);
    }

      :host {
        --app-drawer-width: 256px;
        display: block;

        --app-primary-color: #E91E63;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;

        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: var(--app-secondary-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: #78909C;
      }

      app-header {
        position: fixed;
        top: 0;
        right: 10%;
        width: 100%;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
      }

      .logo {
          height: 120px;
          width: 106px;
      }

      .toolbar-top {
        background-color: var(--app-header-background-color);
      }

      [main-title] {
        font-family: 'Circular';
        text-transform: uppercase;
        font-size: 40px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      .toolbar-list {
        display: none;
      }

      .toolbar-list > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }

      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }

      a.disabled {
          pointer-events: none;
          cursor: default;
          color: transparent;
          user-select: none;
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      .pending_games_sidebar {
          padding-top: 95px;
          border-left: 1px solid black;
      }

      .all_games {
          --iron-list-items-container: {
              margin: auto;
          };
          text-align: center;
          width: 100%;
          margin: auto;
          height: 70vh; /* don't use % values unless the parent element is sized. */
      }

      footer {
        padding: 24px;
        width: 100%;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      paper-item {
          text-align: left;
          margin-left: auto;
          width: 70%;
      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout. */
      @media (min-width: 400px) {
        .toolbar-list {
          display: block;
        }

        .menu-btn {
          display: none;
        }

        .main-content {
          padding-top: 10px;
          border-right: 1px solid black;
        }

        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }
    </style>

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
        <div main-title>${this.appTitle}</div>
      </app-toolbar>
      <img class="logo" src="images/SS.png" alt="Soccer Squad Logo"/>
      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a id="home_toolbar" class=${this._logged_in ? 'enabled' : 'disabled'} ?selected="${this._page === 'home'}" href="/home">Home</a>
        <a id="pending_games_toolbar" class=${this._logged_in ? 'enabled' : 'disabled'} ?selected="${this._page === 'pendingGames'}" href="/pendingGames">Pending Games</a>
        <a id="settings_toolbar" class=${this._logged_in ? 'enabled' : 'disabled'} ?selected="${this._page === 'settings'}" href="/settings">Settings</a>
      </nav>
    </app-header>

    <!-- Drawer content -->
    <app-drawer .opened="${this._drawerOpened}"
        @opened-changed="${this._drawerOpenedChanged}">
      <nav class="drawer-list">
        <a ?selected="${this._page === 'home'}" href="/home">Home</a>
        <a ?selected="${this._page === 'pendingGames'}" href="/pendingGames">Pending Games</a>
        <a ?selected="${this._page === 'settings'}" href="/settings">Settings</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <div class="main_grid">
        <main role="main" class="main-content">
            <ss-login class="page" ?active="${this._page === 'login'}"></ss-login>
            <ss-home class="page" ?active="${this._page === 'home' && this.profile_saved}"></ss-home>
            <ss-edit-profile class="page" ?active="${this._page === 'editProfile'}"></ss-edit-profile>
            <ss-element-view-profile class="page" ?active="${this._page === 'viewProfile'}"></ss-element-view-profile>
            <ss-create-game class="page" ?active="${this._page === 'createGame'}"></ss-create-game>
            <ss-pending-games class="page" ?active="${this._page === 'pendingGames'}"></ss-pending-games>
            <ss-join-game class="page" ?active="${this._page === 'joinGame'}"></ss-join-game>
            <ss-settings class="page" ?active="${this._page === 'settings' && this.profile_saved}"></ss-settings>
            <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
        </main>
        <div class="pending_games_sidebar">
            <h2>Pending Games</h2>
            <p id='pending_games_not_shown_message'>Login to view</p>
            <iron-list class="all_games" label="Pending Games" id="pending_games" items="${JSON.stringify(this._pendingGames)}">
                <template>
                    <div>
                        <p class="game">([[index]]) <b>  [[item.location]]</b></p>
                        <p class="game"><sub>[[item.date]], [[item.time]], [[item.filled_spots]]/[[item.total_players]]</sub></p>
                    </div>
                </template>
            </iron-list>
        </div>
    </div>

    <footer>
      <p>${this.appTitle + '-' + this._page}</p>
    </footer>

    <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean },
      _pendingGames: { type: Object },
      _logged_in: { type: Boolean },
    }
  }

  constructor() {
    super();
    this.profile_saved = false;
    this._pendingGames = '';
    this._logged_in = false;
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        () => store.dispatch(updateDrawerState(false)));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
        if (this._page === 'home') {
            var temp_msg = this.shadowRoot.querySelector("#pending_games_not_shown_message");
            temp_msg.innerHTML = '';
        }
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

    stateChanged(state) {
        if (typeof state.profile !== 'undefined' && typeof state.profile !== 'undefined') {
            this.profile_saved = state.profile.saved;
        }
        if (typeof state.pending_games !== 'undefined') {
            this._pendingGames = state.pending_games.pending_games;
        }
        this._page = state.app.page;
        this._logged_in = (this._page !== 'login');
        this._offline = state.app.offline;
        this._snackbarOpened = state.app.snackbarOpened;
        this._drawerOpened = state.app.drawerOpened;
    }
}

window.customElements.define('my-app', MyApp);
