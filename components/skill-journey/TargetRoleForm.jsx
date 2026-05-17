import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TARGET_ROLES } from "./constants";

const inputClass =
  "w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40";

export default function TargetRoleForm({ onSubmit, loading }) {
  const [targetRole, setTargetRole] = useState(TARGET_ROLES[0]);
  const [customRole, setCustomRole] = useState("");
  const [motivation, setMotivation] = useState("");
  const [expectedTimeline, setExpectedTimeline] = useState("6 months");

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = targetRole === "custom" ? customRole.trim() : targetRole;
    if (!role) return;
    onSubmit({ targetRole: role, motivation, expectedTimeline });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-4"
    >
      <h2 className="text-lg font-semibold text-luxury-ink">Define your target role</h2>
      <p className="text-[13px] text-luxury-body">
        We will map your resume to this goal and generate a starter roadmap (placeholder AI).
      </p>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          Target role
        </label>
        <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className={inputClass}>
          {TARGET_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
          <option value="custom">Custom role…</option>
        </select>
      </div>

      {targetRole === "custom" && (
        <div>
          <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            Custom role name
          </label>
          <input
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            className={inputClass}
            placeholder="e.g. UX Researcher"
            required
          />
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          Expected timeline
        </label>
        <input
          value={expectedTimeline}
          onChange={(e) => setExpectedTimeline(e.target.value)}
          className={inputClass}
          placeholder="6 months"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          Motivation (optional)
        </label>
        <textarea
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          rows={3}
          className={inputClass}
          placeholder="Why this role matters to you…"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Start skill journey
      </button>
    </form>
  );
}
