import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import * as serviceWorker from "./serviceWorker";

import Admin from "layouts/Admin.js";
import LoginAdmins from "layouts/LoginAdmins.js";
import LoginClients from "layouts/LoginClients.js";
import LoginWorkers from "layouts/LoginWorkers.js";
import LandingPage from "layouts/LandingPage.js";
import Suscription from "layouts/Suscription.js";
import ResetPassword from "layouts/ResetPassword.js";

// import Sale from "layouts/Sale.js"
import RedirectRoutes from "./RedirectRoutes.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/css/nucleo-icons.css";

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/request/:id" component={Suscription} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/admin" component={Admin} />
        <Route exact path="/login-admins" component={LoginAdmins} />
        <Route exact path="/login-workers" component={LoginWorkers} />
        <Route exact path="/login-clients" component={LoginClients} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/reset-password/:idlink" component={ResetPassword} />
        <Route path="/" component={RedirectRoutes} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
