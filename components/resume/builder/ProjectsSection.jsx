import FieldInput from "./FieldInput";
import { emptyProject } from "../../../lib/resumeSchema";
import {
  builderCardInset,
  builderInput,
  builderBtnGhost,
  builderBtnDanger,
  builderDashedAdd,
} from "./builderTheme";

export default function ProjectsSection({ projects, onChange }) {
  const updateEntry = (index, field, value) => {
    const next = [...projects];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const updateBullet = (projIndex, bulletIndex, value) => {
    const next = [...projects];
    const bullets = [...(next[projIndex].bullets || [])];
    bullets[bulletIndex] = value;
    next[projIndex] = { ...next[projIndex], bullets };
    onChange(next);
  };

  const addBullet = (projIndex) => {
    const next = [...projects];
    next[projIndex] = {
      ...next[projIndex],
      bullets: [...(next[projIndex].bullets || []), ""],
    };
    onChange(next);
  };

  const addEntry = () => onChange([...projects, emptyProject()]);
  const removeEntry = (index) => onChange(projects.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      {projects.map((proj, i) => (
        <div key={i} className={builderCardInset}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-luxury-body">Project {i + 1}</span>
            <button type="button" onClick={() => removeEntry(i)} className={builderBtnDanger}>
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <FieldInput label="Name" value={proj.name} onChange={(v) => updateEntry(i, "name", v)} />
            <FieldInput label="URL" value={proj.url} onChange={(v) => updateEntry(i, "url", v)} />
            {(proj.bullets || [""]).map((bullet, bi) => (
              <textarea
                key={bi}
                value={bullet}
                onChange={(e) => updateBullet(i, bi, e.target.value)}
                rows={2}
                placeholder="Project highlight..."
                className={`${builderInput} resize-y`}
              />
            ))}
            <button type="button" onClick={() => addBullet(i)} className={builderBtnGhost}>
              + Bullet
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addEntry} className={builderDashedAdd}>
        + Add project
      </button>
    </div>
  );
}
