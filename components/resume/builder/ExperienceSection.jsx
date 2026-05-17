import FieldInput from "./FieldInput";
import { emptyExperience } from "../../../lib/resumeSchema";
import {
  builderCardInset,
  builderInput,
  builderLabel,
  builderBtnGhost,
  builderBtnDanger,
  builderDashedAdd,
} from "./builderTheme";

export default function ExperienceSection({ experience, onChange }) {
  const updateEntry = (index, field, value) => {
    const next = [...experience];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    const next = [...experience];
    const bullets = [...(next[expIndex].bullets || [])];
    bullets[bulletIndex] = value;
    next[expIndex] = { ...next[expIndex], bullets };
    onChange(next);
  };

  const addBullet = (expIndex) => {
    const next = [...experience];
    next[expIndex] = {
      ...next[expIndex],
      bullets: [...(next[expIndex].bullets || []), ""],
    };
    onChange(next);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const next = [...experience];
    const bullets = (next[expIndex].bullets || []).filter((_, i) => i !== bulletIndex);
    next[expIndex] = { ...next[expIndex], bullets: bullets.length ? bullets : [""] };
    onChange(next);
  };

  const addEntry = () => onChange([...experience, emptyExperience()]);
  const removeEntry = (index) => onChange(experience.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      {experience.map((exp, i) => (
        <div key={i} className={builderCardInset}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-luxury-body">Role {i + 1}</span>
            <button type="button" onClick={() => removeEntry(i)} className={builderBtnDanger}>
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <FieldInput label="Job title" value={exp.title} onChange={(v) => updateEntry(i, "title", v)} />
            <FieldInput label="Company" value={exp.company} onChange={(v) => updateEntry(i, "company", v)} />
            <FieldInput label="Location" value={exp.location} onChange={(v) => updateEntry(i, "location", v)} />
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldInput label="Start" value={exp.startDate} onChange={(v) => updateEntry(i, "startDate", v)} placeholder="Jan 2022" />
              <FieldInput label="End" value={exp.endDate} onChange={(v) => updateEntry(i, "endDate", v)} placeholder="Present" disabled={exp.current} />
            </div>
            <label className="flex items-center gap-2 text-sm text-luxury-body">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateEntry(i, "current", e.target.checked)}
                className="rounded border-luxury-border text-luxury-accent focus:ring-luxury-accent/30"
              />
              Currently working here
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={builderLabel}>Bullets</span>
                <button type="button" onClick={() => addBullet(i)} className={builderBtnGhost}>
                  + Bullet
                </button>
              </div>
              {(exp.bullets || [""]).map((bullet, bi) => (
                <div key={bi} className="flex gap-2">
                  <textarea
                    value={bullet}
                    onChange={(e) => updateBullet(i, bi, e.target.value)}
                    rows={2}
                    placeholder="Achievement or responsibility..."
                    className={`${builderInput} flex-1 resize-y`}
                  />
                  <button type="button" onClick={() => removeBullet(i, bi)} className={builderBtnDanger}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addEntry} className={builderDashedAdd}>
        + Add experience
      </button>
    </div>
  );
}
