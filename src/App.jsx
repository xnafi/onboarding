import { Route, Routes } from "react-router";
import "./App.css";
import Hero from "./components/view/Hero/Hero";
import LoginPage from "./components/view/SignUp/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
