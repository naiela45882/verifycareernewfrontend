import { cn } from "../../lib/cn";

export function TrustPanel({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
  compact,
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-luxury-border bg-luxury-surface shadow-soft",
        className
      )}
    >
      {(title || description || action) && (
        <header
          className={cn(
            "flex flex-wrap items-start justify-between gap-2 border-b border-luxury-border/70",
            compact ? "px-4 py-3" : "px-5 py-4 sm:px-6"
          )}
        >
          <div className="min-w-0">
            {title && (
              <h2 className="text-[15px] font-semibold tracking-tight text-luxury-ink [&_svg]:shrink-0">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-luxury-body">
                {description}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className={cn(compact ? "p-4" : "p-5 sm:p-6", bodyClassName)}>{children}</div>
    </section>
  );
}

export function TrustSectionLabel({ children, className }) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.1em] text-luxury-caption",
        className
      )}
    >
      {children}
    </p>
  );
}

const MESSAGE_VARIANTS = {
  warn: "border-luxury-coral/25 bg-luxury-coral/[0.09] text-luxury-ink",
  safe: "border-luxury-accent/25 bg-luxury-accent/[0.09] text-luxury-ink",
  caution: "border-luxury-sun/30 bg-luxury-sun/[0.1] text-luxury-ink",
};

export function TrustMessageList({ items = [], variant = "warn", className }) {
  if (!items.length) return null;
  const itemClass = MESSAGE_VARIANTS[variant] ?? MESSAGE_VARIANTS.warn;

  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, i) => (
        <li
          key={item.nodeId || item.message || item || i}
          className={cn("rounded-lg border px-3 py-2.5 text-[13px] leading-snug", itemClass)}
        >
          {typeof item === "string" ? item : item.message}
        </li>
      ))}
    </ul>
  );
}

export function TrustInlineAlert({ children, variant = "caution", className }) {
  const styles = {
    caution: "border-luxury-sun/30 bg-luxury-sun/[0.1] text-luxury-ink",
    warn: "border-luxury-coral/25 bg-luxury-coral/[0.09] text-luxury-ink",
  };

  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border px-3 py-2.5 text-[12px] leading-snug",
        styles[variant] ?? styles.caution,
        className
      )}
    >
      {children}
    </p>
  );
}
