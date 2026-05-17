import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  User,
  Palette,
  MessageCircle,
  HelpCircle,
  Mail,
  LogOut,
  Target,
} from "lucide-react";
import toast from "react-hot-toast";
import ThemeAndPwaControls from "./components/ThemeAndPwaControls";
import HelpChatPanel from "./components/settings/HelpChatPanel";
import SettingsFaqs from "./components/settings/SettingsFaqs";
import SettingsContact from "./components/settings/SettingsContact";
import { useUserProfile } from "./hooks/useUserProfile";
import { cn } from "./lib/cn";

const NAV_GROUPS = [
  {
    label: "Your account",
    items: [
      { id: "account", label: "Account", icon: User },
      { id: "profile", label: "Profile", icon: Target },
      { id: "appearance", label: "Appearance", icon: Palette },
    ],
  },
  {
    label: "Support",
    items: [
      { id: "faqs", label: "FAQs", icon: HelpCircle },
      { id: "help", label: "Help assistant", icon: MessageCircle },
      { id: "contact", label: "Contact us", icon: Mail },
    ],
  },
];

const SECTION_COPY = {
  account: {
    title: "Account",
    description: "Your sign-in details and session.",
  },
  profile: {
    title: "Profile",
    description: "Career preferences used across the app.",
  },
  appearance: {
    title: "Appearance",
    description: "Theme and visual preferences.",
  },
  faqs: {
    title: "FAQs",
    description: "Quick answers to common questions.",
  },
  help: {
    title: "Help assistant",
    description: "Chat with AI about resumes, offers, and scam red flags.",
  },
  contact: {
    title: "Contact us",
    description: "Reach the VerifyCareers team.",
  },
};

const VALID_IDS = new Set(Object.keys(SECTION_COPY));

export default function Settings() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { profile, loading, updateCareerGoal } = useUserProfile();
  const [goalInput, setGoalInput] = useState("");
  const [savingGoal, setSavingGoal] = useState(false);

  const rawId = hash.replace("#", "") || "account";
  const activeId = VALID_IDS.has(rawId) ? rawId : "account";

  useEffect(() => {
    if (rawId && !VALID_IDS.has(rawId)) {
      navigate("/settings#account", { replace: true });
    }
  }, [rawId, navigate]);

  useEffect(() => {
    if (profile?.user?.careerGoal) {
      setGoalInput(profile.user.careerGoal);
    }
  }, [profile?.user?.careerGoal]);

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    profile?.user?.name ||
    "Account";

  const email =
    user?.primaryEmailAddress?.emailAddress || profile?.user?.email || "";

  const handleSaveGoal = async () => {
    setSavingGoal(true);
    try {
      await updateCareerGoal(goalInput);
      toast.success("Profile updated");
    } catch {
      toast.error("Could not save profile");
    } finally {
      setSavingGoal(false);
    }
  };

  const { title, description } = SECTION_COPY[activeId];

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink">
          Settings
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Manage your account, preferences, and support.
        </p>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <nav className="shrink-0 rounded-xl border border-luxury-border bg-luxury-surface p-2 shadow-soft lg:w-52">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-2 last:mb-0">
              <p className="mb-1 px-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-luxury-caption">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => navigate(`/settings#${id}`)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors",
                        activeId === id
                          ? "bg-luxury-muted text-luxury-accent"
                          : "text-luxury-body hover:bg-luxury-muted/50 hover:text-luxury-ink"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="min-w-0 flex-1 rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
          <header className="mb-5 border-b border-luxury-border pb-4">
            <h2 className="text-lg font-semibold text-luxury-ink">{title}</h2>
            <p className="mt-0.5 text-[13px] text-luxury-body">{description}</p>
          </header>

          {activeId === "account" && (
            <div className="space-y-4">
              <Field label="Name" value={displayName} />
              <Field label="Email" value={email} />
              <p className="text-[12px] text-luxury-caption">
                Managed through your secure sign-in provider.
              </p>
              <button
                type="button"
                onClick={() => signOut({ redirectUrl: "/" })}
                className="inline-flex items-center gap-2 rounded-lg border border-luxury-coral/30 px-4 py-2 text-[13px] font-medium text-luxury-coral transition-colors hover:bg-luxury-coral/8"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}

          {activeId === "profile" && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="career-goal"
                  className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption"
                >
                  Career goal
                </label>
                <textarea
                  id="career-goal"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  rows={3}
                  placeholder="e.g. Senior software engineer at a product company"
                  className="w-full resize-none rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
                />
                <p className="mt-1.5 text-[12px] text-luxury-caption">
                  Powers skill journey recommendations on your dashboard.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveGoal}
                disabled={savingGoal || loading}
                className="rounded-lg bg-luxury-accent px-4 py-2 text-[13px] font-medium text-luxury-on-accent transition-colors hover:bg-luxury-accent-hover disabled:opacity-60"
              >
                {savingGoal ? "Saving…" : "Save profile"}
              </button>
            </div>
          )}

          {activeId === "appearance" && (
            <div className="space-y-4">
              <ThemeAndPwaControls />
              <p className="text-[12px] text-luxury-caption">
                Install VerifyCareers as an app for quick access from your home screen or dock.
              </p>
            </div>
          )}

          {activeId === "faqs" && <SettingsFaqs />}

          {activeId === "help" && <HelpChatPanel />}

          {activeId === "contact" && <SettingsContact />}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-medium text-luxury-ink">{value || "—"}</p>
    </div>
  );
}
