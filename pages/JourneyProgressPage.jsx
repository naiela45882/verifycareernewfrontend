import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useSkillJourney } from "../hooks/useSkillJourney";
import NeedleProgress from "../components/dashboard/NeedleProgress";

export default function JourneyProgressPage() {
  const { journey, loading, addProgressNote } = useSkillJourney();
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) {
    return <div className="mx-auto max-w-2xl h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!journey) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[13px] text-luxury-body">Start your journey to track progress.</p>
        <Link to="/journey/target" className="mt-2 inline-block text-luxury-accent hover:underline">
          Set target role
        </Link>
      </div>
    );
  }

  const handleNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);
    try {
      await addProgressNote(note.trim());
      setNote("");
      toast.success("Note saved");
    } catch (err) {
      toast.error(err.message || "Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        to="/journey"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-luxury-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Overview
      </Link>

      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Progress tracker
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Completion, streak, and learning notes.
        </p>
      </header>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
              Completion
            </p>
            <p className="mt-1 text-2xl font-semibold text-luxury-accent">
              {journey.completionPercent}%
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
              Weekly streak
            </p>
            <p className="mt-1 text-2xl font-semibold text-luxury-ink">
              {journey.weeklyStreak} {journey.weeklyStreak === 1 ? "day" : "days"}
            </p>
          </div>
        </div>
        <NeedleProgress percent={journey.completionPercent} showPercent={false} />
      </section>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-4">
        <h2 className="text-[15px] font-semibold text-luxury-ink">Save a note</h2>
        <form onSubmit={handleNote} className="space-y-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="What did you learn this week?"
            className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink"
          />
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-luxury-accent px-4 py-2 text-[13px] font-medium text-luxury-on-accent disabled:opacity-60"
          >
            Add note
          </button>
        </form>

        <div className="space-y-3 border-t border-luxury-border pt-4">
          {(journey.progressNotes || []).length === 0 ? (
            <p className="text-[13px] text-luxury-caption">No notes yet.</p>
          ) : (
            [...journey.progressNotes]
              .reverse()
              .map((n, i) => (
                <blockquote
                  key={`${n.createdAt}-${i}`}
                  className="rounded-lg border border-luxury-border/60 bg-luxury-muted/20 px-3 py-2 text-[13px] text-luxury-body"
                >
                  {n.text}
                  <footer className="mt-1 text-[11px] text-luxury-caption">
                    {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                  </footer>
                </blockquote>
              ))
          )}
        </div>
      </section>
    </div>
  );
}
