

export const FORM_SUBMIT = 'FORM_SUBMIT';
export const FORM_RESET = 'FORM_RESET'

export const submit = (location, date, time, players) => {
  return {
    type: FORM_SUBMIT,
    location,
    date,
    time,
    players
  };
};

export const reset = () => {
  return {
    type: FORM_RESET
  };
};
