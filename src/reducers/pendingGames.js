

import { FORM_GAME_SUBMIT, FORM_GAME_RESET } from '../actions/create-game.js';
import { JOIN_GAME, CANCEL_GAME } from '../actions/join-game.js';

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
                  filled_spots: action.filled_spots,
                  roster: action.roster
              }
          ]
      };
    case JOIN_GAME:
        return {
            pending_games: [
                ...state.pending_games,
                {
                    location: action.location,
                    date: action.date,
                    time: action.time,
                    total_players: action.total_players,
                    filled_spots: action.filled_spots,
                    roster: action.roster
                }
            ]
        };
    default:
      return state;
  }
};

export default addGame;
