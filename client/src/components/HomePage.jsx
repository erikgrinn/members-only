import { useState, useEffect } from "react";

// import styles from "../styles/App.module.css";

function HomePage() {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function fetchDataEffect() {
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
    // async function login() {
    //   const response = await fetch("http://localhost:8080/log-in", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include", // important for cookies/session
    //     body: JSON.stringify({ username: "work", password: "pls" }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   return data;
    // }
    fetchDataEffect();
    // login();
  }, []);

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

// file
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   async function login(username, password) {
//     const response = await fetch("http://localhost:8080/log-in", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await response.json();
//     if (data.success) setUser(data.user);
//     return data;
//   }

//   function logout() {
//     setUser(null);
//     // Optionally call your backend /log-out endpoint
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


//usage

// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       {/* your routes/components */}
//     </AuthProvider>
//   );
// }

//component
// import { useAuth } from "../context/AuthContext";

// function LogInPage() {
//   const { login, user } = useAuth();
//   // use login() and user as needed
// }

// The .Provider part refers to the Provider component created by React’s Context API.
// When you do const AuthContext = createContext();, React gives you an object with a .Provider property.

// Purpose:
// <AuthContext.Provider> wraps your components and supplies the context value (like user, login, logout) to all its children.

// Summary:
// .Provider is the component you use to share context data with the component tree below it.

// what is createcontext and usecontext for

// createContext and useContext are React hooks for sharing state or functions globally across components.

// createContext creates a context object to hold shared data.
// useContext lets any component access that shared data from the nearest Provider.
// Summary:
// Use them to manage and access global state (like authentication) without prop drilling.

//note: .Provider is deprecated, should be able to omit - copilot still thinks needs to be used