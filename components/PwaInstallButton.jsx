import { Download, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import { usePwaInstall } from "../hooks/usePwaInstall";
import { cn } from "../lib/cn";

const IOS_HINT =
  "On iPhone or iPad: tap Share, then “Add to Home Screen” to install VerifyCareers.";

export default function PwaInstallButton({ variant = "app", className }) {
  const { canInstall, installed, showIosHint, promptInstall } = usePwaInstall();

  if (installed) return null;

  const visible = canInstall || showIosHint;
  if (!visible) return null;

  const triggerClass =
    variant === "landing"
      ? "nav-underline flex items-center gap-2 text-luxury-body hover:text-luxury-ink transition-colors duration-300 py-1"
      : "flex items-center gap-1.5 text-sm font-medium text-luxury-body hover:text-luxury-ink transition-colors duration-300 py-1.5 px-2 rounded-lg hover:bg-luxury-muted/60";

  const handleClick = async () => {
    if (canInstall) {
      const accepted = await promptInstall();
      if (accepted) {
        toast.success("VerifyCareers installed on your device.");
      }
      return;
    }
    toast(IOS_HINT, { duration: 6000, icon: "📲" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(triggerClass, className)}
      aria-label={canInstall ? "Install app" : "How to install on iOS"}
      title={canInstall ? "Install VerifyCareers" : "Add to Home Screen"}
    >
      {canInstall ? (
        <Download className="h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.5} />
      ) : (
        <Smartphone className="h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.5} />
      )}
      <span className={variant === "landing" ? "hidden xl:inline" : "hidden sm:inline"}>
        {canInstall ? "Install app" : "Install"}
      </span>
      <span className={variant === "landing" ? "xl:hidden" : "sm:hidden"}>App</span>
    </button>
  );
}
