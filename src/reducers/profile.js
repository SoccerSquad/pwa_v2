

import { FORM_SUBMIT, FORM_RESET } from '../actions/profile-submit.js';

const INITIAL_STATE = {
  name: 'Player1',
  position: 'GK',
  skill: 'Intermediate',
  saved: 'false'
};

const updateProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_SUBMIT:
      return {
        name: action.name,
        position: action.position,
        skill: action.skill,
        saved: action.saved,
      };
    case FORM_RESET:
      return {
          name: 'Player1',
          position: 'GK',
          skill: 'Intermediate',
          saved: 'false',
      };
    default:
      return state;
  }
};

export default updateProfile;
