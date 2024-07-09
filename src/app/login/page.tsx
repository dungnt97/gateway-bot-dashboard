"use client";

import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/v1/auth/login", {
        email: email,
        password: password,
      });

      console.log("Login successful:", response.data.tokens);
      const { access, refresh } = response.data.tokens;
      // Lưu access token và refresh token vào trình duyệt (ví dụ: localStorage)
      localStorage.setItem("accessToken", access.token);
      localStorage.setItem("refreshToken", refresh.token);
      setAlertMessage("Login successful!");
      setAlertType("success");
      setShowAlert(true);
      window.location.replace("http://localhost:3001/bot-list");
    } catch (error) {
      console.error("Error logging in:", error);
      setAlertMessage("Error logging in. Please try again.");
      setAlertType("error");
      setShowAlert(true);
      // Xử lý lỗi khi đăng nhập không thành công
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-green-500">
      {showAlert && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-${
            alertType === "success" ? "green-500" : "red-500"
          } text-white px-4 py-2 rounded-md shadow-md z-50`}
        >
          {alertMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-8 border border-green-500 rounded-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border border-green-500 rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
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
            className="appearance-none border border-green-500 rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
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
            Login
          </button>
          <a
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-1"
            href="/register"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
