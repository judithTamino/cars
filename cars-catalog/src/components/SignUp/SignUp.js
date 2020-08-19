// import React, { useEffect, useState } from "react";
// import axios from "axios";
import React from "react";
import "./SignUp.css";

// Icons
import { FaCar } from "react-icons/fa";

const SignUp = () => {
  let content = (
    <div className="SignUp">
        <div className="container-fluid sign-container">
            <div className="card">
                <div className="card-body">
                    <h3><FaCar/> SIGN UP </h3>
                    <section className="signup-facebook-section">
                        <a href="http://localhost:5000/auth/facebook" className="btn signup-facebook-btn">
                            <i className="fab fa-facebook left"/> {" "}
                            Sign up with Facebook
                        </a>
                    </section>
                </div>
            </div>
        </div>
    </div>
  );
  return content;
};

export default SignUp;
