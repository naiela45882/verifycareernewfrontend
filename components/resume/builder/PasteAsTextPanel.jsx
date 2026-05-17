import { useState } from "react";
import { ClipboardPaste, Loader2, X } from "lucide-react";
import {
  builderBtnGhost,
  builderBtnPrimary,
  builderBtnSecondary,
  builderInput,
} from "./builderTheme";

export default function PasteAsTextPanel({ onApply, disabled, busy = false }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setApplying(true);
    try {
      await onApply(trimmed);
      setText("");
      setOpen(false);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="mb-4 shrink-0">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-luxury-ink">Build your resume</p>
        <button
          type="button"
          disabled={disabled || applying || busy}
          onClick={() => setOpen((o) => !o)}
          className={builderBtnSecondary}
        >
          {applying ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ClipboardPaste className="h-4 w-4" />
          )}
          Paste as text
        </button>
      </div>

      {open && (
        <div className="mt-3 space-y-2 rounded-lg border border-luxury-border bg-luxury-muted/25 p-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs text-luxury-body">
              Paste your resume text below. We will parse it into the form fields.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 text-luxury-caption hover:text-luxury-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Paste your full resume here…"
            className={`${builderInput} resize-y`}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={applying || !text.trim()}
              onClick={handleApply}
              className={builderBtnPrimary}
            >
              {applying ? "Parsing…" : "Apply to resume"}
            </button>
            <button
              type="button"
              disabled={applying}
              onClick={() => setOpen(false)}
              className={builderBtnGhost}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
