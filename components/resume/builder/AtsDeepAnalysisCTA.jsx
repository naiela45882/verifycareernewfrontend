import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function AtsDeepAnalysisCTA() {
  return (
    <Link
      to="/resume/feedback"
      state={{ autoRun: true }}
      className="mt-3 flex items-center gap-2 rounded-lg border border-luxury-accent/30 bg-luxury-accent/5 px-3 py-2.5 text-sm font-medium text-luxury-accent transition-colors hover:bg-luxury-accent/10"
    >
      <Sparkles className="h-4 w-4 shrink-0" />
      Full AI ATS report
    </Link>
  );
}
