import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const VoiceAssistant = ({ onCommand }) => {
  const [response, setResponse] = useState("");

  const sendCommand = async (command) => {
    try {
      const res = await fetch("http://localhost:5000/voice-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      setResponse(data.response);
      onCommand(data.response);
    } catch (error) {
      console.error("Voice Assistant Error:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-full shadow-lg">
      <button
        onClick={() => sendCommand("overview")}
        className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white"
      >
        <FaMicrophone size={24} />
      </button>
      {response && <p className="text-white mt-2">{response}</p>}
    </div>
  );
};

export default VoiceAssistant;
