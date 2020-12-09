import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import NotificationAlert from "react-notification-alert";
import logo from "../assets/img/forgot.png";
import "./Login.css";
import ruta from "../views/url";

export default function LoginClients(props) {
  const notificationAlert = useRef();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showField, setShowField] = useState(true);

  //Function to sumit a reset password
  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://" + ruta + "/api/users/request-password-reset/", values)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setShowField(false);
          notify("br", "success", "Se hizo el cambio");
        }
      })
      .catch((e) => {
        setLoading(false);
        if (e.response.data.non_field_errors[0]) {
          notify("br", "danger", e.response.data.non_field_errors[0]);
        } else {
          notify(
            "br",
            "danger",
            "We're having some problems, please try later"
          );
        }
        setTimeout(() => {
          resetForm({ email: "" });
        }, 600);
      });
  };

  //Function to new password
  const onSubmitChange = (values, { resetForm }) => {
    const data = {
      idlink: props.match.params.idlink,
      password: values.password,
    };
    axios
      .post("http://" + ruta + "/api/users/password-reset/", data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setShowField(false);
          notify("br", "success", res.data.message);
          setTimeout(() => {
            history.push("/");
          }, 4000);
        }
      })
      .catch((e) => {
        setLoading(false);
        if (e.response.data.non_field_errors[0]) {
          notify("br", "danger", e.response.data.non_field_errors[0]);
        } else {
          notify(
            "br",
            "danger",
            "We're having some problems, please try later"
          );
        }
      });
  };

  // load color profile from user

  //Schema for input data valiation using Yup
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Required field")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Must be a valid e-mail address"
      ),
  });

  const formSchemaPassword = Yup.object().shape({
    password: Yup.string()
      .required("Required field")
      .min(4, "Minimum of 4 characters"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
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

  // -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- //

  return (
    <div className="login-background">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlert} />
      </div>
      {props.match.params.idlink ? (
        /** SI ES UN LINK CON PARAMETROS*/
        <Formik
          initialValues={{
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={formSchemaPassword}
          onSubmit={(values, { resetForm }) =>
            onSubmitChange(values, { resetForm })
          }
        >
          <Form className="login-form shadow p-4 mb-0 rounded">
            {showField ? (
              <>
                <p className="text-dark pt-4">Please type your new password</p>
                {loading ? <div className="loader" /> : null}
                <br />

                <FormGroup>
                  <Field
                    className="form-control"
                    name="password"
                    placeholder="New password"
                    type="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="field-error text-danger"
                  />
                </FormGroup>

                <FormGroup>
                  <Field
                    className="form-control"
                    name="passwordConfirmation"
                    placeholder="Confirm password"
                    type="password"
                  />
                  <ErrorMessage
                    name="passwordConfirmation"
                    component="div"
                    className="field-error text-danger"
                  />
                </FormGroup>

                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    className="btn-block"
                    onSubmit={() => {}}
                    onClick={() => {
                      setTimeout(() => {
                        setLoading(true);
                      }, 5);
                    }}
                    disabled={loading}
                  >
                    Change password
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-dark pt-2 h4">
                <b>Your password has been reset, you can now sign in</b>
              </p>
            )}
          </Form>
        </Formik>
      ) : (
        /** SI NOOOO ES UN LINK CON PARAMETROS*/

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
        >
          <Form className="login-form shadow p-4 mb-0 rounded">
            <div className="text-center">
              <img className="forgot" alt="logo" src={logo} />
            </div>
            <p className="text-dark pt-4">
              Enter your email account and we'll send you a message with
              instructions, you can then check it and reset your password
            </p>
            {loading ? <div className="loader" /> : null}
            <br />
            {showField ? (
              <>
                <FormGroup>
                  <Field
                    className="form-control"
                    name="email"
                    placeholder="Type your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="field-error text-danger"
                  />
                </FormGroup>
                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    className="btn-block"
                    onSubmit={() => {}}
                    onClick={() => {
                      setTimeout(() => {
                        setLoading(true);
                      }, 5);
                    }}
                    disabled={loading}
                  >
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-dark pt-2 h4">
                <b>
                  We send you a message, please check your email to continue.
                </b>
              </p>
            )}
            <div className="text-center">
              <br />
              <a href="/">Return</a>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
}
