

import { FORM_GAME_SUBMIT, FORM_GAME_RESET } from '../actions/create-game.js';

const INITIAL_STATE = {
  pending_games: new Array(),
};

const addGame = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_GAME_SUBMIT:
      return {
          pending_games: [
              ...state.pending_games,
              {
                  location: action.location,
                  date: action.date,
                  time: action.time,
                  total_players: action.total_players,
                  remaining_slots: action.remaining_slots,
                  roster: action.roster
              }
          ]
      };
    default:
      return state;
  }
};

export default addGame;
