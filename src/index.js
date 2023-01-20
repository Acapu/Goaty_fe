import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import Main from "./DemoPages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";

const store = configureStore();
const rootElement = document.getElementById("root");

if (window.location.hostname !== "localhost" && !window.location.href.includes(":")) {
  // global.ipServer = window.location.origin + "/true-be/";
  // global.trustbp = "https://trustbp.tm.com.my/"

} else {
  // global.trustbp = "https://trustbp.tm.com.my/"
  if (window.location.href.includes(":300")) { /*Logic SERVER OFFICE*/
      global.ipServer = `http://${window.location.hostname}:8080/`;
  } else {
      // global.ipServer = window.location.origin + "/true-be/";  /*Logic LOCALHOST*/
  }
}

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept("./DemoPages/Main", () => {
    const NextApp = require("./DemoPages/Main").default;
    renderApp(NextApp);
  });
}
serviceWorker.unregister();
