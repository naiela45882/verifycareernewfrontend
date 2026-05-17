export const TARGET_ROLES = [
  "Full-Stack Developer",
  "Data Analyst",
  "Product Manager",
];

export const ROADMAP_TYPES = [
  { value: "skill", label: "Skill" },
  { value: "task", label: "Task" },
  { value: "course", label: "Course" },
  { value: "project", label: "Project" },
  { value: "certification", label: "Certification" },
];

export const ROADMAP_STATUSES = ["Not Started", "In Progress", "Completed"];

export const TYPE_LABELS = Object.fromEntries(
  ROADMAP_TYPES.map((t) => [t.value, t.label])
);
