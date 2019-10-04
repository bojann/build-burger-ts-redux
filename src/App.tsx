import React, { Component } from "react";
import "./App.scss";

import Layout from "./component/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Toolbar from "./component/Navigation/Toolbar/Toolbar"
import ErrorBoundary from "./Handlers/ErrorBoundary/ErrorBoundary";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <ErrorBoundary errorMsg={""}>
            <Layout>
              <Toolbar />
              <BurgerBuilder />
            </Layout>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
