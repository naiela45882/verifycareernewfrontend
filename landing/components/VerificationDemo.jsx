import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "../animations";
import { ShieldCheck, FileSearch } from "lucide-react";

function useCountUp(target, duration = 1600, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);

  return value;
}

function MetricBar({ label, value, active }) {
  return (
    <div>
      <div className="flex justify-between mb-2 text-[13px]">
        <span className="text-luxury-body">{label}</span>
        <span className="font-medium text-luxury-ink tabular-nums">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-luxury-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-luxury-accent/80"
          initial={{ width: 0 }}
          animate={{ width: active ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
}

export default function VerificationDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const resumeScore = useCountUp(84, 1600, inView);
  const compatScore = useCountUp(76, 1800, inView);
  const riskScore = useCountUp(12, 2000, inView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-[480px]"
    >
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="surface-card rounded-2xl p-6 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-luxury-border">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-luxury-caption mb-1">
              Analysis Preview
            </p>
            <h3 className="text-xl font-semibold tracking-luxury text-luxury-ink">
              Resume Match
            </h3>
            <p className="text-sm text-luxury-body mt-0.5">ATS compatibility review</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-luxury-caption mb-1">
              Match
            </p>
            <p className="text-3xl font-semibold tabular-nums text-luxury-ink tracking-luxury">
              {resumeScore}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <MetricBar label="Resume strength" value={resumeScore} active={inView} />
          <MetricBar label="Compatibility" value={compatScore} active={inView} />
        </div>

        <div className="surface-muted rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-luxury-surface border border-luxury-border flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-luxury-accent" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-luxury-ink">Verification status</p>
                <p className="text-xs text-luxury-body">Low risk indicators detected</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-luxury-caption">
                Risk score
              </p>
              <p className="text-xl font-semibold tabular-nums text-luxury-ink">{riskScore}%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-luxury-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-luxury-muted border border-luxury-border flex items-center justify-center">
              <FileSearch className="w-4 h-4 text-luxury-body" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-luxury-ink">AI Assistant</p>
              <p className="text-xs text-luxury-body max-w-[200px] leading-relaxed">
                Career insights and scam detection guidance.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-[12px] font-medium text-luxury-body border border-luxury-border rounded-lg px-3 py-1.5 bg-luxury-surface hover:text-luxury-ink hover:shadow-soft transition-all duration-300 whitespace-nowrap"
          >
            Assistant active
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
