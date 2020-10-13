import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import { setCredentials } from "../redux/Login/actions.js";
import logo from "../assets/img/logo.png";
import "./Login.css";
import firebase from "firebase";
import StyledFirebaseAuth1 from "react-firebaseui/StyledFirebaseAuth";
import StyledFirebaseAuth2 from "react-firebaseui/StyledFirebaseAuth";
firebase.initializeApp({
  apiKey: "AIzaSyCwDo3PWtcFx7y4lHac4p4DaRWfVEPc1JI",
  authDomain: "fire-auth-hyperfoods.firebaseapp.com",
});

function Login(props) {
  const [, updateState] = React.useState();                         //
  const forceUpdate = React.useCallback(() => updateState({}), []); // <--force update
  console.log("render");                                            //

  const notificationAlert = useRef();
  let history = useHistory();

  //Function to handle Login submit
  const onSubmit = (values) => {
    console.log("%c Login request ", "background: #222; color: #bada55");
    console.table(values);
    // notify("br", "danger", "Incorrect user Id or password");
    // notify("br", "success", "Login successful");
    // axios
    //   .get("http://localhost:8000/res_login_ok")
    //   .then((res) => {
    //     console.log("%c response ", "background: #222; color: #bada55");
    //     console.table(res.data);
    //     props.setCredentials(res.data); //<------------
    //   })
    //   .catch((err) => console.log(err));
    // setTimeout(() => {  history.push("/"); }, 800);
  };

  //Schema for input data valiation using Yup
  const formSchema = Yup.object().shape({
    Id: Yup.string()
      .trim()
      .required("Required field")
      .min(8, "Minimum of 8 characters")
      .matches(/^[1-9][0-9]*$/, "Must be an integer and positive number"),
    Password: Yup.string()
      .required("Required field")
      .min(5, "Minimum of 5 characters"),
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
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/login",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // signInSuccess: () => false,
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        // console.log("user", user);

        firebase.auth().signOut(); //
        forceUpdate();             //<-- attempts to prevent <StyledFirebaseAuth/> from hiding
        localStorage.clear();      //
      });
    },
    // eslint-disable-next-line
    []
  );
  // -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- //

  return (
    <div className="login-background">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlert} />
      </div>

      <Formik
        initialValues={{
          Id: "",
          Password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form className="login-form shadow p-4 mb-0 rounded">
          <div className="text-center">
            <img className="login-logo" alt="logo" src={logo} />
          </div>
          <br />

          <FormGroup>
            <label htmlFor="Id">Id</label>
            <Field
              className="form-control"
              name="Id"
              placeholder="type your id"
            />
            <ErrorMessage
              name="Id"
              component="div"
              className="field-error text-danger"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="Password">Password</label>
            <Field
              className="form-control"
              name="Password"
              placeholder="type your password"
              type="password"
            />
            <ErrorMessage
              name="Password"
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

          {/* cuchinni: these are the buttons that we want to prevent from being hidden */}
          {isSignedIn ? (
            <StyledFirebaseAuth1
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
              // uiCallback={ui => ui.disableAutoSignIn()}
              // uiCallback={ui => ui.reset()}
            />
          ) : (
            <StyledFirebaseAuth2
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
          {/* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- - */}

          <div className="text-center">
            <a href="/">Sign up</a>
            <span className="p-2">|</span>
            <a href="/">Forgot Password</a>
          </div>
        </Form>
      </Formik>

      {isSignedIn && (
        <span>
          {console.table({
            status: "Signed in",
            name: firebase.auth().currentUser.displayName,
            emailVerified: firebase.auth().currentUser.emailVerified,
            email: firebase.auth().currentUser.email,
          })}
          <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
        </span>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCredentials: (credentials) => dispatch(setCredentials(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
