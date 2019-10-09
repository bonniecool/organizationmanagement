import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./app/Store";
import App from "./app/App";
import { ConnectedRouter } from "react-router-redux";
import history from "./app/History";
import registerServiceWorker from "./registerServiceWorker";

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'assets/css/fontawesome/css/all.min.css';
import 'assets/fonts/typicons.font/typicons.css';
import 'assets/fonts/ionicons/css/ionicons.min.css';
import "assets/css/superStyle.css";


import "react-datepicker/dist/react-datepicker.css";

const rootElement = document.getElementById("root");

const appRender = async () => {
  const store = await configureStore();
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    rootElement
  );
};
appRender();
registerServiceWorker();
