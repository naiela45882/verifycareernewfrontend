import React, { useState } from "react";

const FloatingChatbot = () => {

  const [open, setOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "Hi 👋 I'm VerifyCareers AI Assistant. How can I help you today?",
      },
    ]);

  const [input, setInput] =
    useState("");

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSend = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages([
      ...messages,
      userMessage,
    ]);

    setInput("");

    try {

      const res = await fetch(
        "https://verifycareers-backend.onrender.com/api/chatbot/ask",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: input,
          }),
        }
      );

      const data =
        await res.json();

      const botMessage = {
        sender: "bot",
        text:
          data.reply ||
          "AI could not respond.",
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Server error occurred.",
        },
      ]);
    }
  };

  return (
    <>

      {/* FLOATING BUTTON */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-luxury-accent hover:bg-luxury-accent-hover text-luxury-on-accent shadow-elevated flex items-center justify-center text-2xl z-50 transition-all duration-300"
      >
        🤖
      </button>

      {/* CHAT WINDOW */}
      {open && (

        <div className="fixed bottom-24 right-6 w-[370px] h-[550px] bg-luxury-surface rounded-3xl shadow-2xl border border-luxury-border flex flex-col overflow-hidden z-50">

          {/* HEADER */}
          <div className="bg-luxury-accent text-luxury-on-accent p-5">

            <h2 className="text-xl font-bold">
              VerifyCareers AI
            </h2>

            <p className="text-sm opacity-90">
              Career & Scam Protection Assistant
            </p>

          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-4 bg-luxury-muted space-y-4">

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender ===
                    "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender ===
                      "user"
                        ? "bg-luxury-accent text-luxury-on-accent rounded-br-md"
                        : "bg-luxury-surface text-luxury-ink border border-luxury-border rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              )
            )}

          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-luxury-border bg-luxury-surface flex gap-3">

            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              className="flex-1 border border-luxury-border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-luxury-accent/20"
            />

            <button
              onClick={
                handleSend
              }
              className="bg-luxury-accent hover:bg-luxury-accent-hover text-luxury-on-accent px-5 rounded-2xl transition-all duration-300"
            >
              Send
            </button>

          </div>

        </div>

      )}

    </>
  );
};

export default FloatingChatbot;