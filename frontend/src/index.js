import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as serviceWorker from "./serviceWorker";

import Admin from "layouts/Admin.js";
import Login from "layouts/Login.js";
import LandingPage from "layouts/LandingPage.js"
import Suscription from "layouts/Suscription.js"

import "assets/scss/black-dashboard-react.scss";
import "assets/css/nucleo-icons.css";

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route  path="/request/:id" component={Suscription}/>
        <Route path="/landing" component={LandingPage}/>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/list-workers" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();