import React, { useState } from "react";
import Navbar from "./Navbar";

const suggestions = [
  "Is paying registration fee safe?",
  "How do I improve my resume?",
  "Is WhatsApp hiring suspicious?",
  "How can I detect fake recruiters?",
];

const Chatbot = () => {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async (customMessage = null) => {
    const finalMessage = customMessage || message;

    if (!finalMessage.trim()) return;

    // USER MESSAGE
    const updatedChat = [
      ...chat,
      {
        sender: "user",
        text: finalMessage,
      },
    ];

    setChat(updatedChat);

    setLoading(true);

    try {
      // ======================================
      // 🤖 BACKEND AI CALL
      // ======================================
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/chatbot/ask`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: finalMessage,
          }),
        }
      );

      const data = await res.json();

      console.log("CHATBOT RESPONSE:", data);

      // ======================================
      // AI MESSAGE
      // ======================================
      setChat([
        ...updatedChat,
        {
          sender: "ai",
          text:
            data.reply ||
            "AI could not respond.",
        },
      ]);

    } catch (error) {
      console.error(error);

      setChat([
        ...updatedChat,
        {
          sender: "ai",
          text: "Server error",
        },
      ]);
    }

    setLoading(false);

    setMessage("");
  };

  // =========================
  // ENTER KEY
  // =========================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-luxury-bg transition-colors duration-500 flex flex-col items-center p-8">

        {/* HEADER */}
        <div className="w-full max-w-4xl mb-6">

          <h1 className="text-5xl font-bold text-luxury-ink">
            AI Career Assistant
          </h1>

          <p className="text-luxury-body mt-2 text-lg">
            Get AI-powered career guidance, resume help, interview tips, and scam protection
          </p>

        </div>

        {/* SUGGESTIONS */}
        <div className="w-full max-w-4xl flex flex-wrap gap-3 mb-6">

          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => sendMessage(item)}
              className="bg-luxury-surface border hover:bg-luxury-muted transition px-4 py-2 rounded-full text-sm shadow-sm"
            >
              {item}
            </button>
          ))}

        </div>

        {/* CHAT BOX */}
        <div className="w-full max-w-4xl bg-luxury-surface rounded-3xl shadow-xl flex flex-col h-[70vh]">

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {chat.length === 0 ? (
              <div className="text-center mt-20 text-luxury-caption">

                <h2 className="text-2xl mb-4">
                  🤖 AI Assistant Ready
                </h2>

                <p>
                  Start chatting to get career safety guidance
                </p>

              </div>
            ) : (
              chat.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-sm ${
                      msg.sender === "user"
                        ? "bg-luxury-accent text-luxury-on-accent"
                        : "bg-luxury-muted text-luxury-ink"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>
              ))
            )}

            {/* LOADING */}
            {loading && (
              <div className="flex justify-start">

                <div className="bg-luxury-muted px-5 py-4 rounded-3xl shadow-sm text-luxury-body animate-pulse">
                  🤖 VerifyCareers AI is typing...
                </div>

              </div>
            )}

          </div>

          {/* INPUT */}
          <div className="p-4 border-t flex gap-4">

            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-luxury-accent/20"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={() => sendMessage()}
              className="bg-luxury-accent hover:bg-luxury-accent text-luxury-on-accent px-8 py-4 rounded-2xl transition"
            >
              Send
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default Chatbot;