import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
// import 'assets/styles/superStyle.css';
// import 'assets/styles/styles.scss';
// import 'react-datepicker/dist/react-datepicker.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'assets/styles/fontawesome/css/all.min.css';
import 'assets/fonts/typicons.font/typicons.css';
import 'assets/fonts/ionicons/css/ionicons.min.css';

export const store = configureStore();
export const history = createBrowserHistory();
export const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
