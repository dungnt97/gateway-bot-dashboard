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

      setRunBot("Run bot successfully");
      setLoading(false);
    } catch (err) {
      setError(`Error when running bot:  ${err}`);
      setLoading(false);
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

      setRunBot("Expire bot successfully");
      setLoading(false);
    } catch (err) {
      setError(`Error when expire bot:  ${err}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col items-center justify-center h-screen text-white">
        {loading ? (
          <p className="text-2xl font-bold">Loading...</p>
        ) : (
          <>
            {error && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}
            {runBot && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{runBot}</span>
                </div>
              </div>
            )}
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
                  <p className="font-bold text-black">
                    Target Gain Percentage:
                  </p>
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
          </>
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
