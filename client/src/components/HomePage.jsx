import { useState, useEffect } from "react";

// import styles from "../styles/App.module.css";

function HomePage() {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function login() {
      const response = await fetch("http://localhost:8080/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies/session
        body: JSON.stringify({ username: "work", password: "pls" }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    }
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/");
        let data = await response.json();
        data = data.users;
        console.log(data);
        setFetchedData(data);
        // axios
        // const response = await axios.get("http://localhost:8080/");
        // console.log(response.data);
        // setFetchedData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    login();
  }, []);

  return (
    <div>
      <ul>
        {fetchedData.map((user, idx) => (
          <li key={idx}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
