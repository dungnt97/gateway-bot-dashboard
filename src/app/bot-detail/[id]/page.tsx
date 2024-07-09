"use client";

import LogDetails from "@/components/logDetails";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const BotDetails = (props: any) => {
  const { id } = props.params;
  const [bot, setBot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [runBot, setRunBot] = useState<any>(null);
  const [logs, setLogs] = useState<[]>([]);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const fetchBotDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("You must be logged in to view bot details.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://gateway-bot-2fe620caabf4.herokuapp.com/v1/bot/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setBot(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching bot details. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };
    fetchBotDetails();
  }, [id]);

  useEffect(() => {
    const fetchLogsByBot = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setError("You must be logged in to view bot details.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://gateway-bot-2fe620caabf4.herokuapp.com/v1/log/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching bot details. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchLogsByBot();

    const interval = setInterval(fetchLogsByBot, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [id]);

  const run = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("You must be logged in to view bot details.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `https://gateway-bot-2fe620caabf4.herokuapp.com/v1/bot/${id}/run`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setRunBot(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching bot details. Please try again later.");
      setLoading(false);
      console.error(err);
    }
  };

  const expire = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("You must be logged in to view bot details.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `https://gateway-bot-2fe620caabf4.herokuapp.com/v1/bot/${id}/expire`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setRunBot(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching bot details. Please try again later.");
      setLoading(false);
      console.error(err);
    }
  };

  console.log(logs);

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col items-center justify-center h-screen text-white">
        {loading ? (
          <p className="text-2xl font-bold">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-2xl font-bold">{error}</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
            <h1 className="text-3xl font-bold mb-4 text-black">{bot.name}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-black">Type:</p>
                <p className="text-black">{bot.type}</p>
              </div>
              <div>
                <p className="font-bold text-black">First Mint Token:</p>
                <p className="text-black">{bot.firstMintToken}</p>
              </div>
              <div>
                <p className="font-bold text-black">Second Mint Token:</p>
                <p className="text-black">{bot.secondMintToken}</p>
              </div>
              <div>
                <p className="font-bold text-black">First Trade Price:</p>
                <p className="text-black">{bot.firstTradePrice}</p>
              </div>
              <div>
                <p className="font-bold text-black">Target Gain Percentage:</p>
                <p className="text-black">{bot.targetGainPercentage}</p>
              </div>
              <div>
                <p className="font-bold text-black">Initial Input Amount:</p>
                <p className="text-black">{bot.initialInputAmount}</p>
              </div>
              <div>
                <p className="font-bold text-black">Expires:</p>
                <p className="text-black">{bot.expires}</p>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => run()}
              >
                Run Bot
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => expire()}
              >
                Expire Bot
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Update Bot
              </button>
              <a
                href="/bot-list"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Back to bot list
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-y-scroll w-96 h-96" ref={scrollViewRef}>
        <div className="p-6 space-y-6">
          {logs.map((log, index) => (
            <LogDetails key={index} log={log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotDetails;
