import { useState } from "react";
import { Link } from "react-router-dom";
import { GitCompare, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useResume } from "./hooks/useResume";

export default function JobCompare() {
  const { hasResume, loading, analyzeResume } = useResume();
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    if (!hasResume) {
      toast.error("Upload a resume on the dashboard first");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Paste a job description");
      return;
    }

    setAnalyzing(true);
    setResult(null);
    try {
      const data = await analyzeResume(jobDescription);
      setResult(data);
    } catch {
      toast.error("Comparison failed");
    } finally {
      setAnalyzing(false);
    }
  };

  const legitimacy =
    result?.matchScore >= 70
      ? "Strong match — likely a credible fit"
      : result?.matchScore >= 45
        ? "Moderate match — address gaps before applying"
        : result
          ? "Weak match — significant skill gaps"
          : null;

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-luxury-accent">
          <GitCompare className="h-5 w-5" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
            Job Comparison
          </span>
        </div>
        <h2 className="text-xl font-semibold text-luxury-ink">
          Job Description vs Resume
        </h2>
        <p className="mt-1 text-[13px] text-luxury-body">
          Uses your stored resume to score alignment, surface missing skills, and
          estimate candidate fit.
        </p>
      </header>

      {!loading && !hasResume && (
        <div className="mb-4 rounded-lg border border-luxury-coral/30 bg-luxury-coral/5 px-4 py-3 text-[13px] text-luxury-body">
          No resume on file.{" "}
          <Link to="/dashboard" className="font-medium text-luxury-accent hover:underline">
            Upload on the dashboard
          </Link>{" "}
          first.
        </div>
      )}

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the full job description here…"
        rows={10}
        className="w-full rounded-xl border border-luxury-border bg-luxury-surface px-4 py-3 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
      />

      <button
        type="button"
        onClick={handleCompare}
        disabled={analyzing || loading || !hasResume}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-60"
      >
        {analyzing && <Loader2 className="h-4 w-4 animate-spin" />}
        Compare with my resume
      </button>

      {result && (
        <div className="mt-8 space-y-4 rounded-xl border border-luxury-border bg-luxury-surface p-5">
          <CompareScores result={result} legitimacy={legitimacy} />
          {result.missingSkills?.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-luxury-ink">Missing skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.missingSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-luxury-coral/25 bg-luxury-coral/8 px-2 py-1 text-[12px] text-luxury-coral"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.suggestions?.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-luxury-ink">Improvements</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-[13px] text-luxury-body">
                {result.suggestions.slice(0, 5).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CompareScores({ result, legitimacy }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <ScoreBlock label="Match score" value={`${result.matchScore}%`} />
      <ScoreBlock label="ATS score" value={`${result.atsScore}%`} />
      <ScoreBlock label="Candidate fit" value={legitimacy} small />
    </div>
  );
}

function ScoreBlock({ label, value, small }) {
  return (
    <div className="rounded-lg border border-luxury-border bg-luxury-muted/30 p-4 text-center">
      <p className="text-[11px] uppercase tracking-wide text-luxury-caption">{label}</p>
      <p
        className={
          small
            ? "mt-1 text-[12px] font-medium leading-snug text-luxury-ink"
            : "mt-1 text-2xl font-semibold tabular-nums text-luxury-ink"
        }
      >
        {value}
      </p>
    </div>
  );
}
