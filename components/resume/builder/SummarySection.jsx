import { builderInput } from "./builderTheme";

export default function SummarySection({ summary, onChange }) {
  return (
    <textarea
      value={summary}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      placeholder="Brief professional summary..."
      className={`${builderInput} resize-y`}
    />
  );
}
