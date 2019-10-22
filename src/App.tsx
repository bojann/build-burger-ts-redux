import React, { Component } from "react";
import "./App.scss";

import Layout from "./component/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Toolbar from "./component/Navigation/Toolbar/Toolbar"
import Order from "./container/Order/Order";
import ErrorBoundary from "./Handlers/Errors/ErrorBoundary";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
class App extends Component {
  public render() {
    return (
      <div className="App">
        <ErrorBoundary errorMsg="">
          <Router>
            <Layout>
                <Toolbar />
              <Switch>
                <Route exact={true}  path="/"  component={ BurgerBuilder } />
                <Route path="/order"  component={ Order } />
              </Switch>
            </Layout>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
