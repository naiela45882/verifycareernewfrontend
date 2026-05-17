import FieldInput from "./FieldInput";
import { builderBtnGhost, builderBtnDanger, builderLabel } from "./builderTheme";

export default function ContactSection({ contact, onChange }) {
  const update = (field, value) => {
    onChange({ ...contact, [field]: value });
  };

  const updateLink = (index, field, value) => {
    const links = [...(contact.links || [])];
    links[index] = { ...links[index], [field]: value };
    onChange({ ...contact, links });
  };

  const addLink = () => {
    onChange({
      ...contact,
      links: [...(contact.links || []), { label: "LinkedIn", url: "" }],
    });
  };

  const removeLink = (index) => {
    const links = (contact.links || []).filter((_, i) => i !== index);
    onChange({ ...contact, links });
  };

  return (
    <div className="space-y-3">
      <FieldInput label="Full name" value={contact.name} onChange={(v) => update("name", v)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <FieldInput label="Email" value={contact.email} onChange={(v) => update("email", v)} />
        <FieldInput label="Phone" value={contact.phone} onChange={(v) => update("phone", v)} />
      </div>
      <FieldInput label="Location" value={contact.location} onChange={(v) => update("location", v)} />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={builderLabel}>Links</span>
          <button type="button" onClick={addLink} className={builderBtnGhost}>
            + Add link
          </button>
        </div>
        {(contact.links || []).map((link, i) => (
          <div key={i} className="flex gap-2">
            <FieldInput
              className="flex-1"
              placeholder="Label"
              value={link.label}
              onChange={(v) => updateLink(i, "label", v)}
            />
            <FieldInput
              className="flex-[2]"
              placeholder="https://"
              value={link.url}
              onChange={(v) => updateLink(i, "url", v)}
            />
            <button type="button" onClick={() => removeLink(i)} className={`mt-1 self-end ${builderBtnDanger}`}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
