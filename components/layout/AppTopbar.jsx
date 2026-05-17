import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { cn } from "../../lib/cn";
import { getPageMeta } from "./sidebar/sidebarConfig";
import { useLoginTimer } from "../../hooks/useLoginTimer";
import { useDashboardData } from "../../hooks/useDashboardData";
import HelpChatbotModal from "./HelpChatbotModal";
import ThemeAndPwaControls from "../ThemeAndPwaControls";

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function AppTopbar() {
  const { pathname, hash } = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { toggleMobile } = useSidebar();
  const seconds = useLoginTimer();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const { title, breadcrumb } = getPageMeta(pathname, hash);

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Account";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initials =
    user?.firstName?.[0] ||
    user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ||
    "U";

  return (
    <>
      <header
        className={cn(
          "app-topbar sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-luxury-border bg-luxury-surface/90 px-4 backdrop-blur-xl transition-shadow duration-300 sm:px-6",
          scrolled && "shadow-soft"
        )}
      >
        <button
          type="button"
          onClick={toggleMobile}
          className="rounded-lg p-2 text-luxury-body transition-colors hover:bg-luxury-muted/60 hover:text-luxury-ink lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>

        {pathname === "/dashboard" ? (
          <DashboardPageTitle breadcrumb={breadcrumb} />
        ) : (
          <PageTitle title={title} breadcrumb={breadcrumb} />
        )}

        <div className="hidden items-center gap-3 sm:flex">
          <span className="truncate text-[13px] font-medium text-luxury-ink">
            {displayName}
          </span>
          <span className="rounded-md border border-luxury-border bg-luxury-muted/40 px-2 py-1 font-mono text-[11px] tabular-nums text-luxury-caption">
            {seconds}s
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <ThemeAndPwaControls className="mr-1 hidden sm:flex" />
          <div ref={notificationsRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((o) => !o);
                setProfileOpen(false);
              }}
              className={cn(
                "relative rounded-lg p-2 text-luxury-body transition-colors hover:bg-luxury-muted/60 hover:text-luxury-ink",
                notificationsOpen && "bg-luxury-muted/60 text-luxury-ink"
              )}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-xl border border-luxury-border bg-luxury-surface py-1 shadow-elevated">
                <div className="border-b border-luxury-border px-3 py-2.5">
                  <p className="text-[13px] font-semibold text-luxury-ink">
                    Notifications
                  </p>
                </div>
                <div className="px-3 py-8 text-center">
                  <Bell className="mx-auto mb-2 h-8 w-8 text-luxury-caption opacity-40" />
                  <p className="text-[13px] font-medium text-luxury-ink">
                    No notifications yet
                  </p>
                  <p className="mt-1 text-[12px] text-luxury-caption">
                    Alerts for scan results and community replies will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setHelpOpen(true);
              setNotificationsOpen(false);
            }}
            className="rounded-lg p-2 text-luxury-body transition-colors hover:bg-luxury-muted/60 hover:text-luxury-ink"
            aria-label="Open help assistant"
          >
            <HelpCircle className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((o) => !o);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-luxury-muted/60"
            >
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt=""
                  className="h-8 w-8 rounded-lg object-cover ring-1 ring-luxury-border"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-luxury-accent text-xs font-semibold text-luxury-on-accent">
                  {initials}
                </span>
              )}
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-xl border border-luxury-border bg-luxury-surface py-1 shadow-elevated">
                <div className="border-b border-luxury-border px-3 py-2">
                  <p className="truncate text-[13px] font-medium text-luxury-ink">
                    {displayName}
                  </p>
                  <p className="truncate text-[11px] text-luxury-caption">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-luxury-body hover:bg-luxury-muted/50"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => signOut({ redirectUrl: "/" })}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-luxury-coral hover:bg-luxury-muted/50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <HelpChatbotModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}

function DashboardPageTitle({ breadcrumb }) {
  const data = useDashboardData();
  const firstName = data.displayName?.split(" ")[0] || "there";
  const greeting = getTimeGreeting();

  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="truncate text-[15px] font-semibold tracking-tight text-luxury-ink">
          {greeting}, {firstName}
        </h1>
        {!data.loading && (
          <a
            href="#dashboard-readiness"
            className="rounded-full border border-luxury-accent/25 bg-luxury-accent/10 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-luxury-accent transition-colors hover:bg-luxury-accent/15"
          >
            {data.verificationScore}% ready
          </a>
        )}
      </div>
      <nav
        aria-label="Breadcrumb"
        className="mt-0.5 flex items-center gap-1 text-[11px] text-luxury-caption"
      >
        {breadcrumb.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
            <span className={i === breadcrumb.length - 1 ? "text-luxury-body" : ""}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>
    </div>
  );
}

function PageTitle({ title, breadcrumb }) {
  return (
    <div className="min-w-0 flex-1">
      <h1 className="truncate text-[15px] font-semibold tracking-tight text-luxury-ink">
        {title}
      </h1>
      <nav
        aria-label="Breadcrumb"
        className="mt-0.5 flex items-center gap-1 text-[11px] text-luxury-caption"
      >
        {breadcrumb.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
            <span className={i === breadcrumb.length - 1 ? "text-luxury-body" : ""}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>
    </div>
  );
}
