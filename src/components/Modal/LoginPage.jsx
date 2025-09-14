import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Auth: username "forhadkhandev@gmail.com", password "123456"
    if (
      loginForm.username === "forhadkhandev" &&
      loginForm.password === "123456"
    ) {
      setLoginError("");
      onLogin();
    } else {
      setLoginError(
        "Invalid credentials. Try forhadkhandev@gmail.com / 123456."
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login Required</h2>
      <form onSubmit={handleLoginSubmit} className="mb-4">
        <input
          type="text"
          name="username"
          value={loginForm.username}
          onChange={handleLoginChange}
          placeholder="Username"
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleLoginChange}
          placeholder="Password"
          className="border p-2 w-full mb-2"
        />
        {loginError && <div className="text-red-500 mb-2">{loginError}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
