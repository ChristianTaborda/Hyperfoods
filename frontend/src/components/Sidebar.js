/*eslint-disable*/
import React, { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSidebarOpened } from "../redux/Template/actions.js";
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav } from "reactstrap";
import availableRoutes from "../routes.js";

var ps;

function Sidebar(props) {
  const sidebar = useRef();
  const routes = availableRoutes();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  useEffect(
    () => {
      // component mounted (ComponentDidMount)
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(sidebar, {
          suppressScrollX: true,
          suppressScrollY: false,
        });
      }
      // callback at unmount (ComponentWillUnmount)
      return () => {
        if (navigator.platform.indexOf("Win") > -1) {
          ps.destroy();
        }
      };
    },
    // eslint-disable-next-line
    []
  );

  // const linkOnClick = () => { document.documentElement.classList.remove("nav-open") };

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    props.setSidebarOpened(!props.sidebarOpened);
  };

  const { bgColor, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          onClick={toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }
  }

  return (
    <div className="sidebar" data={bgColor}>
      <div className="sidebar-wrapper" ref={sidebar}>
        {logoImg !== null || logoText !== null ? (
          <div className="logo">
            {logoImg}
            {logoText}
          </div>
        ) : null}
        <Nav>
          {routes.map((prop, key) => {
            if (prop.redirect) return null;
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                  onClick={toggleSidebar}
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    bgColor: state.templateReducer.templateProps.bgColor,
    logo: state.templateReducer.templateProps.logo,
    sidebarOpened: state.templateReducer.templateProps.sidebarOpened,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarOpened: (state) => dispatch(setSidebarOpened(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
