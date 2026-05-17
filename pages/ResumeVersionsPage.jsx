import { Link } from "react-router-dom";
import { useResume } from "../hooks/useResume";

export default function ResumeVersionsPage() {
  const { resume, hasResume, loading } = useResume();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-semibold text-luxury-ink">Resume Versions</h1>
      <p className="mt-2 text-[13px] text-luxury-body">
        Manage tailored copies of your resume for different roles.
      </p>

      <div className="mt-8 rounded-2xl border border-luxury-border/70 bg-luxury-surface/50 p-6">
        {loading ? (
          <p className="text-[13px] text-luxury-caption">Loading…</p>
        ) : hasResume ? (
          <ul className="space-y-3">
            <li className="flex items-center justify-between rounded-lg border border-luxury-border/60 px-4 py-3">
              <div>
                <p className="text-[14px] font-medium text-luxury-ink">Primary</p>
                <p className="text-[12px] text-luxury-caption">
                  {resume.fileName || "resume.pdf"}
                </p>
              </div>
              <span className="text-[11px] text-luxury-accent">Active</span>
            </li>
          </ul>
        ) : (
          <p className="text-[13px] text-luxury-body">
            No versions yet.{" "}
            <Link to="/resume" className="text-luxury-accent hover:underline">
              Upload your primary resume
            </Link>
            .
          </p>
        )}
      </div>

      <Link
        to="/resume"
        className="mt-6 inline-block text-[13px] font-medium text-luxury-accent hover:underline"
      >
        Manage primary resume →
      </Link>
    </div>
  );
}
