"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const BotList = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("You must be logged in to view bots.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://gateway-bot-2fe620caabf4.herokuapp.com/v1/bot",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBots(response.data.results);
        setLoading(false);
      } catch (err) {
        setError("Error fetching bots. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchBots();
  }, []);

  return (
    <div className="mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bot List</h1>
        <a
          href="/create-bot"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Bot
        </a>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {bots.map((bot: any) => (
            <li
              key={bot.id}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {bot.name}
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Id: {bot.id}</p>
                  <p>Type: {bot.type}</p>
                  <p>First Mint Token: {bot.firstMintToken}</p>
                  <p>Second Mint Token: {bot.secondMintToken}</p>
                  <p>First Trade Price: {bot.firstTradePrice}</p>
                  <p>Target Gain Percentage: {bot.targetGainPercentage}</p>
                  <p>Initial Input Amount: {bot.initialInputAmount}</p>
                  <p>Expires: {bot.expires}</p>
                </div>
                <div className="mt-4">
                  <a
                    href={`/bot-detail/${bot.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Go to details
                  </a>
                </div>
              </div>
              <div className="border-t border-gray-200" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BotList;
