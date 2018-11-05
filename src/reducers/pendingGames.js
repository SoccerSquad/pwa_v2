

import { FORM_SUBMIT, FORM_RESET } from '../actions/create-game.js';

const INITIAL_STATE = {
  pending_games: new Array();
};

const addGame = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_SUBMIT:
      return {
          pending_games: [
              ...state,
              {
                  location: action.location,
                  date: action.date,
                  time: action.time,
                  players: action.players
              }
          ]
      };
    default:
      return state;
  }
};

export default addGame;
