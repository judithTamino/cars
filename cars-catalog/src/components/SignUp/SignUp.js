import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./SignUp.css";

// Icons
import { FaCar } from "react-icons/fa";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isValidInput, setIsValidInput] = useState(false);
  const [login, setLogin] = useState(false);

  const logIn = () => {
    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/signup/", user)
      .then((res) => {
        if (res.status === 201) {
          setLogin(true);
        } 
      })
      .catch((err) => {
        setLogin(true);
        alert('already signup');   
      });
  };

  const signinRedirect = () => {
      if (login) {
          return <Redirect to="/signIn/" />
      }
  }

  const isAllLetter = (str) => {
    if (str.match(/^[א-תA-Za-z\s\W]+$/)) {
      return true;
    }
    return false;
  };

  const nameHandler = (event) => {
    const name = event.target.value;
    if (isAllLetter(name)) {
      setFirstName(name);
      setIsValidInput(true);
    } else {
      setIsValidInput(false);
    }
  };

  const lastNameHandler = (event) => {
    const last_name = event.target.value;
    if (isAllLetter(last_name)) {
      setLastName(last_name);
      setIsValidInput(true);
    } else {
      setIsValidInput(false);
    }
  };

  const emailHandler = (event) => {
    const email = event.target.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmail(email);
      setIsValidInput(true);
    } else {
      setIsValidInput(false);
    }
  };

  const passwordHandler = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const errorMsg = () => {
    if (!isValidInput) {
      return (
        <div>
          <span className="errorMsg">incorrect field</span>
        </div>
      );
    }
    return "";
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isValidInput) {
      alert("incorrect field");
    } else {
      logIn();
    }
  };

  const disabled = !firstName || !lastName || !email || !password;

  let content = (
    <div className="SignUp">
      <div className="container-fluid sign-container">
        <div className="card">
          <div className="card-body">
            <h3 className="signup-title">
              <FaCar /> SIGN UP{" "}
            </h3>
            <section className="signup-local-section">
              <form onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="inputFirstName">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputFirstName"
                        onChange={nameHandler}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="inputLastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputLastName"
                        onChange={lastNameHandler}
                        required
                      />
                    </div>
                  </div>
                </div>
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
                {errorMsg()}
                {signinRedirect()}
                <button type="submit" className="btn btn-dark btn-block" disabled={disabled}>
                  Create Account
                </button>
              </form>
            </section>
            <div>OR</div>
            <section className="signup-facebook-section">
              <a
                href="http://localhost:5000/auth/facebook"
                className="btn btn-block signup-facebook-btn"
              >
                <i className="fab fa-facebook left" /> Sign up with Facebook
              </a>
            </section>
            <section className="have-account-section">
                <span>Already have account?</span>
                <a href="/signIn/">Sign in</a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
};

export default SignUp;
