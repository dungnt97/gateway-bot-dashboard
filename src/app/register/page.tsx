"use client";

import axios from "axios";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/auth/register",
        {
          name,
          email,
          password,
        }
      );

      setAlert("Registration successful");
      window.location.replace("http://localhost:3001/login");
    } catch (error: any) {
      setError(error?.response?.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-green-500">
      {(error || alert) && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-${
            alert ? "green-500" : "red-500"
          } text-white px-4 py-2 rounded-md shadow-md z-50`}
        >
          {alert || error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-8 border border-green-500 rounded-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="bg-black border border-green-500 rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="bg-black border border-green-500 rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="bg-black border border-green-500 rounded w-full py-2 px-3 text-green-500 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <a
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1"
            href="/login"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
