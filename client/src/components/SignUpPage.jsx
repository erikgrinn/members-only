// import { useState, useEffect } from "react";

// import styles from "../styles/App.module.css";

function HomePage() {
//   useEffect(() => {}, []);

  return (
    <>
      <h1>Sign Up</h1>
      <form action="http://localhost:8080/sign-up" method="POST">
        <label for="username">Username</label>
        <input id="username" name="username" placeholder="username" type="text" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default HomePage;
