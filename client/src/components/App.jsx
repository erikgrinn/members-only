import { useState, useEffect } from "react";

// import styles from "../styles/App.module.css";

function App() {
  const [fetchedData, setFetchedData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/");
        const data = await response.json();
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
  }, []);

  return <div>{fetchedData}</div>;
}

export default App;
