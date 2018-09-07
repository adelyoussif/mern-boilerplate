import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

const API_URL = 'http://localhost:8080';

// Signup Action 
export const signup = (user, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/signup`,
      user
    );
    dispatch({ type: AUTH_USER, token: '', user: response.data.user});
    localStorage.setObject('user', response.data.user);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Login Action 
export const login = (user, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      user
    );
    dispatch({ type: AUTH_USER, token: response.data.token, user: response.data.user});
    localStorage.setItem('token', response.data.token);
    localStorage.setObject('user', response.data.user);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Logout Action 
export const logout = () => (dispatch)=> {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: AUTH_USER, token: '', user: '' });
};

// Reset Password Action 
export const resetPassword = (login, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/reset`,
      login
    )
    dispatch({ type: AUTH_USER, success: response.data});
    localStorage.setObject('success', response.data);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Create New Password Action 
export const newPassword = (user, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/newpassword`,
      user
    );
    dispatch({ type: AUTH_USER, token: response.data.token, user: response.data.user});
    localStorage.setItem('token', response.data.token);
    localStorage.setObject('user', response.data.user);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Email Confirmation Token Action  -- Handle Received Token
export const confirmToken = (user, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/confirm/token`,
      user
    );
    dispatch({ type: AUTH_USER, token: response.data.token, user: response.data.user});
    localStorage.setItem('token', response.data.token);
    localStorage.setObject('user', response.data.user);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Email Confirmation Form Action  -- Handle Send Token 
export const confirmEmail = (email, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/confirm/email`,
      email
    );
    dispatch({ type: AUTH_USER, success: response.data});
    localStorage.setObject('success', response.data);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, errors: e.response.data });
    localStorage.setObject('errors', e.response.data);  
  }
};

// Clear Server Errors Action 
export const clearAuthErrors = (name, errors) => {
  localStorage.removeItem('errors');
  return {
    type: AUTH_ERROR,
    errors: {...errors, [name]: ''}
  };
};
 
// Helpers 
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

// import axios from 'axios';

// import { AUTH_USER, AUTH_ERROR } from './types';

// const API_URL = 'http://localhost:8080';

// // Signup Action 
// export const signup = (user, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/signup`,
//       user
//     );
//     dispatch({ type: AUTH_USER, token: '', user: response.data.user});
//     localStorage.setObject('user', response.data.user);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Login Action 
// export const login = (user, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/login`,
//       user
//     );
//     dispatch({ type: AUTH_USER, token: response.data.token, user: response.data.user});
//     localStorage.setItem('token', response.data.token);
//     localStorage.setObject('user', response.data.user);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Logout Action 
// export const logout = () => (dispatch)=> {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   dispatch({ type: AUTH_USER, token: '', user: '' });
// };

// // Reset Password Action 
// export const resetPassword = (login, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/reset`,
//       login
//     )
//     dispatch({ type: AUTH_USER, success: response.data});
//     localStorage.setObject('success', response.data);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Create New Password Action 
// export const newPassword = (user, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/newpassword`,
//       user
//     );
//     dispatch({ type: AUTH_USER, token: response.data.token, user: response.data.user});
//     localStorage.setItem('token', response.data.token);
//     localStorage.setObject('user', response.data.user);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Email Confirmation Token Action  -- Handle Received Token
// export const confirmToken = (user, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/confirm/token`,
//       user
//     );
//     dispatch({ type: AUTH_USER, token: response.data.token, user: response.data.user});
//     localStorage.setItem('token', response.data.token);
//     localStorage.setObject('user', response.data.user);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Email Confirmation Form Action  -- Handle Send Token 
// export const confirmEmail = (email, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/confirm/email`,
//       email
//     );
//     dispatch({ type: AUTH_USER, success: response.data});
//     localStorage.setObject('success', response.data);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Contact Form Action
// export const contact = (user, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/contact`,
//       user
//     )
//     dispatch({ type: AUTH_USER, success: response.data});
//     localStorage.setObject('success', response.data);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Newsletter Form Action
// export const subscribe = (email, callback) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/subscribe`,
//       email
//     )
//     dispatch({ type: AUTH_USER, success: response.data});
//     localStorage.setObject('success', response.data);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, errors: e.response.data });
//     localStorage.setObject('errors', e.response.data);  
//   }
// };

// // Clear Server Errors Action 
// export const clearErrors = (name, errors) => {
//   localStorage.removeItem('errors');
//   return {
//     type: AUTH_ERROR,
//     errors: {...errors, [name]: ''}
//   };
// };
 
// // Helpers 
// Storage.prototype.setObject = function(key, value) {
//   this.setItem(key, JSON.stringify(value));
// }