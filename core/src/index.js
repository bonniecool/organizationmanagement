import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./app/Store";
import App from "./app/App";
import { ConnectedRouter } from "react-router-redux";
import history from "./app/History";
import registerServiceWorker from "./registerServiceWorker";

// import "react-s-alert/dist/s-alert-default.css";
// import "./assets/fonts/material/material.css";
// import "react-s-alert/dist/s-alert-css-effects/slide.css";
// import "react-select/dist/react-select.css";
// import "./assets/css/bootstrap.css";
import "./assets/css/font-awesome.min.css";
// import "./assets/css/react-modal.css";
import "./assets/css/style_finger_print.css";
import "./assets/css/style.css";
import "./assets/css/toggle-switch.css";
import "./assets/fonts/K2D/stylesheet.css";
import "./assets/scss/styles.css";

import "react-datepicker/dist/react-datepicker.css";
import "react-virtualized/styles.css";

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
