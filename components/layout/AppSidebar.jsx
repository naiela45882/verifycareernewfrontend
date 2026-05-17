import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { cn } from "../../lib/cn";
import { NAV_GROUPS, isNavActive } from "./navConfig";
import { useSidebar } from "./SidebarContext";

export default function AppSidebar() {
  const { pathname, hash } = useLocation();
  const { collapsed, mobileOpen, toggle, closeMobile } = useSidebar();

  return (
    <aside
      className={cn(
        "app-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-luxury-border bg-luxury-surface shadow-[4px_0_24px_var(--vc-shadow)] transition-[width,transform] duration-300 ease-luxury",
        collapsed ? "w-[68px]" : "w-[240px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <SidebarHeader
        collapsed={collapsed}
        closeMobile={closeMobile}
        onToggle={toggle}
      />

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {NAV_GROUPS.map((group) => (
          <div
            key={group.label}
            className={cn("mb-5", collapsed ? "px-2" : "px-3")}
          >
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-luxury-caption">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isNavActive(item, pathname, hash);
                const Icon = item.icon;

                return (
                  <li key={`${group.label}-${item.label}`} className="relative">
                    {active && (
                      <motion.span
                        layoutId="sidebar-needle"
                        className="sidebar-needle absolute left-0 top-1/2 z-10 h-5 w-[2px] -translate-y-1/2 rounded-full bg-luxury-accent shadow-[0_0_8px_var(--vc-teal)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <Link
                      to={item.to}
                      onClick={closeMobile}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg py-2 text-[13px] font-medium transition-colors duration-200",
                        collapsed ? "justify-center px-0" : "px-3",
                        active
                          ? "bg-luxury-muted text-luxury-ink"
                          : "text-luxury-body hover:bg-luxury-muted/70 hover:text-luxury-ink"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0 transition-colors",
                          active
                            ? "text-luxury-accent"
                            : "text-luxury-caption group-hover:text-luxury-body"
                        )}
                        strokeWidth={1.75}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function SidebarHeader({ collapsed, closeMobile, onToggle }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center border-b border-luxury-border bg-luxury-muted/30",
        collapsed
          ? "h-auto flex-col justify-center gap-1 py-3"
          : "h-14 justify-between gap-2 px-3"
      )}
    >
      <Link
        to="/dashboard"
        onClick={closeMobile}
        className={cn(
          "font-display font-semibold tracking-luxury text-luxury-ink transition-opacity hover:opacity-80",
          collapsed ? "text-lg" : "min-w-0 truncate text-lg"
        )}
        title="VerifyCareers"
      >
        {collapsed ? (
          <span className="text-luxury-accent">V</span>
        ) : (
          <>
            Verify<span className="text-luxury-accent">Careers</span>
          </>
        )}
      </Link>

      <button
        type="button"
        onClick={onToggle}
        className="shrink-0 rounded-lg p-1.5 text-luxury-caption transition-colors hover:bg-luxury-muted/60 hover:text-luxury-ink"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeft className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
