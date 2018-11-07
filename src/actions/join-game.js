

export const JOIN_GAME = 'JOIN_GAME';
export const CANCEL_GAME = 'CANCEL_GAME'

export const game_join = (location, date, time, total_players, filled_spots, roster) => {
  return {
    type: JOIN_GAME,
    location,
    date,
    time,
    total_players,
    filled_spots,
    roster
  };
};

export const game_cancel = () => {
  return {
    type: CANCEL_GAME
  };
};
