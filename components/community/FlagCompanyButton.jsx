import { useState } from "react";
import { cn } from "../../lib/cn";

export default function FlagCompanyButton({ onFlag, disabled }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const submit = async () => {
    await onFlag?.(reason);
    setOpen(false);
    setReason("");
  };

  if (!open) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        className="rounded-lg border border-luxury-coral/25 px-4 py-2 text-[13px] font-medium text-luxury-coral hover:bg-luxury-coral/5 disabled:opacity-50"
      >
        Report concern
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-luxury-coral/20 bg-luxury-coral/5 p-4 space-y-3">
      <p className="text-[13px] text-luxury-ink">Why are you flagging this company?</p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={2}
        className="w-full rounded-lg border border-luxury-border bg-luxury-surface px-3 py-2 text-[13px]"
      />
      <div className="flex gap-2">
        <button type="button" onClick={submit} className="rounded-lg bg-luxury-coral px-3 py-1.5 text-[12px] font-medium text-white">
          Submit flag
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-[12px] text-luxury-caption">
          Cancel
        </button>
      </div>
    </div>
  );
}
