import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Bell, HelpCircle, LogOut, Menu, User } from "lucide-react";
import { useSidebar } from "../SidebarContext";
import { cn } from "../../../lib/cn";
import { getPageTitle } from "../sidebar/sidebarConfig";
import HelpChatbotModal from "../HelpChatbotModal";

export default function DashboardNavbar() {
  const { pathname, hash } = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { toggleMobile } = useSidebar();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const title = getPageTitle(pathname, hash);

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Account";

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
      <header className="va-navbar sticky top-0 z-30 flex h-[52px] items-center gap-3 border-b border-luxury-border/60 bg-luxury-surface/80 px-4 backdrop-blur-xl sm:px-6">
        <button
          type="button"
          onClick={toggleMobile}
          className="rounded-md p-2 text-luxury-body hover:bg-luxury-muted/50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <p className="min-w-0 flex-1 truncate text-[14px] font-medium text-luxury-caption lg:text-luxury-ink">
          <span className="hidden text-luxury-caption lg:inline">Console / </span>
          <span className="text-luxury-ink">{title}</span>
        </p>

        <div className="flex items-center gap-0.5">
          <div ref={notificationsRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((o) => !o);
                setProfileOpen(false);
              }}
              className={cn(
                "rounded-md p-2 text-luxury-body transition-colors hover:bg-luxury-muted/50",
                notificationsOpen && "bg-luxury-muted/50"
              )}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-xl border border-luxury-border bg-luxury-surface p-4 shadow-elevated">
                <p className="text-[13px] font-medium text-luxury-ink">Notifications</p>
                <p className="mt-2 text-[12px] text-luxury-caption">Nothing new yet.</p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setHelpOpen(true);
              setNotificationsOpen(false);
            }}
            className="rounded-md p-2 text-luxury-body hover:bg-luxury-muted/50"
            aria-label="Help"
          >
            <HelpCircle className="h-[17px] w-[17px]" strokeWidth={1.75} />
          </button>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((o) => !o);
                setNotificationsOpen(false);
              }}
              className="rounded-md p-1 transition-colors hover:bg-luxury-muted/50"
            >
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt=""
                  className="h-7 w-7 rounded-md object-cover ring-1 ring-luxury-border"
                />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-luxury-accent text-[11px] font-semibold text-luxury-on-accent">
                  {initials}
                </span>
              )}
            </button>
            {profileOpen && (
              <ProfileMenu
                displayName={displayName}
                email={user?.primaryEmailAddress?.emailAddress}
                onSignOut={() => signOut({ redirectUrl: "/" })}
              />
            )}
          </div>
        </div>
      </header>

      <HelpChatbotModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}

function ProfileMenu({ displayName, email, onSignOut }) {
  return (
    <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-luxury-border bg-luxury-surface py-1 shadow-elevated">
      <div className="border-b border-luxury-border px-3 py-2">
        <p className="truncate text-[13px] font-medium text-luxury-ink">{displayName}</p>
        <p className="truncate text-[11px] text-luxury-caption">{email}</p>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-luxury-coral hover:bg-luxury-muted/50"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}
