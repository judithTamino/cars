import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./SignIn.css";

// Icons
import { FaCar } from "react-icons/fa";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dashboard, setDashboard] = useState(false);

  const disabled = !email || !password;
  const [errorMsg, setErrorMsg] = useState(false);
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  const login = (event) => {
    event.preventDefault();
    let user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/auth/signin", user)
      .then((res) => {
        switch (res.data.status) {
          case 400:
            setErrorMsg(res.data.msg);
            setIsErrorMsg(true);
            break;

          case 404:
            setErrorMsg(res.data.msg);
            setIsErrorMsg(true);
            break;
        }
        setDashboard(true);
      })
      .catch((err) => {
        console.error(`${err}`);
      });
  };

  const emailHandler = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const passwordHandler = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const dashboardRedirect = () => {
    if (dashboard) {
      return <Redirect to="/dashboard/" />;
    }
  };

  const displayErrorMsg = () => {
      if(isErrorMsg) {
          return (
              <div>
                  <span className="errorMsg"> {errorMsg} </span>
              </div>
          );
      }
  }

  let content = (
    <div className="singIn">
      <div className="container-fluid sign-container">
        <div className="card">
          <div className="card-body">
            <h3 className="signin-title">
              <FaCar /> SIGN IN{" "}
            </h3>
            <section className="signin-local-section">
              <form onSubmit={login}>
                <div className="form-group">
                  <label htmlFor="inputEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    onChange={emailHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    onChange={passwordHandler}
                    required
                  />
                </div>
                { displayErrorMsg() }
                { dashboardRedirect() }
                <button
                  type="submit"
                  className="btn btn-dark btn-block"
                  disabled={disabled}
                >
                  Submit
                </button>
              </form>
            </section>
            <div>OR</div>
            <section className="signin-facebook-section">
              <a
                href="http://localhost:5000/auth/facebook"
                className="btn signin-facebook-btn"
              >
                <i className="fab fa-facebook left" /> Sign in with Facebook
              </a>
            </section>
            <section className="dont-have-account-section">
                <span>Don`t have account?</span>
                <a href="/">Sign up</a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default SignIn;
