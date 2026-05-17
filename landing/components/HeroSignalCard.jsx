import { motion } from "framer-motion";
import GoldenGlobe from "./how-it-works/GoldenGlobe";

const queue = [
  {
    title: "Offer letter — registration fee",
    score: "78",
    label: "High scam risk",
    risk: true,
  },
  {
    title: "Recruiter — free email domain",
    score: "34",
    label: "Warnings",
    risk: true,
  },
  {
    title: "TCS offer — campus batch",
    score: "18",
    label: "Safer signal",
    risk: false,
  },
];

export default function HeroSignalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="lp-signal-card w-full max-w-md"
    >
      <div className="lp-signal-card__header">
        <span className="lp-label">Live platform activity</span>
        <span className="lp-live-badge">
          <span className="lp-live-dot" aria-hidden />
          Signal feed
        </span>
      </div>

      <div className="lp-signal-card__globe-row">
        <GoldenGlobe size={40} glow pulse />
        <p className="text-sm leading-snug text-ink-soft">
          Scam risk on scans, warnings on recruiters, and community signals — updated as you
          verify and publish.
        </p>
      </div>

      <ul className="lp-signal-card__list">
        {queue.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
            className="lp-signal-row"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-[var(--ink)]">{item.title}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-soft">
                {item.label}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p
                className="font-display text-lg font-semibold tabular-nums"
                style={{ color: item.risk ? "var(--coral)" : "var(--teal)" }}
              >
                {item.score}
              </p>
              <p className="text-[10px] text-ink-soft">/ 100 risk</p>
            </div>
          </motion.li>
        ))}
      </ul>

      <p className="lp-signal-card__footer">
        Publish evidence named or anonymous · browse every signal in the community feed.
      </p>
    </motion.div>
  );
}
