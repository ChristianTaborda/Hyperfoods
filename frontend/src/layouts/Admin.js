import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import axios from "axios";
import { connect } from "react-redux";
import availableRoutes from "routes.js";
import { setSidebarOpened } from "../redux/Template/actions.js";
import { setNetworkStatus } from "../redux/Template/actions.js";
import { adminPath } from "../views/url.js";

// core components
import AdminNavbar from "components/AdminNavbar.js";
import Footer from "components/Footer.js";
import Sidebar from "components/Sidebar.js";
import FixedPlugin from "components/FixedPlugin.js";

import "./Admin.css";

var ps;

function Admin(props) {
  const [backgroundColor, setBackgroundColor] = useState(props.bgColor);
  const mainPanel = useRef();
  let history = useHistory();
  const routes = availableRoutes();

  useEffect(
    () => {
      props.setNetworkStatus(window.navigator.onLine);

      // Listeners for network status
      window.addEventListener("online", () => props.setNetworkStatus(true));
      window.addEventListener("offline", () => props.setNetworkStatus(false));

      // component mounted (ComponentDidMount)
      if (navigator.platform.indexOf("Win") > -1) {
        document.documentElement.className += " perfect-scrollbar-on";
        document.documentElement.classList.remove("perfect-scrollbar-off");
        ps = new PerfectScrollbar(mainPanel, { suppressScrollX: true });
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      props.setSidebarOpened(
        document.documentElement.className.indexOf("nav-open") !== -1
      );

      // Function to determine the type of tenant
      if (window.location.hostname.split(".").length > 1) {
        //subdomain or schema_name
        let subdomain = window.location.hostname.split(".")[0];
        let payload = {
          schema_name: subdomain,
        };

        axios
          .post("http://" + adminPath + "/tenants/info/", payload)
          .then((res) => {
            switch (res.data[0].type_plan) {
              case 1:
                window.sessionStorage.setItem("type_plan", "Full");
                break;
              case 2:
                window.sessionStorage.setItem("type_plan", "Medium");
                break;
              case 3:
                window.sessionStorage.setItem("type_plan", "Basic");
                break;
              default:
                window.sessionStorage.setItem("type_plan", null);
                break;
            }
          })
          .catch((err) => console.log(err));
      }

      // callback at unmount (ComponentWillUnmount)
      return () => {
        if (navigator.platform.indexOf("Win") > -1) {
          ps.destroy();
          document.documentElement.className += " perfect-scrollbar-off";
          document.documentElement.classList.remove("perfect-scrollbar-on");
        }
      };
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    // component updated (ComponentDidUpdate)
    if (history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainPanel.current.scrollTop = 0;
    }
    setBackgroundColor(props.bgColor);
  }, [history.action, props.bgColor]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <Route component={Sidebar} />
        <div className="main-panel" ref={mainPanel} data={backgroundColor}>
          <Route component={AdminNavbar} />

          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/" />
          </Switch>
          <Footer fluid />
        </div>
      </div>
      <FixedPlugin />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    bgColor: state.templateReducer.templateProps.bgColor,
    sidebarOpened: state.templateReducer.templateProps.sidebarOpened,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarOpened: (state) => dispatch(setSidebarOpened(state)),
    setNetworkStatus: (state) => dispatch(setNetworkStatus(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
