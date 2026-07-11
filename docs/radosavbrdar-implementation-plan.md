# radosavbrdar.com — Implementation Plan (Agent Handoff)

**Project:** Personal/studio site for Radosav Brdar · identitet studio.
**Purpose:** Validation-after-referral. Visitor arrives via recommendation; site must confirm expertise in 60 seconds.
**Copy source:** `website-copy-tournament.md` (site copy) and `ai-assessment-tournament.md` (assessment page copy). Treat these as the content of record — do not rewrite copy, only implement it.

---

## GLOBAL RULES (apply to every phase)

1. One phase = one goal = one commit (or small commit series). Do not start the next phase's work early.
2. Minimal files per step. If a phase spec doesn't list a file, don't create it.
3. No hidden behavior: no i18n libraries, no CMS, no CSS-in-JS, no state libraries. Content lives in typed TS/MDX files.
4. Every phase ends with the ACCEPTANCE CHECK section executed and reported.
5. TypeScript strict mode. No `any` unless justified in a comment.
6. Comments only where a decision isn't obvious from the code.
7. Accessibility floor: semantic HTML, visible keyboard focus, `prefers-reduced-motion` respected, WCAG AA contrast.
8. If something in this plan conflicts with reality (library version, API change), stop, state the conflict, propose the minimal fix, wait for approval.

## STACK (locked)

- Next.js 15+ (App Router, static export where possible)
- Tailwind CSS v4 (CSS-first config via `@theme`)
- MDX via `@next/mdx` for case studies only
- No database, no auth, no server actions in v1
- Deploy target: Cloudflare Workers (static assets)

## FOLDER STRUCTURE (target, built incrementally)

```
/
├── app/
│   ├── [locale]/                 # 'en' | 'sr' — manual, no library
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home
│   │   ├── services/page.tsx
│   │   ├── ai-assessment/page.tsx
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privacy/page.tsx
│   ├── layout.tsx                # root: html, fonts, theme
│   ├── globals.css               # tokens + base styles
│   └── sitemap.ts / robots.ts    # Phase 7
├── components/                   # only shared components
├── content/
│   ├── en/                       # site copy as typed TS objects
│   ├── sr/                       # Phase 7
│   └── work/                     # MDX case studies (en first)
├── lib/                          # locale helpers, content loaders
└── public/                       # og images, favicon, assets
```

---

## PHASE 1 — Repo + Design System

**Goal:** Running Next.js app with the complete design token system and zero pages beyond a token showcase.

**Design direction (locked): "Blueprint Terminal."**
Engineering/terminal spirit, but NOT the generic black + acid-green look. Reference world: engineering schematics, server rack labels, archival file systems — the actual materials of Rade's work (EPYC servers, RAG archives, prepress precision).

Tokens (define in `globals.css` via Tailwind v4 `@theme`):

- **Color:**
  - `--color-ink: #0E1420` (deep blue-black base — not pure black)
  - `--color-panel: #161E2E` (raised surfaces)
  - `--color-line: #2A3548` (hairlines, borders)
  - `--color-text: #D6DBE4` (primary text)
  - `--color-muted: #8B94A7` (secondary text)
  - `--color-amber: #E8A33D` (single accent: links, status, CTA)
  - `--color-ok: #4C9A6E` (used ONLY for status indicators, sparingly)
- **Type:**
  - Display + body: IBM Plex Sans (self-hosted via `next/font`)
  - Utility/mono: IBM Plex Mono — used for: file-path breadcrumbs, stack lists, status labels, numbers. Never for body paragraphs.
  - Scale: 1.250 ratio, base 16px. Define as `--text-*` tokens.
- **Signature element (the one memorable thing):** the "system status" strip — a thin mono-font bar used as a structural device across the site: on Home it shows proof metrics (`uptime: 30y · deployments: 2 · maps_views: 60M+`), on case studies it shows the stack (`stack: fastapi · qdrant · bge-m3`), on the assessment page the timeline (`day 01–03: audit`). It encodes real information, never decoration.
- **Spacing/layout:** max-width 72rem, generous vertical rhythm (`--space-section: clamp(4rem, 10vh, 7rem)`), 1px hairlines from `--color-line`, border-radius 2px (near-sharp, schematic feel).
- **Motion:** one orchestrated page-load reveal (status strip "types in" once, respecting reduced-motion). No scroll-jacking, no parallax.

**Files:**
- Standard `create-next-app` output (TS, Tailwind, App Router, no src dir)
- `app/globals.css` — all tokens
- `app/layout.tsx` — fonts, html shell
- `app/page.tsx` — temporary token showcase (type scale, colors, status strip demo). Deleted in Phase 2.
- `components/StatusStrip.tsx` — the signature component: props `items: {label: string; value: string}[]`

**ACCEPTANCE CHECK:**
- `npm run build` passes, zero TS errors
- Token showcase renders all colors/type sizes
- StatusStrip renders, animation respects `prefers-reduced-motion`
- Lighthouse a11y ≥ 95 on the showcase page

---

## PHASE 2 — Locale Routing + Layout Shell

**Goal:** `[locale]` routing (en/sr), shared layout with nav and footer. English only populated; `sr` routes render EN content as placeholder.

**Approach:**
- `lib/i18n.ts`: `const locales = ['en','sr'] as const`, `defaultLocale = 'en'`, type `Locale`.
- `middleware.ts`: redirect `/` → `/en`. Nothing else — no cookie detection, no Accept-Language magic in v1.
- `app/[locale]/layout.tsx`: validates locale param (404 on unknown), renders `<Nav>` and `<Footer>`.
- `components/Nav.tsx`: logo/name left (`radosav brdar` + `identitet` as mono suffix), links: Work · Services · AI Assessment · About · Contact. Locale switcher (EN/SR) right — plain link swapping the locale segment. Mobile: simple disclosure menu, no library.
- `components/Footer.tsx`: contact links, privacy link, imprint line.

**Files:** `middleware.ts`, `lib/i18n.ts`, `app/[locale]/layout.tsx`, `components/Nav.tsx`, `components/Footer.tsx`, placeholder `app/[locale]/page.tsx`. Delete Phase 1 showcase.

**ACCEPTANCE CHECK:**
- `/` redirects to `/en`; `/en` and `/sr` render; `/xx` returns 404
- Nav works on mobile (375px) and desktop; keyboard navigable
- Locale switcher preserves current path (`/en/work` → `/sr/work`)

---

## PHASE 3 — Content Layer + Home

**Goal:** Typed content system + complete Home page per the final tournament version ("Own What You Build").

**Approach:**
- `content/types.ts`: interfaces for HomeContent, ServiceContent, etc.
- `content/en/home.ts`: full Home copy from `website-copy-tournament.md` PART 5 → HOME. Verbatim.
- `lib/content.ts`: `getContent(locale, page)` — imports from `content/{locale}/`, falls back to `en` when the sr file doesn't exist. Explicit, no dynamic magic beyond a simple map.
- Home sections as local components inside `app/[locale]/page.tsx` unless reused elsewhere (only StatusStrip and a `CaseCard` are shared):
  1. Hero (headline, subline, identity line, two CTAs)
  2. Sovereignty beat
  3. Three services (ownership-framed, each ending with mono "what you own" line)
  4. Differentiation block ("you work directly with the person who builds it")
  5. Proof strip — 4 `CaseCard`s (title, one-line problem, mono stack, outcome) — hardcoded stubs for now, wired to real case data in Phase 5
  6. Credibility StatusStrip
  7. CTA block ("Someone probably sent you here.")

**Files:** `content/types.ts`, `content/en/home.ts`, `lib/content.ts`, `components/CaseCard.tsx`, `app/[locale]/page.tsx`.

**ACCEPTANCE CHECK:**
- Home renders all 7 sections with tournament copy, EN
- No copy hardcoded in JSX — everything from `content/en/home.ts`
- Responsive 375px–1440px; build passes

---

## PHASE 4 — Services + AI Assessment

**Goal:** Two pages, copy from the tournament documents.

**Approach:**
- `content/en/services.ts`: intro line + three services (Private AI / Web Platforms / Brand to Product) with full copy from tournament PART 5 → SERVICES. Each service: hook, description, bullet list, engagement note (AI service only), "what you own" line.
- `app/[locale]/services/page.tsx`: one page, three anchored sections (`#private-ai`, `#web`, `#brand`). Private AI section links prominently to `/ai-assessment`.
- `content/en/assessment.ts`: full copy from `ai-assessment-tournament.md` PART 4. Price stays as visible placeholder `[X] €` — flagged, not invented.
- `app/[locale]/ai-assessment/page.tsx`: hero → three questions → 14-day timeline (StatusStrip used per phase: `day 01–03 · data audit`) → "the document is yours" → fixed-price rationale → who this is for → CTA.

**Files:** `content/en/services.ts`, `content/en/assessment.ts`, two page files.

**ACCEPTANCE CHECK:**
- Both pages render full copy; anchors work; assessment page linked from Services and Nav
- Placeholder price clearly marked with a TODO comment in content file
- Build passes; responsive check

---

## PHASE 5 — Work System + Case Studies

**Goal:** MDX-based case study system, index page, and 5 case studies with real content.

**Approach:**
- MDX via `@next/mdx`, files in `content/work/*.mdx` with typed frontmatter: `title, slug, sector, year, problem (one line), stack (string[]), outcome (one line), metric (optional {value, label}), featured (boolean), order`.
- `lib/work.ts`: loads all MDX frontmatter, sorted, filtered by `featured` for Home.
- `app/[locale]/work/page.tsx`: intro line + grid of CaseCards.
- `app/[locale]/work/[slug]/page.tsx`: case template — Context / Solution / Stack (StatusStrip) / Outcome, per V3 format.
- Case studies (initial drafts from known project facts; Rade reviews and supplies the hard numbers before launch):
  1. `archive-rag.mdx` — Historical Archive RAG (FastAPI, Qdrant, BGE-M3, hybrid search, multi-tenant, OCR pipeline)
  2. `tennis-club-saas.mdx` — TK Žak OS (Next.js, Prisma, PostgreSQL, bookings, memberships, Telegram, PWA)
  3. `cosmetics-brand.mdx` — Skinissima (brand foundation → identity → Next.js 16/Tailwind v4 site)
  4. `legal-ai.mdx` — Pravni Savetnik (regional legal RAG)
  5. `agritech-platform.mdx` — agrobudget (web + interactive product presentation)
- Wire Home proof strip to `featured` cases (replace Phase 3 stubs).
- Client-sensitive details: describe by sector and problem, name brands only where Rade confirms permission (Skinissima yes; others — mark `TODO: confirm naming` in frontmatter comment).

**ACCEPTANCE CHECK:**
- `/en/work` lists 5 cases; each slug page renders; Home shows 4 featured
- Every case has all frontmatter fields; missing metrics marked TODO
- Build passes with static generation for all slugs

---

## PHASE 6 — About, Contact, Privacy

**Goal:** Remaining pages, EN.

**Approach:**
- `content/en/about.ts` + page: compressed arc (tournament copy), "how I work" block (phases, direct communication, fixed scopes), infrastructure line ("my own inference infrastructure — no rented magic").
- `content/en/contact.ts` + page: "Bring your problem, not a brief." Email (mailto), LinkedIn, optional booking link (placeholder URL, TODO). No form in v1 — no backend, nothing to maintain.
- `app/[locale]/privacy/page.tsx`: privacy policy + imprint. Draft covering: no cookies beyond analytics (see Phase 8 decision), contact data handling, business identity (identitet, Sombor, Serbia). Mark legal review TODO.

**ACCEPTANCE CHECK:** all three pages render, footer links resolve, build passes.

---

## PHASE 7 — SEO/GEO + Serbian Locale

**Goal:** Metadata, structured data, and full SR translation.

**Approach:**
- `generateMetadata` per page: title template `%s — Radosav Brdar`, descriptions from content files, canonical + `hreflang` alternates (en/sr).
- OpenGraph: one static OG image template (blueprint-terminal styled, generated once, stored in `public/og/`), per-page title overlay optional — keep simple, static images per page are fine.
- JSON-LD: `Person` + `ProfessionalService` on Home, `Service` on assessment page, `Article`-like `CreativeWork` on case studies.
- `app/sitemap.ts` + `app/robots.ts` — both locales, all routes.
- SR translation: create `content/sr/*.ts` mirroring EN. Translation rules: professional Serbian (latinica), NOT literal — "Own what you build" needs a proper equivalent (working options to present: „Sistemi koji ostaju tvoji" / „Ono što napravimo — tvoje je"; Rade picks). Technical terms (RAG, deployment) stay English where Serbian would sound forced.
- Fallback removal check: `sr` routes must now serve SR content everywhere.

**ACCEPTANCE CHECK:**
- All pages have unique title/description; hreflang pairs validate
- JSON-LD passes Google Rich Results test structure (validate syntax locally)
- `/sr/*` fully translated, no EN fallbacks remain

---

## PHASE 8 — Deploy + Analytics

**Goal:** Live on Cloudflare Workers (static assets) with custom domain.

**Note:** Cloudflare's 2026 recommendation for new projects is Workers with static assets, not Pages (Pages remains supported but all new platform features land on Workers first). Same push-to-deploy workflow, same free static asset serving.

**Approach:**
- Static export (`output: 'export'`) — preferred. Deploy the `out/` directory as Worker static assets: `wrangler.jsonc` with `assets: { directory: "./out", not_found_handling: "404-page" }`, no `main` script needed. If MDX setup blocks static export, use the OpenNext Cloudflare adapter (`@opennextjs/cloudflare`); state which and why.
- Git-connected Workers Builds on the repo, production branch `main` (preview URLs for non-production branches enabled).
- Domain: `radosavbrdar.com` (assumption — Rade confirms before this phase; DNS on Cloudflare).
- Analytics: Cloudflare Web Analytics (cookieless — keeps privacy page honest and GDPR posture clean). No Google Analytics in v1.
- Redirect rules: apex → canonical host, `/` → `/en`. Static export drops Next.js middleware, so implement the locale redirect explicitly: a `_redirects` file in the assets directory (supported natively by Workers static assets) — one explicit rule, no magic.
- Pre-launch checklist: all TODOs resolved (price, booking URL, case metrics, client naming permissions, legal review), Lighthouse ≥ 95 across categories on Home and Assessment, 404 page styled.

**ACCEPTANCE CHECK:**
- Production URL live over HTTPS, both locales
- Analytics receiving events; no cookies set
- All Phase 4–6 TODOs closed or explicitly accepted by Rade

---

## PHASE 9 (FUTURE, not in v1) — Insights

Blog/GEO play. Only when 5–6 articles exist. MDX in `content/insights/`, same pattern as work. Do not scaffold in advance.

---

## OPEN ITEMS FOR RADE (not the agent)

1. **Assessment fixed price** — needed by Phase 4 launch-readiness.
2. **Hard metric per case study** — documents indexed, members served, companies on platform, load times. Needed by Phase 5 review.
3. **Client naming permissions** — which projects can be named vs. described by sector.
4. **Domain confirmation** — radosavbrdar.com availability/purchase before Phase 8.
5. **Booking tool** — Cal.com/Calendly link or plain email for v1.
6. **NDA template** — for the day-8 PoC promise on the assessment page (business process, not site code).
