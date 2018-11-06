

export const FORM_GAME_SUBMIT = 'FORM_GAME_SUBMIT';
export const FORM_GAME_RESET = 'FORM_GAME_RESET'

export const game_submit = (location, date, time, total_players, remaining_slots, roster) => {
  return {
    type: FORM_GAME_SUBMIT,
    location,
    date,
    time,
    total_players,
    remaining_slots,
    roster
  };
};

export const game_reset = () => {
  return {
    type: FORM_GAME_RESET
  };
};
