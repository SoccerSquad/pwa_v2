

export const FORM_SUBMIT = 'FORM_SUBMIT';
export const FORM_RESET = 'FORM_RESET'

export const submit = (name, position, skill, saved) => {
  return {
    type: FORM_SUBMIT,
    name,
    position,
    skill,
    saved
  };
};

export const reset = () => {
  return {
    type: FORM_RESET
  };
};
