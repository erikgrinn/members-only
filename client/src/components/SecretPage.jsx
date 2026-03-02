import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function SecretPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    async function getStatusEffect() {
      try {
        const response = await fetch("http://localhost:8080/status", { credentials: "include" });
        const data = await response.json();
        console.log(data);
        setCurrentUser(data.user.username);
      } catch (error) {
        console.error(error);
      }
    }
    getStatusEffect();
  }, []);

  //   async function handleSubmitLogIn(e) {
  //     e.preventDefault(); // Prevent page reload (optional?)

  //     // Send data to backend
  //     const result = await fetch("http://localhost:8080/log-in", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ username, password }),
  //     });
  //     // setUsername(""); // Clear input after submit
  //     // setPassword("");

  //     if (!result.ok) {
  //       const errorData = await result.text(); //json if custom log-in route backend
  //       alert(Error(errorData));
  //     }

  //     navigate(0); // to ensure inputs are empty
  //   }

  const secret = (
    <>
      <div className="sidebar">
        <img src="/login-image.jpg" className="big" alt="galaxy" width="100" height="100" />
        {/* <div className="overlay">
          <div className="logo-text">ODIN</div>
        </div> */}
      </div>
      <div className="right">
        <div className="header">Welcome, {currentUser}.</div>
        {/* <form onSubmit={handleSubmitLogIn} noValidate>
          <div className="container">
            <div className="input-group">
              <div className="input-half input-left">
                <label htmlFor="username">USERNAME</label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} required />
                <span className="error-message" id="username-error"></span>
              </div>
              <div className="input-half input-right">
                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                <span className="error-message" id="password-error"></span>
              </div>
            </div>
          </div>
          <button type="submit">Log In</button>
          <div className="signup">
            Don&apos;t have an account? <a href="/sign-up">Sign Up</a>
          </div>
        </form> */}
      </div>
    </>
  );
  return (
    // use below for integration with React, using express.json()
    // make sure to match up with Express req.body
    <>{secret}</>

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

export default SecretPage;
