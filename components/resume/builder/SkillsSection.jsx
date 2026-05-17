import { useState } from "react";
import { builderInput, builderBtnPrimary } from "./builderTheme";

export default function SkillsSection({ skills, onChange }) {
  const category = skills?.categories?.[0] || { name: "Skills", items: [] };
  const [input, setInput] = useState("");

  const updateItems = (items) => {
    onChange({
      categories: [{ name: category.name || "Skills", items }],
    });
  };

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (category.items.includes(trimmed)) {
      setInput("");
      return;
    }
    updateItems([...category.items, trimmed]);
    setInput("");
  };

  const removeSkill = (index) => {
    updateItems(category.items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          placeholder="Add a skill and press Enter"
          className={`${builderInput} flex-1`}
        />
        <button type="button" onClick={addSkill} className={builderBtnPrimary}>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.items.map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full border border-luxury-border bg-luxury-muted/40 px-3 py-1 text-sm text-luxury-ink"
          >
            {skill}
            <button type="button" onClick={() => removeSkill(i)} className="text-luxury-caption hover:text-luxury-coral">
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
