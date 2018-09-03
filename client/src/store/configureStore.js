import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import authReducer from '../reducers/authReducer';
import { AUTH_USER } from '../actions/types';

export default () => {

  const store = createStore(
    combineReducers({
      auth: authReducer
    }),
    compose(
      applyMiddleware(reduxThunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  const token = localStorage.getItem('token');
  const user =  localStorage.getItem('user')  ? localStorage.getObject('user') : null;

  if (token) {
    store.dispatch({
      type: AUTH_USER,
      token,
      user
    });
  } 
  
  return store;

};

// Helper
Storage.prototype.getObject = function(key) {
  return JSON.parse(this.getItem(key));
}