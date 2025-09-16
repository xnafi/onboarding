import { Route, Routes } from "react-router";
import "./App.css";
import Hero from "./components/view/Hero/Hero";
import LoginPage from "./components/view/SignUp/SignUpPage";
import Onboarding from "./components/view/WebOnboarding/Onboarding";
import Dashboard from "./components/view/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/web-onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
