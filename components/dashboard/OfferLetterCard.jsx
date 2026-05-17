import ActionModule from "./ActionModule";
import { ScanSearch } from "lucide-react";

export default function OfferLetterCard() {
  return (
    <ActionModule
      to="/analyze"
      title="Job Offer Letter Analysis"
      description="Upload an offer letter for scam probability checks and Verified / Suspicious badges. Optionally share anonymously on the community board."
      icon={ScanSearch}
      accent="teal"
    />
  );
}
