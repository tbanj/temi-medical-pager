import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signinImage from "../assets/signup.jpg";
import { notifyError } from "../utils/helpers/ToastHelpers";
import RoundLoader from "./Rounderloader/RoundLoader";

const cookies = new Cookies();
const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  avatarURL: "",
  phoneNumber: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUP, setIsSignUP] = useState(true);
  const [loaderIcon, setLoaderIcon] = useState({
    borderTop: "2px solid #3498db",
    width: "20px",
    height: "20px",
    padding: `0px 0px`,
  });
  const [isLoading, setIsLoading] = useState(false);

  const switchMode = () => {
    setIsSignUP((prevIsSignUp) => !prevIsSignUp);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { username, password, avatarURL, phoneNumber, confirmPassword } =
        form;

      const URL = "https://temi-pager.onrender.com/auth";

      if (isSignUP && confirmPassword !== password) {
        notifyError("Password does not match");
        setIsLoading(false);
        return;
      }
      const res = await axios.post(`${URL}/${isSignUP ? "signup" : "login"}`, {
        username,
        password,
        avatarURL,
        fullName: form.fullName,
        phoneNumber,
      });

      console.warn("response", res.data);
      if (res?.data?.message === "Incorrect password") {
        notifyError("Email or password is incorrect");
        setIsLoading(false);
      }

      const {
        data: { token, userId, hashedPassword, fullName },
      } = res;
      cookies.set("token", token);
      cookies.set("username", username);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);

      if (isSignUP) {
        cookies.set("phoneNumber", phoneNumber);
        cookies.set("avatarURL", avatarURL);
        cookies.set("hashedPassword", hashedPassword);
      }

      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data?.message === "Incorrect password") {
        notifyError("Email or password is incorrect");
        setIsLoading(false);
      } else {
        notifyError("server error");
      }
    }
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
                  maxLength={100}
                  onChange={handleChange}
                  required
                  type="text"
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">UserName</label>
              <input
                name="username"
                placeholder="UserName"
                maxLength={50}
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
                  maxLength={14}
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
                  maxLength={100}
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
                maxLength={50}
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
                  maxLength={50}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                  type="password"
                />
              </div>
            )}

            <div className="auth__form-container_fields-content_button">
              <button disabled={isLoading}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <span style={{ padding: "0px 5px 0px 0px" }}>
                    {isSignUP ? "Sign Up" : "Sign In"}
                  </span>
                  <span>
                    {isLoading ? <RoundLoader loaderIcon={loaderIcon} /> : ""}
                  </span>
                </div>
              </button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUP
                ? `Already have an account? `
                : `Don't have an account? `}
              <span onClick={switchMode}>
                {isSignUP ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
