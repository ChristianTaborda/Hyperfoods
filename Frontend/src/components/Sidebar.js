/*eslint-disable*/
import React, { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav } from "reactstrap";

var ps;

function Sidebar(props) {
  const sidebar = useRef();

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

  const linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  const { bgColor, routes, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
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
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
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
          onClick={props.toggleSidebar}
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
                  onClick={props.toggleSidebar}
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

Sidebar.defaultProps = {
  bgColor: "primary",
  routes: [{}],
};

Sidebar.propTypes = {  
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};

export default Sidebar;
