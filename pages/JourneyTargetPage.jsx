import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useSkillJourney } from "../hooks/useSkillJourney";
import TargetRoleForm from "../components/skill-journey/TargetRoleForm";

export default function JourneyTargetPage() {
  const navigate = useNavigate();
  const { journey, startJourney } = useSkillJourney();
  const [loading, setLoading] = useState(false);

  const handleStart = async (payload) => {
    setLoading(true);
    try {
      await startJourney(payload);
      toast.success("Skill journey updated — placeholder analysis applied");
      navigate("/journey");
    } catch (err) {
      toast.error(err.message || "Failed to start journey");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        to="/journey"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-luxury-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Skill journey
      </Link>

      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Target role
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          {journey
            ? "Updating your target will regenerate your roadmap."
            : "Pick a goal to analyze your resume and build a roadmap."}
        </p>
      </header>

      <TargetRoleForm onSubmit={handleStart} loading={loading} />
    </div>
  );
}
