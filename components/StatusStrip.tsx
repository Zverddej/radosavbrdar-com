import type { CSSProperties } from "react";

export interface StatusStripItem {
  label: string;
  value: string;
}

interface StatusStripProps {
  items: StatusStripItem[];
  className?: string;
}

const MS_PER_CHAR = 30;
const SEPARATOR = "·";

/**
 * The site's signature element: a thin mono-font "system status" bar.
 * Encodes real information (metrics, stacks, timelines) — never decoration.
 * Types in once on load via CSS steps(); prefers-reduced-motion shows it
 * instantly (see .status-segment in globals.css).
 */
export default function StatusStrip({ items, className }: StatusStripProps) {
  let elapsed = 0;

  return (
    <div
      className={`border-y border-line py-2 font-mono text-sm text-muted ${className ?? ""}`}
    >
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {items.map((item, i) => {
          const text = `${item.label}: ${item.value}`;
          const delay = elapsed;
          elapsed += text.length * MS_PER_CHAR;

          return (
            <span key={`${item.label}-${i}`} className="flex items-baseline gap-x-3">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="status-separator"
                  style={{ "--delay": `${delay}ms` } as CSSProperties}
                >
                  {SEPARATOR}
                </span>
              )}
              <span
                className="status-segment"
                style={
                  {
                    "--chars": text.length,
                    "--delay": `${delay}ms`,
                  } as CSSProperties
                }
              >
                {item.label}: <span className="text-text">{item.value}</span>
              </span>
            </span>
          );
        })}
      </span>
    </div>
  );
}
