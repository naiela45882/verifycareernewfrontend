import { cn } from "../../lib/cn";

export default function ResumeEditor({
  value,
  onChange,
  placeholder = "Paste or type your resume text…",
  rows = 16,
  className,
  readOnly = false,
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readOnly}
      rows={rows}
      placeholder={placeholder}
      className={cn(
        "w-full resize-y rounded-lg border border-luxury-border bg-luxury-muted/30 px-4 py-3 font-mono text-[13px] leading-relaxed text-luxury-ink outline-none focus:border-luxury-accent/40",
        readOnly && "cursor-default opacity-90",
        className
      )}
    />
  );
}
