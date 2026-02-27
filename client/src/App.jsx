import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
