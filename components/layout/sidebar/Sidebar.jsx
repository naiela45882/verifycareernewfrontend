import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, PanelLeft, PanelLeftClose } from "lucide-react";
import { cn } from "../../../lib/cn";
import { useSidebar } from "../SidebarContext";
import {
  SIDEBAR_SECTIONS,
  isGroupActive,
  isPathActive,
} from "./sidebarConfig";

function navItemClass({ active, open, parentOfActive }) {
  return cn(
    "sidebar-nav-item",
    active && "sidebar-nav-item--active",
    open && !active && !parentOfActive && "sidebar-nav-item--open",
    parentOfActive && !active && "sidebar-nav-item--parent"
  );
}

export default function Sidebar() {
  const { pathname, hash } = useLocation();
  const { collapsed, toggle, mobileOpen, closeMobile } = useSidebar();
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries(
      SIDEBAR_SECTIONS.flatMap((s) => s.items)
        .filter((i) => i.children)
        .map((i) => [i.id, isGroupActive(pathname, hash, i)])
    )
  );

  const toggleGroup = (id) => {
    if (collapsed) return;
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (collapsed) return;
    setOpenGroups(
      Object.fromEntries(
        SIDEBAR_SECTIONS.flatMap((s) => s.items)
          .filter((i) => i.children)
          .map((i) => [i.id, isGroupActive(pathname, hash, i)])
      )
    );
  }, [pathname, hash, collapsed]);

  return (
    <aside
      className={cn(
        "app-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-luxury-border/80 shadow-[4px_0_28px_var(--vc-shadow)] transition-[width,transform] duration-300 ease-luxury",
        collapsed ? "app-sidebar--collapsed w-[68px]" : "w-[240px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center border-b border-luxury-border/70",
          collapsed
            ? "flex-col justify-center gap-2 py-3"
            : "h-14 justify-between gap-2 px-3"
        )}
      >
        <Link
          to="/dashboard"
          onClick={closeMobile}
          className={cn(
            collapsed
              ? "app-sidebar__brand"
              : "min-w-0 truncate font-display text-lg font-semibold tracking-luxury text-luxury-ink transition-opacity hover:opacity-80"
          )}
          title="VerifyCareers"
        >
          {collapsed ? (
            "V"
          ) : (
            <>
              Verify<span className="text-luxury-accent">Careers</span>
            </>
          )}
        </Link>
        <button
          type="button"
          onClick={toggle}
          className="app-sidebar__toggle"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <PanelLeftClose className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        {SIDEBAR_SECTIONS.map((section, sectionIndex) => (
          <div key={section.id}>
            {!collapsed && (
              <p
                className={cn(
                  "sidebar-section-label",
                  sectionIndex > 0 && "mt-5"
                )}
              >
                {section.label}
              </p>
            )}
            {collapsed && sectionIndex > 0 && (
              <div className="app-sidebar__divider" aria-hidden />
            )}
            <ul className="sidebar-nav-list">
              {section.items.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  item={item}
                  collapsed={collapsed}
                  pathname={pathname}
                  hash={hash}
                  open={openGroups[item.id]}
                  onToggleGroup={() => toggleGroup(item.id)}
                  onNavigate={closeMobile}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function SidebarNavItem({
  item,
  collapsed,
  pathname,
  hash,
  open,
  onToggleGroup,
  onNavigate,
}) {
  const Icon = item.icon;
  const groupActive = isGroupActive(pathname, hash, item);

  if (!item.children) {
    const isActive =
      item.to === "/settings"
        ? pathname.startsWith("/settings")
        : isPathActive(pathname, hash, item.to);

    return (
      <li
        className={cn(
          "sidebar-nav-row",
          isActive && "sidebar-nav-row--active"
        )}
      >
        <Link
          to={item.to}
          onClick={onNavigate}
          title={collapsed ? item.label : undefined}
          className={navItemClass({ active: isActive })}
        >
          <Icon className="sidebar-nav-item__icon" strokeWidth={1.75} />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </Link>
      </li>
    );
  }

  const firstChild = item.children[0];
  const firstChildTo = firstChild.hash
    ? `${firstChild.to}${firstChild.hash}`
    : firstChild.to;

  if (collapsed) {
    return (
      <li
        className={cn(
          "sidebar-nav-row",
          groupActive && "sidebar-nav-row--active"
        )}
      >
        <Link
          to={firstChildTo}
          onClick={onNavigate}
          title={item.label}
          className={navItemClass({ active: groupActive })}
        >
          <Icon className="sidebar-nav-item__icon" strokeWidth={1.75} />
        </Link>
      </li>
    );
  }

  return (
    <li className="sidebar-nav-group">
      <button
        type="button"
        onClick={onToggleGroup}
        aria-expanded={open}
        className={navItemClass({
          active: false,
          open,
          parentOfActive: groupActive,
        })}
      >
        <Icon className="sidebar-nav-item__icon" strokeWidth={1.75} />
        <span className="flex-1 truncate text-left">{item.label}</span>
        <ChevronDown
          className={cn(
            "sidebar-nav-item__chevron",
            open && "sidebar-nav-item__chevron--open"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="sidebar-nav-children"
          >
            {item.children.map((child) => {
              const childTo = child.hash ? `${child.to}${child.hash}` : child.to;
              const childActive = isPathActive(
                pathname,
                hash,
                child.to,
                child.hash
              );

              return (
                <li
                  key={child.label}
                  className={cn(
                    "sidebar-nav-row sidebar-nav-row--child",
                    childActive && "sidebar-nav-row--active"
                  )}
                >
                  <Link
                    to={childTo}
                    onClick={onNavigate}
                    className={cn(
                      "sidebar-child-link",
                      childActive && "sidebar-child-link--active"
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
