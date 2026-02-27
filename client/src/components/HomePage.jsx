import { useState, useEffect } from "react";

// import styles from "../styles/App.module.css";

function HomePage() {
  useEffect(() => {
    async function login() {
      const response = await fetch("http://localhost:8080/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies/session
        body: JSON.stringify({ username: "testtsfd", password: "fgdgfg" }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    }
    login();
  }, []);

  return <div>{"hello"}</div>;
}

//   const [fetchedData, setFetchedData] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("http://localhost:8080/");
//         const data = await response.json();
//         console.log(data.length);
//         setFetchedData(data.length >= 1 ? data : "empty array");
//         // axios
//         // const response = await axios.get("http://localhost:8080/");
//         // console.log(response.data);
//         // setFetchedData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   return <div>{fetchedData}</div>;
// }

export default HomePage;
