import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

const SUPPORT_EMAIL = "support@verifycareers.com";

export default function SettingsContact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      message || "Hi VerifyCareers team,\n\n"
    );
    const subj = encodeURIComponent(subject || "Support request");
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subj}&body=${body}`;
    toast.success("Opening your email app…");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactCard
          icon={Mail}
          label="Email"
          value={SUPPORT_EMAIL}
          href={`mailto:${SUPPORT_EMAIL}`}
        />
        <ContactCard
          icon={MapPin}
          label="Response time"
          value="Within 2 business days"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-[13px] text-luxury-body">
          Send us a message and we will get back to you as soon as we can.
        </p>
        <div>
          <label
            htmlFor="contact-subject"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="How can we help?"
            className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Describe your question or issue…"
            className="w-full resize-none rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent transition-colors hover:bg-luxury-accent-hover"
        >
          <Send className="h-4 w-4" />
          Send message
        </button>
      </form>
    </div>
  );
}

function ContactCard({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <Icon className="h-4 w-4 text-luxury-accent" strokeWidth={1.75} />
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          {label}
        </p>
        <p className="mt-0.5 text-[13px] font-medium text-luxury-ink">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-start gap-3 rounded-lg border border-luxury-border bg-luxury-muted/20 p-4 transition-colors hover:border-luxury-accent/25"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-luxury-border bg-luxury-muted/20 p-4">
      {content}
    </div>
  );
}
