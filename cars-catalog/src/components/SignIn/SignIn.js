// import React, { useEffect, useState } from "react";
import React from "react";
// import axios from "axios";

// css
import "./SignIn.css";

// Icons
import { FaCar } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";

const SignIn = () => {
  let content = (
    <div className="singIn">
        <div className="container-fluid sign-container">
            <div className="card">
                <div className="card-body">
                    <h3><FaCar/> SIGN IN </h3>
                    <section className="signin-facebook-section">
                        <a href="http://localhost:5000/auth/facebook" className="btn signin-facebook-btn">
                            <i className="fab fa-facebook left"/> {" "}
                            Sign in with Facebook
                        </a>
                    </section>
                </div>
            </div>
        </div>
    </div>
  );
  return content;
};

export default SignIn;
