import axios from 'axios';

import { CONTACT_SUCCESS, CONTACT_FAIL } from './types';

const API_URL = 'http://localhost:8080';

// Contact Form Action
export const contact = (user, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/contact`,
      user
    )
    dispatch({ type: CONTACT_SUCCESS, success: response.data});
    localStorage.setObject('success', response.data);
    callback();
  } catch (e) {
    dispatch({ type: CONTACT_FAIL, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Newsletter Form Action
export const subscribe = (email, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/subscribe`,
      email
    )
    dispatch({ type: CONTACT_SUCCESS, success: response.data});
    localStorage.setObject('success', response.data);
    callback();
  } catch (e) {
    dispatch({ type: CONTACT_FAIL, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Clear Server Errors Action 
export const clearContactErrors = (name, errors) => {
  localStorage.removeItem('errors');
  return {
    type: CONTACT_FAIL,
    errors: {...errors, [name]: ''}
  };
};

// Helpers 
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}