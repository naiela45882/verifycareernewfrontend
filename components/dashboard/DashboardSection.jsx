import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";

export default function DashboardSection({
  title,
  subtitle,
  action,
  className,
  children,
  id,
}) {
  return (
    <section id={id} className={cn(className)}>
      {(title || subtitle || action) && (
        <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-luxury-ink">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-[13px] text-luxury-body">{subtitle}</p>
            )}
          </div>
          {action && (
            <Link
              to={action.to}
              className="inline-flex items-center gap-1 text-[13px] font-medium text-luxury-accent transition-colors hover:text-luxury-accent-hover"
            >
              {action.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
