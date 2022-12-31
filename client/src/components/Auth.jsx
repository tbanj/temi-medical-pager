import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signinImage from "../assets/signup.jpg";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  avatarUrl: "",
  phoneNumber: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUP, setIsSignUP] = useState(true);

  const switchMode = () => {
    setIsSignUP((prevIsSignUp) => !prevIsSignUp);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.warn(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.warn("handleSubmit", form);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUP ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                  type="text"
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username"> UserName</label>
              <input
                name="username"
                placeholder="UserName"
                onChange={handleChange}
                required
                type="text"
              />
            </div>
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  type="text"
                />
              </div>
            )}
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                  type="text"
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                type="password"
              />
            </div>
            {isSignUP && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                  type="password"
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_button">
              <button>{isSignUP ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUP ? "Already have an account?" : "Don't have an account"}
              <span onClick={switchMode}>
                {isSignUP ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
