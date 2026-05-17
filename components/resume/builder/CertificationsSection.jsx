import FieldInput from "./FieldInput";
import { emptyCertification } from "../../../lib/resumeSchema";
import { builderCardInset, builderBtnDanger, builderDashedAdd } from "./builderTheme";

export default function CertificationsSection({ certifications, onChange }) {
  const updateEntry = (index, field, value) => {
    const next = [...certifications];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const addEntry = () => onChange([...certifications, emptyCertification()]);
  const removeEntry = (index) => onChange(certifications.filter((_, i) => i !== index));

  if (!certifications.length) {
    return (
      <div className="rounded-lg border border-dashed border-luxury-border bg-luxury-muted/20 px-4 py-8 text-center">
        <p className="text-sm text-luxury-body">No certifications yet.</p>
        <button type="button" onClick={addEntry} className={`mt-3 ${builderDashedAdd}`}>
          + Add certification
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {certifications.map((cert, i) => (
        <div key={i} className={builderCardInset}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-luxury-body">Certification {i + 1}</span>
            <button type="button" onClick={() => removeEntry(i)} className={builderBtnDanger}>
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <FieldInput label="Name" value={cert.name} onChange={(v) => updateEntry(i, "name", v)} />
            <FieldInput label="Issuer" value={cert.issuer} onChange={(v) => updateEntry(i, "issuer", v)} />
            <FieldInput label="Date" value={cert.date} onChange={(v) => updateEntry(i, "date", v)} placeholder="2024" />
          </div>
        </div>
      ))}
      <button type="button" onClick={addEntry} className={builderDashedAdd}>
        + Add certification
      </button>
    </div>
  );
}
