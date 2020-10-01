import React from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Button, Form, Input, FormGroup } from "reactstrap";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import logo from "../assets/img/logo.png";

function Login() {
  let history = useHistory();

  return (
    <div className="login-background">
      <Form className="login-form shadow p-4 mb-0 rounded">
        <div className="text-center">
          <img className="login-logo" alt="logo" src={logo} />
        </div>
        <br />

        <FormGroup>
          <label htmlFor="InputEmail">Email address</label>
          <Input placeholder="mike@email.com" type="email" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="InputPassword">Password</label>
          <Input placeholder="type your password" type="password" />
        </FormGroup>

        <div className="text-center pt-2">
          <Button
            className="btn btn-dark btn-block"
            onClick={() => history.push("/")}
          >
            Log in
          </Button>
        </div>
        <div className="text-center pt-2">
          Or continue with your social account
        </div>
        <FacebookLoginButton className="btn mt-3 mb-3 no-hover-effect " size="38px" />
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

export default Login;
