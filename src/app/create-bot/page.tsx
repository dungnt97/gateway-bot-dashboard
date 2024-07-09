"use client";

import React, { useState } from "react";
import axios from "axios";

const botTypes = {
  TRADING: "trading",
  CASHOUT: "cashout",
};

const CreateBotPage = () => {
  const [secretKey, setSecretKey] = useState("");
  const [type, setType] = useState(botTypes.TRADING);
  const [firstMintToken, setFirstMintToken] = useState("");
  const [secondMintToken, setSecondMintToken] = useState("");
  const [firstTradePrice, setFirstTradePrice] = useState("0");
  const [targetGainPercentage, setTargetGainPercentage] = useState("0");
  const [initialInputAmount, setInitialInputAmount] = useState("0");
  const [expires, setExpires] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/bot",
        {
          secretKey,
          type,
          firstMintToken,
          secondMintToken,
          firstTradePrice,
          targetGainPercentage,
          initialInputAmount,
          expires,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Bot created:", response.data);
      setAlertMessage("Bot created successfully!");
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Error creating bot:", error);
      setAlertMessage("Error creating bot. Please try again.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-green-500">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create Bot</h1>
        {showAlert && (
          <div
            className={`mb-4 p-4 rounded-md ${
              alertType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="secretKey" className="block font-bold mb-2">
              Secret Key:
            </label>
            <input
              type="text"
              id="secretKey"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block font-bold mb-2">
              Type:
            </label>
            <select
              id="type"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value={botTypes.TRADING}>Trading</option>
              <option value={botTypes.CASHOUT}>Cashout</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="firstMintToken" className="block font-bold mb-2">
              First Mint Token:
            </label>
            <input
              type="text"
              id="firstMintToken"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={firstMintToken}
              onChange={(e) => setFirstMintToken(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="secondMintToken" className="block font-bold mb-2">
              Second Mint Token:
            </label>
            <input
              type="text"
              id="secondMintToken"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={secondMintToken}
              onChange={(e) => setSecondMintToken(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstTradePrice" className="block font-bold mb-2">
              First Trade Price:
            </label>
            <input
              type="text"
              id="firstTradePrice"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={firstTradePrice}
              onChange={(e) => setFirstTradePrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="targetGainPercentage"
              className="block font-bold mb-2"
            >
              Target Gain Percentage:
            </label>
            <input
              type="text"
              id="targetGainPercentage"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={targetGainPercentage}
              onChange={(e) => setTargetGainPercentage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="initialInputAmount"
              className="block font-bold mb-2"
            >
              Initial Input Amount:
            </label>
            <input
              type="text"
              id="initialInputAmount"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={initialInputAmount}
              onChange={(e) => setInitialInputAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expires" className="block font-bold mb-2">
              Expires:
            </label>
            <input
              type="datetime-local"
              id="expires"
              className="bg-gray-700 text-white p-2 rounded-md w-full"
              value={expires.toISOString().slice(0, 16)}
              onChange={(e) => setExpires(new Date(e.target.value))}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Create Bot
          </button>
          <a
            href="/bot-list"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Back to bot list
          </a>
        </form>
      </div>
    </div>
  );
};

export default CreateBotPage;
