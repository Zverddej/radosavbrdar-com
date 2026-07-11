# DEV-LOG — radosavbrdar.com

Continuity log. Append-only, newest entry on top. Any Claude instance resumes from the top entry + `CLAUDE.md` + `/docs/radosavbrdar-implementation-plan.md`.

**Rule: no phase is complete without its entry here, committed together with the code.**

---

<!-- TEMPLATE — copy for each new entry:

### 00N — Phase X: <name> — <YYYY-MM-DD>
STATUS: DONE | IN PROGRESS | BLOCKED
COMMITS: <hash(es) or "pending">
MODEL: <e.g. Fable 5 / Claude Code>

DONE:
- <what was actually built, file-level>

ACCEPTANCE CHECK:
- [x/✗] <each check from the plan, with actual result / numbers>

DEVIATIONS FROM PLAN:
- <none | what and why>

OPEN TODOs INTRODUCED:
- <TODO markers left for Rade>

NEXT STEP:
- <exact first action for the next session>

-->

### 002 — Phase 2: Locale Routing + Layout Shell — 2026-07-11
STATUS: DONE
COMMITS: 3f57e93 (code + this entry), follow-up hash-record commit
MODEL: Sonnet 5 / Claude Code

DONE:
- `lib/i18n.ts` — `locales = ['en','sr']`, `defaultLocale = 'en'`, `Locale` type, `isLocale()` guard.
- `proxy.ts` (see DEVIATIONS) — redirects `/` → `/en`, matcher `"/"` only, nothing else.
- `app/[locale]/layout.tsx` — `generateStaticParams` for both locales, `notFound()` on invalid locale param, renders `<Nav>` + `<main>` + `<Footer>`.
- `components/Nav.tsx` — client component: logo (`radosav brdar` + mono `identitet` suffix, suffix hidden below `sm` to keep the lockup comfortable at 375px), 5 nav links (Work/Services/AI Assessment/About/Contact — all still 404 until later phases build those routes, expected), EN/SR locale switcher (segment-replace on current pathname, so it works at any depth once nested routes exist), mobile disclosure menu (native `<button>`, `aria-expanded`/`aria-controls`, no library).
- `components/Footer.tsx` — Contact + Privacy links, imprint line (`identitet — Radosav Brdar · Sombor, Serbia`, sourced from content-of-record PART 2; full legal imprint is a Phase 6 TODO already tracked).
- `app/[locale]/page.tsx` — placeholder Home ("home: pending Phase 3").
- Deleted `app/page.tsx` (Phase 1 token showcase).
- `app/layout.tsx` — trimmed the stale "Design system preview" metadata description left over from the showcase; final title/description marked TODO for Phase 7.

ACCEPTANCE CHECK:
- [x] `/` redirects to `/en` (307); `/en` and `/sr` render (200); `/xx` returns 404 — verified via curl against a production build/start on a scratch port.
- [x] Nav works on mobile (375px) and desktop; keyboard navigable — verified with a Puppeteer-driven Chrome (real CDP screenshot + interaction, not the `google-chrome --headless --screenshot` CLI, which produced a false negative — see DEVIATIONS). Confirmed: mobile menu button renders and opens the disclosure; Tab order after opening cycles through all 5 links + EN correctly as real `<a>` elements (native focus, global `:focus-visible` amber outline applies).
- [x] Locale switcher preserves current path — verified the segment-replace mechanism on `/en` → `/sr` (href correctly resolves to `/sr`). `/en/work` → `/sr/work` from the plan's example can't be exercised yet since `/work` doesn't exist until Phase 5; the mechanism is depth-agnostic so it will hold once that route ships.
- [x] `npm run build` — zero TS errors, both locale routes prerendered as static HTML.

DEVIATIONS FROM PLAN:
- Plan names the file `middleware.ts`. Next.js 16.2.10 deprecates that convention in favor of `proxy.ts` (function must be named/exported `proxy`, not `middleware`) — confirmed via the Next docs shipped in `node_modules`. Build succeeded either way (deprecation warning only), but per Rade's approval used `proxy.ts` now rather than carrying a warning that would need fixing later anyway. Same single responsibility as the plan specified (redirect `/` → `/en`, nothing else). This file is temporary regardless of name: Phase 8 (static export) drops proxy/middleware entirely and moves the redirect to a `_redirects` rule, per the plan's own Phase 8 approach — confirmed proxy is unsupported under static export in the Next docs.
- Nav's brand lockup hides the `identitet` mono suffix below the `sm` breakpoint (640px) — not in the plan's literal spec, but a minimal fit adjustment for very narrow phones; full lockup still shows at ≥640px, well before the `md` breakpoint where the mobile disclosure switches to the desktop nav.
- Footer imprint line uses only the already-approved content-of-record facts (studio name, Sombor/Serbia) — the full legal imprint (APR matični broj/PIB) stays a `// TODO` per CLAUDE.md; not inventing a registration number. Same for Contact: linked to `/contact` rather than a raw `mailto:`, since the contact email is still an open TODO (rade@identitet.rs vs hello@radosavbrdar.com) and shouldn't be guessed.

OPEN TODOs INTRODUCED:
- `app/layout.tsx` — final site title/description copy, deferred to Phase 7 (SEO/GEO).
- `components/Footer.tsx` — full imprint line (legal form + APR matični broj/PIB), carried from Phase 0's open items, wired properly in Phase 6.
- Pre-existing (not introduced this phase, but surfaced by `npm run lint`, which isn't part of any phase's ACCEPTANCE CHECK): `components/StatusStrip.tsx:33` — `react-hooks/immutability` flags the `elapsed` reassignment inside the `.map` used to stagger animation delays. Build passes; not touched since StatusStrip is out of Phase 2's file list. Flagging for whichever phase next touches that component.

NEXT STEP:
- Rade visually approves the Phase 2 shell (nav on mobile/desktop, locale switcher, footer) → then Phase 3: Content Layer + Home (`content/types.ts`, `content/en/home.ts` verbatim from the tournament doc, `lib/content.ts`, `components/CaseCard.tsx`, full `app/[locale]/page.tsx`).

### 001 — Phase 1: Repo + Design System — 2026-07-11
STATUS: DONE
COMMITS: 509189c (code + this entry), follow-up hash-record commit
MODEL: Fable 5 / Claude Code

DONE:
- `create-next-app` scaffold: Next.js 16.2.10 (Turbopack), Tailwind v4, TS strict, App Router, no src dir. Scaffold's generated CLAUDE.md/AGENTS.md discarded (ours is the source of truth); unused scaffold SVGs removed from `public/`.
- `app/globals.css` — all Blueprint Terminal tokens via `@theme`: 7 colors (ink/panel/line/text/muted/amber/ok, exact plan hexes), type scale 1.250/16px as `--text-sm`…`--text-4xl` (+ `--text-xs` 0.64rem as downward extension) with line-height tokens, `--spacing-section: clamp(4rem,10vh,7rem)`, `--container-site: 72rem`, radius 2px. Base layer: ink bg, amber `:focus-visible` outline + `::selection`. Components layer: StatusStrip type-in keyframes with `prefers-reduced-motion` override.
- `app/layout.tsx` — IBM Plex Sans (400/500/600/700) + IBM Plex Mono (400/500) via `next/font` (downloaded at build, served self-hosted from our origin, zero runtime Google requests), `latin` + `latin-ext` subsets (covers SR latinica for Phase 7).
- `components/StatusStrip.tsx` — props `items: {label, value}[]` (+ optional `className`); server component; CSS-only type-in at 30ms/char via `steps()`, segments staggered by cumulative length; reduced-motion shows content instantly; content is in the a11y tree from first paint.
- `app/page.tsx` — temporary token showcase (StatusStrip demos, color swatches, type scale, surfaces/accent samples). Deleted in Phase 2.

ACCEPTANCE CHECK:
- [x] `npm run build` passes, zero TS errors (Next 16.2.10, routes `/` + `/_not-found` static)
- [x] Token showcase renders all 7 colors and 7 type sizes (verified via headless-Chrome screenshots, 1440px and 375px)
- [x] StatusStrip renders; type-in animation runs; `--force-prefers-reduced-motion` screenshot shows full text instantly
- [x] Lighthouse accessibility = 100 (≥ 95 required) on the showcase page, zero failed audits
- [x] No horizontal overflow at 375px (measured `scrollWidth` = 375 via puppeteer; an initial `--window-size` screenshot artifact suggested clipping — disproven by measurement)

DEVIATIONS FROM PLAN:
- Next.js 16.2.10 instead of "15+" literal — plan says 15+, current stable is 16; no API conflicts encountered.
- Added `--text-xs` (0.64rem) below the plan's scale — same 1.250 ratio, needed later for fine mono labels; flagging rather than hiding it.
- Fonts use `next/font/google` (build-time download → self-hosted output) rather than committed font files; satisfies "self-hosted via next/font" — no runtime third-party requests.

OPEN TODOs INTRODUCED:
- none (showcase page carries a visible "deleted in Phase 2" note)

NEXT STEP:
- Rade visually approves the showcase (colors, type scale, StatusStrip type-in) → then Phase 2: locale routing + layout shell (`middleware.ts`, `lib/i18n.ts`, `app/[locale]/layout.tsx`, Nav, Footer; delete showcase).

### 000 — Project init — 2026-07-11
STATUS: DONE
COMMITS: pending (first commit = docs + this file)
MODEL: Fable 5 (chat, planning instance)

DONE:
- Content of record finalized: site copy tournament, AI assessment page (PART 4 final), case studies ×5, About/Contact/Privacy, SR glossary.
- Implementation plan finalized: Phases 1–8, stack locked (Next.js 15+, Tailwind v4, MDX, Cloudflare Workers static).
- Pricing decided (launch-kit.md): AI Assessment €3.000 remote / €4.500 on-site, fee credited against Phase 1 of build within 90 days. Founding-client €2.000 private offer for first 2–3. → This resolves OPEN ITEM #1: content files may use €3.000 as the price (Rade confirmed via launch kit).
- Working protocol established: CLAUDE.md rules + this dev log.

ACCEPTANCE CHECK:
- [x] /docs/ contains all four source documents
- [x] CLAUDE.md and DEV-LOG.md in repo root

DEVIATIONS FROM PLAN:
- Plan says assessment price stays `[X] €` placeholder; superseded by launch-kit decision → use **€3.000** (remote) with on-site variant mentioned per launch-kit PART 1. If uncertain how to phrase on the page, leave €3.000 and flag phrasing for Rade.

OPEN TODOs (carried from plan — for Rade, not the agent):
- Hard metric per case study (pages indexed, members, etc.) — needed by Phase 5 review
- Client naming permissions (Skinissima = yes; agrobudget, municipalities = confirm)
- Domain confirmation radosavbrdar.com before Phase 8
- Booking tool: Cal.com/Calendly URL or email-only for v1
- Contact email decision: rade@identitet.rs vs hello@radosavbrdar.com
- NDA template (business process, not site code)
- Imprint: APR matični broj / PIB
- Legal review of privacy page

NEXT STEP:
- Phase 1 — Repo + Design System ("Blueprint Terminal" tokens, StatusStrip, token showcase). See plan.
