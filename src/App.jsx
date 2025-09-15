import { Route, Routes } from "react-router";
import "./App.css";
import Hero from "./components/view/Hero/Hero";
import LoginPage from "./components/view/SignUp/SignUpPage";
import Onboarding from "./components/view/WebOnboarding/Onboarding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/web-onboarding" element={<Onboarding />} />
      </Routes>
    </>
  );
}

export default App;
