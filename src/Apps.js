import React, { Component,useContext } from "react";
import "./App.scss";

import Layout from "./component/Layout/Layout";
import BurgersBuilder from "./container/BurgerBuilder/BurgersBuilder";
import Toolbar from "./component/Navigation/Toolbar/Toolbar"
import Order from "./container/Order/Order";
import ErrorBoundary from "./Handlers/Errors/ErrorBoundary";
import { AuthContext } from "./context/AuthContext";
import Auth from "./component/User/Auth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import {BurgersContextProvider, BurgersContextConsumer} from "./context/BurgersContext";

const App = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuth) {
    return <Auth />
  }

  return (
    <div className="App">
      <BurgersContextProvider>
        <ErrorBoundary errorMsg="">
          <Router>
            <Layout>
                <Toolbar />
              <Switch>
                <Route exact={true} path="/" component={BurgersBuilder} />
                <Route path="/order" render={
                  (props) => <BurgersContextConsumer>{ (value) => <Order {...value} {...props} /> }</BurgersContextConsumer>
                } />
              </Switch>
            </Layout>
          </Router>
        </ErrorBoundary>
      </BurgersContextProvider>
    </div>
  );
}

export default App;
