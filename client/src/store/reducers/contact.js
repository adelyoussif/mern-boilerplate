import { CONTACT_SUCCESS, CONTACT_FAIL } from '../actions/types';

const initialState = {
  errors: '',
  success: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTACT_SUCCESS:
      return { ...state, success: action.success };
    case CONTACT_FAIL:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
