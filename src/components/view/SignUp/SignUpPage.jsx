import { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router";

export default function SignUpPage({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (
      loginForm.username === "forhadkhandev" &&
      loginForm.password === "123456"
    ) {
      setLoginError("");
      onLogin();
      navigate("/web-onboarding"); 
    } else {
      setLoginError("Invalid credentials. Try forhadkhandev / 123456.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-transparent">
      <div className="w-full max-w-md bg-transparent rounded-lg">
        {/* Logo */}
        <div className="flex h-full max-w-[410px] flex-col gap-y-4">
          <div className="flex items-center gap-2 mb-auto ">
            <img
              src={logo}
              alt="Logo"
              className="w-14 rounded-full h-14 bg-black"
            />
            <span className="text-xl font-bold ml-2 text-black">
              QuantumOS.ai
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">
            👋 Try Free Proposal Today{" "}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            sign up to continue to QuantumOS.ai
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-3"></div>

        {/* Email / Password */}
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div className="flex space-x-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={loginForm.firstName}
                onChange={handleLoginChange}
                placeholder="First Name"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={loginForm.lastName}
                onChange={handleLoginChange}
                placeholder="Last Name"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="phone number"
              value={loginForm.phone}
              onChange={handleLoginChange}
              placeholder="phone number"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={loginForm.username}
              onChange={handleLoginChange}
              placeholder="forhadkhandev"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex justify-between">
              <span>Password</span>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black sm:text-sm"
            />
          </div>

          {loginError && (
            <div className="text-red-500 text-sm mb-2">{loginError}</div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
