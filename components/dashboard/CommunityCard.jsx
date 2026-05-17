import ActionModule from "./ActionModule";
import { Users } from "lucide-react";

export default function CommunityCard() {
  return (
    <ActionModule
      to="/community"
      title="Community Scam & Experiences"
      description="Browse and share anonymous scam reports and real hiring experiences from other job seekers."
      icon={Users}
      accent="ink"
    />
  );
}
