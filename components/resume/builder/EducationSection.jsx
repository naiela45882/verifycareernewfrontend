import FieldInput from "./FieldInput";
import { emptyEducation } from "../../../lib/resumeSchema";
import { builderCardInset, builderInput, builderLabel, builderBtnDanger, builderDashedAdd } from "./builderTheme";

export default function EducationSection({ education, onChange }) {
  const updateEntry = (index, field, value) => {
    const next = [...education];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addEntry = () => onChange([...education, emptyEducation()]);
  const removeEntry = (index) => onChange(education.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      {education.map((edu, i) => (
        <div key={i} className={builderCardInset}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-luxury-body">School {i + 1}</span>
            <button type="button" onClick={() => removeEntry(i)} className={builderBtnDanger}>
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <FieldInput label="School" value={edu.school} onChange={(v) => updateEntry(i, "school", v)} />
            <FieldInput label="Degree" value={edu.degree} onChange={(v) => updateEntry(i, "degree", v)} />
            <FieldInput label="Field of study" value={edu.field} onChange={(v) => updateEntry(i, "field", v)} />
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldInput label="Start" value={edu.startDate} onChange={(v) => updateEntry(i, "startDate", v)} />
              <FieldInput label="End" value={edu.endDate} onChange={(v) => updateEntry(i, "endDate", v)} />
            </div>
            <label className="block">
              <span className={builderLabel}>Details</span>
              <textarea
                value={edu.details}
                onChange={(e) => updateEntry(i, "details", e.target.value)}
                rows={2}
                className={`${builderInput} resize-y`}
              />
            </label>
          </div>
        </div>
      ))}
      <button type="button" onClick={addEntry} className={builderDashedAdd}>
        + Add education
      </button>
    </div>
  );
}
