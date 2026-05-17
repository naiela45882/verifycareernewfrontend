import { builderInput, builderLabel } from "./builderTheme";

export default function FieldInput({ label, value, onChange, placeholder, type = "text", className = "" }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className={builderLabel}>{label}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={builderInput}
      />
    </label>
  );
}
