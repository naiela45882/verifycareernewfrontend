import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useSkillJourney } from "../hooks/useSkillJourney";
import RoadmapGroupedList from "../components/skill-journey/RoadmapGroupedList";
import AddRoadmapItemForm from "../components/skill-journey/AddRoadmapItemForm";

export default function JourneyRoadmapPage() {
  const { journey, loading, updateRoadmapItem, addRoadmapItem, deleteRoadmapItem } =
    useSkillJourney();

  if (loading) {
    return <div className="mx-auto max-w-3xl h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!journey) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[13px] text-luxury-body">Start your journey first.</p>
        <Link to="/journey/target" className="mt-2 inline-block text-luxury-accent hover:underline">
          Set target role
        </Link>
      </div>
    );
  }

  const handleStatus = async (id, status) => {
    try {
      await updateRoadmapItem(id, { status });
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleAdd = async (form) => {
    try {
      await addRoadmapItem({
        type: form.type,
        title: form.title.trim(),
        description: form.description,
        skillGroup: form.skillGroup,
      });
      toast.success("Item added");
    } catch (err) {
      toast.error(err.message || "Failed to add item");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this roadmap item?")) return;
    try {
      await deleteRoadmapItem(id);
      toast.success("Item removed");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/journey"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-luxury-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Overview
      </Link>

      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Roadmap
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          {journey.targetRole} · {journey.completionPercent}% complete
        </p>
      </header>

      <AddRoadmapItemForm onAdd={handleAdd} />

      <RoadmapGroupedList
        roadmap={journey.roadmap}
        onStatusChange={handleStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}
