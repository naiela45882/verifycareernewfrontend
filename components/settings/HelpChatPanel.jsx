import { useState } from "react";
import { Send } from "lucide-react";
import { useAuthedFetch } from "../../hooks/useAuthedFetch";
import { cn } from "../../lib/cn";

const INITIAL_MESSAGE = {
  sender: "bot",
  text: "Hi — I'm the VerifyCareers assistant. Ask about resumes, offer letters, or scam red flags.",
};

export default function HelpChatPanel({ className }) {
  const authedFetch = useAuthedFetch();
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setSending(true);

    try {
      const res = await authedFetch("/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
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
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-luxury-border bg-luxury-muted/30",
        className
      )}
    >
      <div className="flex max-h-[360px] min-h-[280px] flex-1 flex-col space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              msg.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <ChatBubble msg={msg} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-luxury-border bg-luxury-surface p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about resumes, scams, or job offers…"
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
  );
}

function ChatBubble({ msg }) {
  return (
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
  );
}
