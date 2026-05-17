import React from 'react';
export default function RiskMeter({ score = 0 }) {
// score: 0..100
const pct = Math.max(0, Math.min(100, score));
const barColor = pct < 40 ? 'bg-luxury-accent' : pct < 75 ? 'bg-luxury-sun' : 'bg-luxury-coral';


return (
<div className="w-full">
<div className="flex justify-between mb-1">
<div className="text-sm font-medium text-luxury-ink">Risk</div>
<div className="text-sm font-semibold text-luxury-ink">{pct}%</div>
</div>
<div className="w-full h-3 bg-luxury-muted rounded-full overflow-hidden">
<div
className={`${barColor} h-full rounded-full transition-all duration-300`}
style={{ width: `${pct}%` }}
/>
</div>
</div>
);
}