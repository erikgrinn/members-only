import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import LogInPage from "./components/LogInPage";
import SecretPage from "./components/SecretPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/secret-page" element={<SecretPage />} />
      </Routes>
    </>
  );
}

export default App;
