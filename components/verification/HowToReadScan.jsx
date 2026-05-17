import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export default function HowToReadScan({ className }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border border-luxury-border/80 bg-luxury-muted/20",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-[13px] font-medium text-luxury-ink"
      >
        How to read these results
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-luxury-caption transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul className="space-y-2 border-t border-luxury-border/60 px-4 py-3 text-[12px] text-luxury-body">
          <li>
            <strong className="text-luxury-ink">Scam risk</strong> — how dangerous this
            document looks (higher = worse).
          </li>
          <li>
            <strong className="text-luxury-ink">Red flags</strong> — specific problems found
            in the text you submitted.
          </li>
          <li>
            <strong className="text-luxury-ink">Linked intelligence</strong> — what we know
            about related recruiters, companies, and domains in our graph.
          </li>
          <li>
            <strong className="text-luxury-ink">Signal feed</strong> — recent community-wide
            warnings and reassurances (see Community in the sidebar).
          </li>
        </ul>
      )}
    </div>
  );
}

