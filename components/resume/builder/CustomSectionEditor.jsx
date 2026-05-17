import FieldInput from "./FieldInput";
import {
  builderCardInset,
  builderInput,
  builderBtnGhost,
  builderBtnDanger,
} from "./builderTheme";

export default function CustomSectionEditor({ section, onChange, onRemove }) {
  if (!section) return null;

  const update = (field, value) => onChange({ ...section, [field]: value });

  const updateBullet = (index, value) => {
    const bullets = [...(section.bullets || [])];
    bullets[index] = value;
    onChange({ ...section, bullets });
  };

  const addBullet = () => {
    onChange({ ...section, bullets: [...(section.bullets || []), ""] });
  };

  const removeBullet = (index) => {
    const bullets = (section.bullets || []).filter((_, i) => i !== index);
    onChange({ ...section, bullets: bullets.length ? bullets : [""] });
  };

  return (
    <div className={builderCardInset}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-luxury-body">Custom section</span>
        {onRemove && (
          <button type="button" onClick={onRemove} className={builderBtnDanger}>
            Remove section
          </button>
        )}
      </div>
      <div className="space-y-3">
        <FieldInput
          label="Section title"
          value={section.title}
          onChange={(v) => update("title", v)}
          placeholder="e.g. Languages, Awards, Volunteer"
        />
        <p className="text-[11px] text-luxury-caption">Add lines or bullet points for this section.</p>
        {(section.bullets || [""]).map((bullet, bi) => (
          <div key={bi} className="flex gap-2">
            <textarea
              value={bullet}
              onChange={(e) => updateBullet(bi, e.target.value)}
              rows={2}
              placeholder="Line or bullet..."
              className={`${builderInput} min-w-0 flex-1 resize-y`}
            />
            {(section.bullets || []).length > 1 && (
              <button
                type="button"
                onClick={() => removeBullet(bi)}
                className={`${builderBtnDanger} shrink-0 self-start pt-2`}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addBullet} className={builderBtnGhost}>
          + Add line
        </button>
      </div>
    </div>
  );
}
