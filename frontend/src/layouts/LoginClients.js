import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import { setCredentials } from "../redux/Login/actions.js";
import { setUserType } from "../redux/Template/actions";
import logo from "../assets/img/logo.png";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ruta from "../views/url";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCwDo3PWtcFx7y4lHac4p4DaRWfVEPc1JI",
  authDomain: "fire-auth-hyperfoods.firebaseapp.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// User type const.
export const userType = "client"; // DO NOT MODIFY

function LoginClients(props) {
  window.sessionStorage.setItem("userType", userType);
  const notificationAlert = useRef();
  let history = useHistory();

  //Function to handle Login submit
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    axios
      .post("http://" + ruta + "/api/users/client/login/", values)
      .then((res) => {
        console.log("res", res.data);
        if (res.status === 200) {
          if (res.data.user.user.is_active) {
            notify("br", "success", "Login successful");
            props.setCredentials(res.data);
            setTimeout(() => {
              history.push("/");
            }, 800);
          } else notify("br", "danger", "Inactive user");
        }
      })
      .catch((e) => {
        console.log(e);
        notify("br", "danger", "Incorrect user Id or password");
        setTimeout(() => {
          resetForm({
            email: "",
            password: "",
          });
        }, 600);
      });
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
      autoDismiss: 7,
    });
  };

  // -- -- Social networks login with Firebase -- -- //
  const [isSignedIn, setIsSignedIn] = useState(false);
  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!!user) {
          console.table({
            name: firebase.auth().currentUser.displayName,
            emailVerified: firebase.auth().currentUser.emailVerified,
            email: firebase.auth().currentUser.providerData[0].email,
          });
          firebase.auth().signOut();
        }

        setIsSignedIn(!!user);
      });

      // Setting de type of user to the initial Template state
      props.setUserType(userType);
    },
    // eslint-disable-next-line
    []
  );
  // -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- //

  if (!isSignedIn) {
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
          <Form className="login-form shadow p-4 mb-0 rounded">
            <div className="text-center">
              <img className="login-logo" alt="logo" src={logo} />
            </div>
            <br />

            <FormGroup>
              &nbsp;
              <i className="tim-icons icon-single-02" />
              &nbsp;&nbsp;
              <label htmlFor="Id">Email</label>
              <Field
                className="form-control"
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
                className="form-control"
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
                type="submit"
                className="btn btn-dark btn-block"
                // onClick={onClickLogin}
                onSubmit={() => {}}
              >
                Log in
              </Button>
            </div>
            <div className="text-center pt-2">
              Or continue with your social account
            </div>
            {!isSignedIn && (
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
            <div className="text-center">
              <a href="/">Sign up</a>
              <span className="p-2">|</span>
              <a href="/">Forgot Password</a>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
  return <></>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCredentials: (credentials) => dispatch(setCredentials(credentials)),
    setUserType: (type) => dispatch(setUserType(type)),
  };
};

export default connect(null, mapDispatchToProps)(LoginClients);
