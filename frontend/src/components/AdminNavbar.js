import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import availableRoutes from "routes.js";
import { setSidebarOpened } from "../redux/Template/actions.js";
import classNames from "classnames";
import NotificationAlert from "react-notification-alert";
import "./AdminNavbar.css";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Button,
} from "reactstrap";

function AdminNavbar(props) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [color, setColor] = useState("navbar-transparent");
  const routes = availableRoutes();
  const notificationAlert = useRef();

  // Message from service-worker to client
  const channel = new BroadcastChannel("sw-messages");

  // Message from service-worker to client
  function notificationFromServiceWorker(event) {
    if (event.data.response === 201) {
      notify(
        "br",
        "success",
        `User registration with email ${event.data.email} was successful`
      );
    } else {
      notify(
        "br",
        "danger",
        `User with email ${event.data.email} already exist`
      );
    }
  }

  useEffect(
    () => {
      if (window.sessionStorage.getItem("workers") != null) {
        sessionStorage.removeItem("workers");
      }

      // Message from service-worker to client
      channel.addEventListener("message", notificationFromServiceWorker);

      //component mounted (ComponentDidMount)
      window.addEventListener("resize", updateColor);

      // callback at unmount (ComponentWillUnmount)
      return () => {
        window.removeEventListener("resize", updateColor);
      };
    },
    // eslint-disable-next-line
    []
  );

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor("bg-white");
    } else {
      setColor("navbar-transparent");
    }
  };

  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor("navbar-transparent");
    } else {
      setColor("bg-white");
    }
    setCollapseOpen(!collapseOpen);
  };

  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setModalSearch(!modalSearch);
  };

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    props.setSidebarOpened(!props.sidebarOpened);
  };

  const getBrandText = () => {
    return routes.filter(
      (route) => route.layout + route.path === props.history.location.pathname
    )[0].name;
    // console.log(routes.map(route=>route.layout + route.path))
    // console.log(props.history.location.pathname)
    // return "Brand";
  };

  //Function for notification settings
  const notify = (place, type, message) => {
    notificationAlert.current.notificationAlert({
      place: place,
      type: type, //["primary", "success", "danger", "warning", "info"]
      message: message,
      icon:
        type === "success"
          ? "tim-icons icon-check-2"
          : "tim-icons icon-alert-circle-exc",
      autoDismiss: 7,
    });
  };

  return (
    <>
      {/* {console.log(JSON.parse(window.sessionStorage.getItem("workers")))} */}
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlert} />
        </div>
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="" onClick={(e) => e.preventDefault()}>
              {getBrandText()}
            </NavbarBrand>
          </div>
          <button
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {props.networkStatus && props.pending.length ? (
                <Button
                  onClick={() => {
                    window.location.reload(false);
                  }}
                  className="btn-reload"
                  color="info"
                  size="sm"
                >
                  <i className="tim-icons icon-refresh-02" /> SYNC
                  {props.pending.length ? ` (${props.pending.length})` : ""}
                </Button>
              ) : null}
              <UncontrolledDropdown nav>
                <DropdownToggle
                  // caret
                  // color="default"
                  data-toggle="dropdown"
                  nav
                >
                  {props.networkStatus ? (
                    <div>
                      <i className="tim-icons icon-check-2 icon-online" />
                      <p className="online-text">ONLINE</p>
                    </div>
                  ) : (
                    <div>
                      <i className="tim-icons icon-alert-circle-exc icon-offline" />
                      <p className="offline-text">OFFLINE</p>
                    </div>
                  )}
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      {/* <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <div className="modal-header">
          <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
      </Modal> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    sidebarOpened: state.templateReducer.templateProps.sidebarOpened,
    networkStatus: state.templateReducer.templateProps.networkStatus,
    pending: state.offlineReducer.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarOpened: (state) => dispatch(setSidebarOpened(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
