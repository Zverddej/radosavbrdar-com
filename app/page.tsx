import StatusStrip from "../components/StatusStrip";

// TEMPORARY token showcase — deleted in Phase 2.

const colors = [
  { token: "--color-ink", hex: "#0E1420", note: "base" },
  { token: "--color-panel", hex: "#161E2E", note: "raised surfaces" },
  { token: "--color-line", hex: "#2A3548", note: "hairlines, borders" },
  { token: "--color-text", hex: "#D6DBE4", note: "primary text" },
  { token: "--color-muted", hex: "#8B94A7", note: "secondary text" },
  { token: "--color-amber", hex: "#E8A33D", note: "single accent" },
  { token: "--color-ok", hex: "#4C9A6E", note: "status only" },
];

const typeScale = [
  { token: "--text-4xl", px: "48.83", className: "text-4xl" },
  { token: "--text-3xl", px: "39.06", className: "text-3xl" },
  { token: "--text-2xl", px: "31.25", className: "text-2xl" },
  { token: "--text-xl", px: "25.00", className: "text-xl" },
  { token: "--text-lg", px: "20.00", className: "text-lg" },
  { token: "--text-base", px: "16.00", className: "text-base" },
  { token: "--text-sm", px: "12.80", className: "text-sm" },
];

export default function TokenShowcase() {
  return (
    <main className="mx-auto w-full max-w-site px-6 pb-section">
      <header className="py-section">
        <p className="font-mono text-sm text-muted">
          design-system / blueprint-terminal / phase-01
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Token showcase</h1>
        <p className="mt-2 text-muted">
          Temporary page — verifies tokens, type scale and the StatusStrip.
          Deleted in Phase 2.
        </p>
      </header>

      <section aria-labelledby="statusstrip-heading">
        <h2 id="statusstrip-heading" className="text-xl font-semibold">
          StatusStrip
        </h2>
        <div className="mt-6 space-y-6">
          <StatusStrip
            items={[
              { label: "uptime", value: "30y" },
              { label: "deployments", value: "2" },
              { label: "maps_views", value: "60M+" },
            ]}
          />
          <StatusStrip
            items={[
              { label: "stack", value: "fastapi · qdrant · bge-m3" },
              { label: "status", value: "operational" },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="color-heading" className="mt-section">
        <h2 id="color-heading" className="text-xl font-semibold">
          Color
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((c) => (
            <li key={c.token} className="bg-panel p-4">
              <div
                className="h-16 rounded-sm border border-line"
                style={{ backgroundColor: `var(${c.token})` }}
              />
              <p className="mt-3 font-mono text-sm">
                {c.token}: <span className="text-muted">{c.hex}</span>
              </p>
              <p className="font-mono text-sm text-muted">{c.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type-heading" className="mt-section">
        <h2 id="type-heading" className="text-xl font-semibold">
          Type scale — 1.250 ratio, base 16px
        </h2>
        <ul className="mt-6 space-y-5 border-t border-line pt-6">
          {typeScale.map((t) => (
            <li key={t.token} className="flex flex-wrap items-baseline gap-x-6">
              <span className="w-44 shrink-0 font-mono text-sm text-muted">
                {t.token} · {t.px}px
              </span>
              <span className={t.className}>Own what you build</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-sm text-muted">
          mono — file paths, stack lists, status labels, numbers. Never body
          paragraphs.
        </p>
      </section>

      <section aria-labelledby="surface-heading" className="mt-section">
        <h2 id="surface-heading" className="text-xl font-semibold">
          Surfaces, hairlines, accent
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-sm border border-line bg-panel p-6">
            <p className="font-mono text-sm text-muted">panel · radius 2px</p>
            <p className="mt-3">
              Raised surface on ink, 1px hairline from{" "}
              <span className="font-mono text-sm">--color-line</span>.
            </p>
            <p className="mt-4">
              <a
                href="#statusstrip-heading"
                className="text-amber underline underline-offset-4"
              >
                Amber link — the single accent
              </a>
            </p>
          </div>
          <div className="rounded-sm border border-line bg-panel p-6">
            <p className="font-mono text-sm text-muted">status indicator</p>
            <p className="mt-3 flex items-center gap-2 font-mono text-sm">
              <span
                aria-hidden="true"
                className="inline-block size-2 rounded-sm bg-ok"
              />
              <span className="text-ok">ok</span>
              <span className="text-muted">— used only for status</span>
            </p>
            <p className="mt-4">
              <a
                href="#color-heading"
                className="rounded-sm border border-amber px-4 py-2 font-mono text-sm text-amber"
              >
                CTA sample
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
