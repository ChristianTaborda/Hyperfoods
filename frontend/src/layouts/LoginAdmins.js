import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import { setCredentials } from "../redux/Login/actions.js";
import { setBgColor, setMode } from "../redux/Template/actions.js";
import logo from "../assets/img/logo.png";
import "./Login.css";
import { adminPath } from "../views/url";

// User type const.
export const userType = "superadmin"; // DO NOT MODIFY

function LoginAdmins(props) {
  window.sessionStorage.setItem("userType", userType);
  const notificationAlert = useRef();
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  //Function to handle Login submit
  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://" + adminPath + "/api/admin/login/", values)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.user.is_active) {
            loadColorProfile(res.data.user.color);
            notify("br", "success", "Login successful");
            props.setCredentials(res.data);
            window.sessionStorage.setItem("idUser", res.data.user.id_user);
            setTimeout(() => {
              history.push("/");
            }, 800);
          } else notify("br", "danger", "Inactive user");
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        notify("br", "danger", "Incorrect user Id or password");
        setTimeout(() => {
          resetForm({
            email: "",
            password: "",
          });
        }, 600);
      });
  };

  // load color profile from user
  const loadColorProfile = (profile) => {
    // console.log(profile);
    if (profile != null) {
      let jsonProfile = JSON.parse(profile);
      props.setBgColor(jsonProfile.bgColor);
      props.setMode(jsonProfile.mode);
    } else {
      // default settings
      props.setBgColor("blue");
      props.setMode("light");
    }
  };

  //Schema for input data valiation using Yup
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Required field")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Must be a valid e-mail address"
      ),
    password: Yup.string()
      .required("Required field")
      .min(4, "Minimum of 4 characters"),
  });

  //Function for notification settings
  const notify = (place, type, message) => {
    notificationAlert.current.notificationAlert({
      place: place,
      type: type, //["primary", "success", "danger", "warning", "info"]
      message: <b>{message}</b>,
      icon:
        type === "success"
          ? "tim-icons icon-check-2"
          : "tim-icons icon-alert-circle-exc",
      autoDismiss: 2,
    });
  };

  return (
    <div className="login-background">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlert} />
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
      >
        <Form className="login-form login-form-admin shadow p-4 mb-0 rounded">
        <br />
          <div className="text-center">
            <img className="login-logo" alt="logo" src={logo} />
          </div>
          {loading ? <div className="loader" /> : null}
          <br />
          <FormGroup>
            &nbsp;
            <i className="tim-icons icon-laptop" />
            &nbsp;&nbsp;
            <label htmlFor="Id">Superadmin Email</label>
            <Field
              className="form-control form-login-admin"
              name="email"
              placeholder="type your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="field-error text-danger"
            />
          </FormGroup>
          <FormGroup>
            &nbsp;
            <i className="tim-icons icon-key-25" />
            &nbsp;&nbsp;
            <label htmlFor="Password">Password</label>
            <Field
              className="form-control form-login-admin"
              name="password"
              placeholder="type your password"
              type="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="field-error text-danger"
            />
          </FormGroup>

          <div className="text-center pt-2">
            <Button
            color="info"
              type="submit"
              className="btn btn-dark btn-block"
              onSubmit={() => {}}
              onClick={() => {
                setTimeout(() => {
                  setLoading(true);
                }, 5);
              }}
              disabled={loading}
            >
              Log in
            </Button>
            <br />
            <br />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCredentials: (credentials) => dispatch(setCredentials(credentials)),
    setBgColor: (color) => dispatch(setBgColor(color)),
    setMode: (mode) => dispatch(setMode(mode)),
  };
};

export default connect(null, mapDispatchToProps)(LoginAdmins);
