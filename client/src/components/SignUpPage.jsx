import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function SignUpPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  //   useEffect(() => {}, []);

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    if (password != confirmPassword) {
      alert(new Error("Passwords do not match!"));
      navigate(0);
      return;
    }
    // Send data to backend
    const result = await fetch("http://localhost:8080/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, firstName, lastName, email }),
    });
    // Clear inputs after submit
    setUsername("");
    setPassword("");

    if (!result.ok) {
      const errorData = await result.json();
      alert(new Error(errorData.message));
      navigate(0);
      return;
    }

    navigate("/log-in");
  }

  const signUp = (
    <>
      <div className="sidebar">
        <img src="/login-image.jpg" className="big" alt="galaxy" width="100" height="100" />
        {/* <div className="overlay">
          <div className="logo-text">ODIN</div>
        </div> */}
      </div>
      <div className="right">
        <div className="header">
          This is not a real online service! Do not use this form in any way except to revel in its glory!
        </div>
        {/* leaving out noValidate for now */}
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="input-group">
              <div className="input-half input-left">
                <label htmlFor="first-name">FIRST NAME</label>
                <input type="text" id="first-name" onChange={(e) => setFirstName(e.target.value)} required />
                <span className="error-message" id="first-name-error"></span>
              </div>
              <div className="input-half input-right">
                <label htmlFor="last-name">LAST NAME</label>
                <input type="text" id="last-name" onChange={(e) => setLastName(e.target.value)} required />
                <span className="error-message" id="last-name-error"></span>
              </div>
            </div>
            <div className="input-group">
              <div className="input-half input-left">
                <label htmlFor="username">USERNAME</label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} required />
                <span className="error-message" id="username-error"></span>
              </div>
              <div className="input-half input-right">
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
                <span className="error-message" id="email-error"></span>
              </div>
            </div>
            <div className="input-group">
              <div className="input-half input-left">
                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                <span className="error-message" id="password-error"></span>
              </div>
              <div className="input-half input-right">
                <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  id="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="error-message" id="confirm-password-error"></span>
              </div>
            </div>
          </div>
          <button type="submit">Create Account</button>
          <div className="login">
            Already have an account? <a href="/log-in">Log in</a>
          </div>
        </form>
      </div>
    </>
  );
  return (
    // use below for integration with React, using express.json()
    // make sure to match up with Express req.body
    <>{signUp}</>

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

export default SignUpPage;
