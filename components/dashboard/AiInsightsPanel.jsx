import {
  AlertTriangle,
  TrendingUp,
  Bot,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../../lib/cn";

const INSIGHTS = [
  {
    icon: AlertTriangle,
    label: "Most Detected Scam",
    tag: "Alert",
    tagClass: "text-luxury-coral bg-luxury-coral/10 border-luxury-coral/20",
    body: "Telegram recruitment scams increased this week.",
  },
  {
    icon: TrendingUp,
    label: "Career Safety Score",
    tag: "Trend",
    tagClass: "text-luxury-accent bg-luxury-accent/10 border-luxury-accent/20",
    body: "Your analyzed offers appear safer than average.",
  },
  {
    icon: Bot,
    label: "AI Activity",
    tag: "Live",
    tagClass: "text-luxury-body bg-luxury-muted border-luxury-border",
    body: null,
  },
  {
    icon: ShieldCheck,
    label: "Weekly Recommendation",
    tag: "Tip",
    tagClass: "text-luxury-accent bg-luxury-accent/10 border-luxury-accent/20",
    body: "Always verify recruiter email domains before responding.",
  },
];

export default function AiInsightsPanel({ aiAnalyses }) {
  return (
    <aside
      id="insights"
      className="dashboard-insights flex flex-col rounded-xl border border-luxury-border bg-luxury-surface"
    >
      <header className="border-b border-luxury-border/80 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-luxury-ink">AI Insights</h2>
        <p className="mt-0.5 text-[12px] text-luxury-caption">
          Signals from your analysis activity
        </p>
      </header>
      <ul className="flex flex-col divide-y divide-luxury-border/60">
        {INSIGHTS.map((item) => {
          const Icon = item.icon;
          const text =
            item.label === "AI Activity"
              ? `${aiAnalyses} AI-powered analyses completed.`
              : item.body;

          return (
            <li key={item.label}>
              <div
                className={cn(
                  "insight-row group relative px-5 py-4 transition-colors duration-300",
                  "hover:bg-gradient-to-r hover:from-luxury-accent/[0.04] hover:to-transparent"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-luxury-muted/80 text-luxury-body transition-colors group-hover:text-luxury-accent">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13px] font-medium text-luxury-ink">
                        {item.label}
                      </p>
                      <span
                        className={cn(
                          "rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                          item.tagClass
                        )}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-luxury-body">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
