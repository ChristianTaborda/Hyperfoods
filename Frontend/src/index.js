import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import AdminLayout from "layouts/Admin.js";
import Login from "layouts/Login.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={hist}>
        <Switch>
          <Route exact path="/login" component={() => <Login />} />
          <Route path="/admin" component={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/users" />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById("root")
);
