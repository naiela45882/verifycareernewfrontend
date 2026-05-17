import RoadmapItemCard from "./RoadmapItemCard";

export default function RoadmapGroupedList({ roadmap = [], onStatusChange, onDelete }) {
  const groups = roadmap.reduce((acc, item) => {
    const key = item.skillGroup || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const groupNames = Object.keys(groups).sort();

  if (!roadmap.length) {
    return (
      <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
        No roadmap items yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {groupNames.map((group) => (
        <section key={group}>
          <h3 className="mb-3 text-[14px] font-semibold text-luxury-ink">{group}</h3>
          <div className="space-y-3">
            {groups[group].map((item) => (
              <RoadmapItemCard
                key={item.id}
                item={item}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
