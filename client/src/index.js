import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import './styles/main.scss';
import AppRouter from './components/AppRouter';
import configureStore from './store/configureStore'; 

const store = configureStore();

const routes = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

ReactDOM.render(routes, document.getElementById("root"));
registerServiceWorker();
