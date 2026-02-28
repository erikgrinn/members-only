import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function LogInPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   useEffect(() => {}, []);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload (optional?)

    // Send data to backend
    await fetch("http://localhost:8080/log-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setUsername(""); // Clear input after submit
    setPassword("");
    // navigate(0); // if fetch in useEffect issue described below

    // React Router v6+ will reload the current route/page
    // have to use this because defining fetchAPI outside of use effect
    // causes errors/warnings:
    // https://github.com/facebook/react/issues/34045#issuecomment-3417993146
    // useCallback wrap?
    // seems like a common "error" that doesnt really apply/false positive
    // there is also useEffectEvent
    // looking at dealership db project, looks like try catch fixes it...
  }
  return (
    // use below for integration with React, using express.json()
    // make sure to match up with Express req.body
    <>
      <div className="sidebar">
        <img src="/public/login-image.jpg" className="big" alt="galaxy" width="100" height="100" />
        {/* <div className="overlay">
          <div className="logo-text">ODIN</div>
        </div> */}
      </div>
      <div className="right">
        <div className="header">
          This is not a real online service! Do not use this form in any way except to revel in its glory!
        </div>
        <form noValidate>
          <div className="container">
            <div className="input-group">
              <div className="input-half">
                <label htmlFor="first-name">FIRST NAME</label>
                <input type="text" id="first-name" required />
                <span className="error-message" id="first-name-error"></span>
              </div>
              <div className="input-half">
                <label htmlFor="last-name">LAST NAME</label>
                <input type="text" id="last-name" required />
                <span className="error-message" id="last-name-error"></span>
              </div>
            </div>
            <div className="input-group">
              <div className="input-half">
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" required />
                <span className="error-message" id="email-error"></span>
              </div>
              <div className="input-half">
                <label htmlFor="phone-number">PHONE NUMBER</label>
                <input type="number" id="phone-number" required />
                <span className="error-message" id="phone-number-error"></span>
              </div>
            </div>
            <div className="input-group">
              <div className="input-half">
                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" required />
                <span className="error-message" id="password-error"></span>
              </div>
              <div className="input-half">
                <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                <input type="password" id="confirm-password" required />
                <span className="error-message" id="confirm-password-error"></span>
              </div>
            </div>
          </div>
          <button type="submit">Create Account</button>
          <div className="login">
            Already have an account? <a href="#">Log in</a>
          </div>
        </form>
      </div>
    </>

    // use below for direct express.urlencoded(extended: false|true)
    // <>
    //   <h1>Sign Up</h1>
    //   <form action="http://localhost:8080/sign-up" method="POST">
    //     <label for="username">Username</label>
    //     <input id="username" name="username" placeholder="username" type="text" />
    //     <label for="password">Password</label>
    //     <input id="password" name="password" type="password" />
    //     <button type="submit">Sign Up</button>
    //   </form>
    // </>
  );
}

export default LogInPage;
