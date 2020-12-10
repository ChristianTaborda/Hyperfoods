import React from "react";
import { Redirect } from "react-router-dom";

export default function RedirectRoutes() {
  // console.log(window.sessionStorage.getItem("userType"));

  if (window.sessionStorage.getItem("userType") === "superadmin") {
    return <Redirect from="/" to="/admin/create-tenant" />;
  }

  if (window.sessionStorage.getItem("userType") === "client") {
    return <Redirect from="/" to="/admin/sales" />;
  }

  if (window.sessionStorage.getItem("userType") === "worker") {
    return <Redirect from="/" to="/admin/list-workers" />;
  }

  if (window.sessionStorage.getItem("userType") === null) {
    return <Redirect from="/" to="/landing" />;
  }
}
