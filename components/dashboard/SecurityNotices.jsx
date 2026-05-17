import { ShieldAlert } from "lucide-react";

const NOTICES = [
  {
    title: "Verify sender domains",
    body: "Recruiters using free email providers remain the top risk signal.",
  },
  {
    title: "Upfront payment requests",
    body: "Legitimate employers never require fees before onboarding.",
  },
];

export default function SecurityNotices() {
  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-4">
      <div className="mb-3 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-luxury-coral" strokeWidth={1.75} />
        <h3 className="text-[13px] font-semibold text-luxury-ink">
          Security Notices
        </h3>
      </div>
      <ul className="space-y-3">
        {NOTICES.map((n) => (
          <li
            key={n.title}
            className="rounded-lg border border-luxury-border/80 bg-luxury-muted/40 px-3 py-2.5"
          >
            <p className="text-[12px] font-medium text-luxury-ink">{n.title}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-luxury-body">
              {n.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
