import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

const FAQS = [
  {
    q: "How do I upload my resume?",
    a: "Go to Resume Hub → Primary Resume, or use Upload Resume on your dashboard. We store one primary PDF so you can run ATS scoring and job matching without re-uploading each time.",
  },
  {
    q: "How does offer letter verification work?",
    a: "Open Trust Intelligence → Offer Letter Scan, paste your offer text. We show a scam risk score (higher = more dangerous), red flags in your text, and linked intelligence from our graph. You can publish to Scam Reports with your name or anonymously.",
  },
  {
    q: "What is the difference between scam risk and trust rating?",
    a: "Scam risk applies to a document you scan (offer letter or recruiter message). Trust rating applies to entities in our graph (companies, domains, emails) over time. The Signal feed shows recent community warnings and reassurances.",
  },
  {
    q: "What is the ATS score?",
    a: "ATS (Applicant Tracking System) score measures how well your resume is structured and keyword-aligned for a role. Run Tailor to Job with a job description for a detailed score and suggestions.",
  },
  {
    q: "Is my data private?",
    a: "Your resume and scans are tied to your account and protected by secure sign-in. Community posts can be published anonymously when you choose that option.",
  },
  {
    q: "Can I compare my resume to a job description?",
    a: "Yes. Use Job Comparison or Resume Hub → Tailor to Job. Paste the job description and we match it against your stored resume for fit, missing skills, and improvements.",
  },
];

export default function SettingsFaqs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-lg border border-luxury-border bg-luxury-muted/20"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-luxury-muted/40"
            >
              <span className="text-[13px] font-medium text-luxury-ink">
                {faq.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-luxury-caption transition-transform",
                  open && "rotate-180"
                )}
              />
            </button>
            {open && (
              <p className="border-t border-luxury-border px-4 py-3 text-[13px] leading-relaxed text-luxury-body">
                {faq.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
