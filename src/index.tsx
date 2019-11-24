import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Apps from "./Apps";
// import { Provider } from 'react-redux';
// import configureStore from 'state/store';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.render(<Apps />, document.getElementById("root"));

const render = (Component: React.ComponentType) => {
  return ReactDOM.render(
    <AuthContextProvider>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AuthContextProvider>,
    document.getElementById("root")
  );
};

render(Apps);

declare const module: any;

if (module.hot) {
  module.hot.accept("./Apps", () => {
    const NextApp = require("./Apps").default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
