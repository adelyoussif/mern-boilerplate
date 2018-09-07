import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const initialState = {
  authenticated: '',
  errors: '',
  user: '',
  success: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.token, user: action.user, success: action.success};
    case AUTH_ERROR:
      return { ...state, errors: action.errors, user: action.user };
    default:
      return state;
  }
}
