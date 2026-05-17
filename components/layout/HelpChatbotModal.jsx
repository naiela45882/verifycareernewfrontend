import { useState } from "react";
import { X, Send } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { authFetch } from "../../lib/api";
import { cn } from "../../lib/cn";

const INITIAL_MESSAGE = {
  sender: "bot",
  text: "Hi — I'm the VerifyCareers assistant. Ask about resumes, offer letters, or scam red flags.",
};

export default function HelpChatbotModal({ open, onClose }) {
  const { getToken } = useAuth();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setSending(true);

    try {
      const res = await authFetch(
        "/api/chatbot/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        },
        getToken
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "I couldn't generate a response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-luxury-ink/30 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-luxury-border bg-luxury-surface shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-luxury-border bg-luxury-accent px-5 py-4 text-luxury-on-accent">
          <ModalTitle />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 opacity-90 hover:bg-white/10"
            aria-label="Close help"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex max-h-[50vh] min-h-[280px] flex-col overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto bg-luxury-muted/40 p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                    msg.sender === "user"
                      ? "bg-luxury-accent text-luxury-on-accent"
                      : "border border-luxury-border bg-luxury-surface text-luxury-ink"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-luxury-border bg-luxury-surface p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something…"
              className="flex-1 rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="flex items-center justify-center rounded-lg bg-luxury-accent px-4 text-luxury-on-accent transition-colors hover:bg-luxury-accent-hover disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalTitle() {
  return (
    <div>
      <h2 className="text-[15px] font-semibold">Help Assistant</h2>
      <p className="text-[12px] opacity-90">Career & scam protection</p>
    </div>
  );
}
