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
import {BurgerContextProvider, BurgerContextConsumer} from "./context/BurgerContext";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <BurgerContextProvider>
          <ErrorBoundary errorMsg="">
            <Router>
              <Layout>
                  <Toolbar />
                <Switch>
                  {/*<Route exact={true} path="/" component={ BurgerBuilder } />*/}
                  <Route exact={true} path="/" render={
                    (props) => <BurgerContextConsumer>{ (value:any) => <BurgerBuilder {...value} {...props} /> }</BurgerContextConsumer>
                  } />
                  <Route path="/order" render={
                    (props) => <BurgerContextConsumer>{ (value:any) => <Order {...value} {...props} /> }</BurgerContextConsumer>
                  } />
                </Switch>
              </Layout>
            </Router>
          </ErrorBoundary>
        </BurgerContextProvider>
      </div>
    );
  }
}

export default App;
