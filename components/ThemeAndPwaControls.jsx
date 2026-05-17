import { cn } from "../lib/cn";
import PwaInstallButton from "./PwaInstallButton";
import ThemeSwitcher from "./ThemeSwitcher";

export default function ThemeAndPwaControls({ variant = "app", className }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <ThemeSwitcher variant={variant} />
      <PwaInstallButton variant={variant} />
    </div>
  );
}
