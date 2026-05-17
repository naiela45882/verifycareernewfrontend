import { cn } from "../../lib/cn";

export default function GlassPanel({ children, className = "", as: Tag = "div", ...props }) {
  return (
    <Tag className={cn("lp-glass rounded-2xl", className)} {...props}>
      {children}
    </Tag>
  );
}
