import { useState } from "react";
import { Link } from "react-router-dom";
import { trustColor, trustRatingFromNode } from "../../lib/scamRisk";
import { cn } from "../../lib/cn";

const CX = 200;
const CY = 132;
const RADIUS = 92;

function nodePosition(index, total) {
  if (total === 0) return { x: CX, y: CY };
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CX + RADIUS * Math.cos(angle),
    y: CY + RADIUS * Math.sin(angle),
  };
}

function nodeRadius(score) {
  return 20 + Math.round((score / 100) * 8);
}

function formatLabel(node) {
  const raw = node.displayName || node.canonicalKey || node.type || "?";
  if (raw.length <= 16) return raw;
  return `${raw.slice(0, 14)}…`;
}

export default function LinkedIntelligenceGraph({
  nodes = [],
  riskSignals = [],
  className,
}) {
  const [hovered, setHovered] = useState(null);
  const warnedIds = new Set(
    riskSignals.map((s) => String(s.nodeId)).filter(Boolean)
  );

  if (!nodes.length) return null;

  const displayNodes = nodes.slice(0, 5);

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 400 268"
        className="mx-auto h-auto w-full max-w-lg"
        role="img"
        aria-label="Linked entities graph"
      >
        {displayNodes.map((node, i) => {
          const { x, y } = nodePosition(i, displayNodes.length);
          const id = String(node.id || node._id || i);
          const hasWarning = warnedIds.has(id);
          return (
            <line
              key={`line-${id}`}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke={hasWarning ? "var(--vc-coral)" : "var(--vc-border)"}
              strokeWidth={hasWarning ? 2 : 1}
              strokeDasharray={hasWarning ? "5 4" : undefined}
              opacity={hasWarning ? 0.9 : 0.55}
            />
          );
        })}

        <circle
          cx={CX}
          cy={CY}
          r={40}
          fill="var(--vc-muted)"
          stroke="var(--vc-border)"
          strokeWidth={1}
        />
        <text
          x={CX}
          y={CY - 2}
          textAnchor="middle"
          fill="var(--vc-ink)"
          style={{ fontSize: 11, fontWeight: 600 }}
        >
          Your scan
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          fill="var(--vc-caption)"
          style={{ fontSize: 9 }}
        >
          linked to
        </text>

        {displayNodes.map((node, i) => {
          const { x, y } = nodePosition(i, displayNodes.length);
          const id = String(node.id || node._id || i);
          const score = trustRatingFromNode(node);
          const fill = trustColor(score);
          const r = nodeRadius(score);
          const label = formatLabel(node);
          const isHovered = hovered === id;
          const hasWarning = warnedIds.has(id);

          return (
            <g
              key={id}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.type}: ${node.displayName || node.canonicalKey}, trust ${score}`}
              style={{ cursor: "pointer" }}
            >
              {hasWarning && (
                <circle
                  cx={x}
                  cy={y}
                  r={r + 5}
                  fill="none"
                  stroke="var(--vc-coral)"
                  strokeWidth={2}
                  opacity={0.55}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? r + 2 : r}
                fill={fill}
                stroke="var(--vc-surface)"
                strokeWidth={2}
              />
              <text
                x={x}
                y={y - 5}
                textAnchor="middle"
                fill="var(--vc-on-accent)"
                style={{ fontSize: 10, fontWeight: 700 }}
              >
                {score}
              </text>
              <text
                x={x}
                y={y + 9}
                textAnchor="middle"
                fill="var(--vc-on-accent)"
                style={{ fontSize: 8, fontWeight: 500 }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[11px] text-luxury-caption">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-luxury-accent" />
          High trust (70+)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-luxury-sun" />
          Mixed (40–69)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-luxury-coral" />
          Low (&lt;40)
        </span>
      </div>

      {hovered && (
        <p className="mt-3 rounded-lg border border-luxury-border bg-luxury-muted/50 px-3 py-2 text-center text-[12px] text-luxury-body">
          {(() => {
            const node = displayNodes.find((n) => String(n.id || n._id) === hovered);
            if (!node) return null;
            const name = node.displayName || node.canonicalKey;
            const type = node.type;
            const companyLink =
              type === "company" && node.id ? (
                <>
                  {" "}
                  <Link
                    to={`/trust/company/${node.id}`}
                    className="text-luxury-accent hover:underline"
                  >
                    View company
                  </Link>
                </>
              ) : null;
            return (
              <>
                <span className="font-medium capitalize text-luxury-ink">{type}</span>
                {": "}
                {name}
                {" · Trust rating "}
                {trustRatingFromNode(node)}/100
                {companyLink}
              </>
            );
          })()}
        </p>
      )}
    </div>
  );
}
