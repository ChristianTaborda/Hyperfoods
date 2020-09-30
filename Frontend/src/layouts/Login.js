import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Button, Form, Input, FormGroup } from "reactstrap";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import logo from "../assets/img/logo.png";
import { connect } from "react-redux";
import { setCredentials } from "../redux/Login/actions.js";

function Login(props) {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = (e) => {
    e.preventDefault();
    props.setCredentials({ email: email, password: password });
    console.log(email, password);
    // history.push("/");
  };

  return (
    <div className="login-background">
      <Form className="login-form shadow p-4 mb-0 rounded">
        <div className="text-center">
          <img className="login-logo" alt="logo" src={logo} />
        </div>
        <br />

        <FormGroup>
          <label htmlFor="InputEmail">Email address</label>
          <Input
            placeholder="mike@email.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="InputPassword">Password</label>
          <Input
            placeholder="type your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <div className="text-center pt-2">
          <Button
            type="submit"
            className="btn btn-dark btn-block"
            onClick={onClickLogin}
          >
            Log in
          </Button>
        </div>
        <div className="text-center pt-2">
          Or continue with your social account
        </div>
        <FacebookLoginButton
          className="btn mt-3 mb-3 no-hover-effect "
          size="38px"
        />
        <GoogleLoginButton className="btn mt-3 mb-3" size="38px" />
        <div className="text-center">
          <a href="/">Sign up</a>
          <span className="p-2">|</span>
          <a href="/">Forgot Password</a>
        </div>
      </Form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCredentials: (credentials) => dispatch(setCredentials(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
