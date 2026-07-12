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

### 007 — Phase 7: SEO/GEO + Serbian Locale — 2026-07-12
STATUS: DONE
COMMITS: pending
MODEL: Fable 5 / Claude Code

RESOLVED DECISIONS FROM RADE (given at phase start):
- **Domain correction:** only `radosavbrdar.com` was registered — no `radebrdar.com`, no 301 redirect. Entry 006's domain note corrected in place per Rade's instruction. Canonical URLs throughout this phase use `https://radosavbrdar.com` (`SITE_URL` in `lib/site.ts`).
- **Translation rules binding:** content-of-record PART 5 — srpska latinica, persiranje (Vi), locked-translations table byte-exact, stay-English terms stay English, product is „AI Snimak stanja" (never „procena"), „Own What You Build" → „Vaše je ono što napravimo". Verified byte-exact against the doc (including its quote convention: opening U+201E „, closing ASCII ").
- **JSON-LD facts:** contact email `hello@radosavbrdar.com`; LinkedIn still TODO → `sameAs` omitted entirely rather than invented (verified absent in rendered output).

DONE:
- `content/sr/{home,services,assessment,about,contact,privacy}.ts` — full SR translation mirroring EN, all locked-table lines exact, same open-TODO comments (LinkedIn, booking tool, legal review, APR) carried over.
- `lib/content.ts` — sr registered; the en-fallback mechanism REMOVED: `Record<Locale, ContentMap>` (no `Partial`), so a missing SR page is now a compile error. One defensive `?? content.en` remains in `getContent` solely for bogus-locale requests (see the /xx 404 fix below), not as a content fallback — TS makes an incomplete locale impossible.
- `content/ui.ts` (new) — locale-keyed chrome: nav/footer labels, mobile menu open/close, nav aria-labels. SR: Radovi / Usluge / AI Snimak stanja / O meni / Kontakt / Privatnost; footer imprint line „Sombor, Srbija". These labels double as the page `<title>`s so nav and metadata can't drift.
- `components/Nav.tsx`, `components/Footer.tsx` — read labels from `content/ui.ts` instead of hardcoded EN.
- `app/[locale]/layout.tsx` — now the ROOT layout (html/body/fonts moved here from `app/layout.tsx`, which is deleted) so `<html lang>` is per-locale ("en"/"sr") instead of hardcoded "en" — Next's own documented App Router i18n pattern. Also carries `metadataBase` + title template `%s — Radosav Brdar` and `dynamicParams = false` (see below).
- `lib/seo.ts` (new) — `pageMetadata()` (canonical + en/sr/x-default hreflang alternates + OG/twitter defaults) and the shared JSON-LD builders (`personJsonLd`, `studioJsonLd`, `jsonLdString` with `<`-escaping).
- `generateMetadata` on all 8 page files — titles from `content/ui.ts` labels (case pages: frontmatter title; Home: absolute title "Radosav Brdar · identitet studio"), descriptions verbatim from content-file sentences, nothing invented.
- JSON-LD: Home = `Person` + `ProfessionalService` (@graph, studio description = locale's sovereignty paragraph); Assessment = `Service` („AI Snimak stanja" on SR) with the two resolved public offers (3000/4500 EUR, descriptions = the priceLine's own variants); case pages = `CreativeWork` (author→Person, description = frontmatter problem, keywords = stack, `inLanguage: "en"`).
- `app/sitemap.ts` — 24 URLs (12 routes × 2 locales), each with en/sr `xhtml:link` alternates (48 total); `app/robots.ts` — allow all + sitemap URL. Both static-export-safe.
- `public/og/og-default.png` — one static 1200×630 blueprint-terminal OG image (ink bg, hairline frame, amber `radosavbrdar.com` mono line, hero headline, footer imprint line — all existing copy), rendered with the project's own built IBM Plex woff2 files via headless Chrome; referenced by every page.
- `app/[locale]/work/page.tsx` — `INTRO` became `Record<Locale, string>` with the SR translation; work-index metadata from it.
- Fixed: `/xx` (invalid locale) returned 500 after the root-layout move — a page's `generateMetadata` ran `getContent("xx")` before the layout's `notFound()`, and a root-layout `notFound()` has no parent boundary. Fix: `dynamicParams = false` on the `[locale]` segment (unknown locales 404 at routing level) + the defensive locale guard in `getContent`. `/xx` and `/en/xx` → 404 verified; `/` → 307 `/en` unchanged.

ACCEPTANCE CHECK:
- [x] All pages have unique title/description; hreflang pairs validate — scripted check over all 24 pages: titles unique within each locale (Home + case pages intentionally share titles ACROSS locales — proper names/EN case titles — each pair correctly hreflang-linked); every page has a non-empty description from content, correct self-canonical, and en/sr/x-default alternates pointing at the right pair. Note: Next serializes the attribute as `hrefLang` — valid HTML (attribute names are case-insensitive), validated case-insensitively.
- [x] JSON-LD passes structure (validated locally) — every `application/ld+json` block on all 24 pages `JSON.parse`s; shapes verified: Person+ProfessionalService on both Home locales, Service with 2 EUR offers on both assessment locales, CreativeWork with author/dateCreated/keywords on case pages; `sameAs` confirmed absent. (Google's hosted Rich Results test needs a public URL — run post-deploy in Phase 8.)
- [x] `/sr/*` fully translated, no EN fallbacks remain — `getContent` fallback removed (type-enforced complete locale map); rendered-HTML scan of all 7 /sr pages against 26 distinctive EN markers: zero hits; all locked-table lines verified byte-exact in rendered SR HTML; SR chrome (nav/footer/mobile menu „meni"/„zatvori") verified. CAVEAT: case-study MDX bodies + frontmatter (titles, sector labels, metric labels) remain EN on `/sr/work/*` by design — the plan's Phase 7 file list is `content/sr/*.ts` only and its folder structure marks MDX "(en first)"; flagged as an open decision for Rade, not silently skipped.
- [x] Build passes — zero TS errors, 29 static outputs (24 pages + sitemap + robots + favicon + _not-found + /); `npm run lint` still shows only the pre-existing Phase 1 StatusStrip finding.
- [x] (carried standards) No horizontal overflow on any /sr page at 375/768/1024px; SR mobile menu touch-tested (iPhone profile + touchscreen.tap: opens, all 7 SR links visible, closes) per the Phase 2 process note; desktop nav fits at 768px despite the longer „AI Snimak stanja" label (~100px clearance measured).

DEVIATIONS FROM PLAN:
- `app/layout.tsx` deleted; root layout now lives at `app/[locale]/layout.tsx` — the plan's folder diagram keeps a root `app/layout.tsx`, but a hardcoded `<html lang="en">` on /sr pages would be wrong for exactly the SEO/locale correctness this phase exists for, and Next's i18n docs use this pattern. Verified `/_not-found` still builds and 404s render.
- New files not in the plan's list: `content/ui.ts` (chrome labels had been hardcoded EN in Nav/Footer since Phase 2 — they need a locale home; also feeds page titles) and `lib/seo.ts` (8 pages share the canonical/hreflang/OG assembly — one implementation instead of eight copies). Both minimal, no scope creep.
- Nav/page-title labels („Radovi", „O meni", page titles like "Work") are new SR/EN strings not in any copy doc — structural chrome, same category as Phase 3's StatusStrip labels. Flagged for Rade's review, as are the translated credibility-strip labels (`iskustvo`/`doseg`/`deployments`/`platforma`).
- Sovereignty heading: EN page copy says "should never leave"; the locked table locks the plain "Your data never leaves your building." → „Vaši podaci nikada ne napuštaju vašu zgradu." Rendered SR adds the modal to match the page copy: „Vaši podaci nikada ne bi trebalo da napuštaju vašu zgradu." (locked wording + „ne bi trebalo"). Same treatment for the two other locked lines that appear embedded in longer sentences (assessment headline's trailing clause; differentiation body's comma form).
- The locked table itself capitalizes Vas/Vašu mid-sentence in some rows but writes „vašu zgradu"/„vašem trošku" lowercase in others; locked lines kept exactly as written, and my own translations use capital-V persiranje consistently. Flagged so Rade can normalize later if he wants — changing locked lines wasn't my call.
- OG image is ONE static site-wide image (the plan explicitly allows this) and carries the EN hero headline — an SR share will show an EN card. Making an SR variant is a 10-minute follow-up if Rade wants it.
- JSON-LD `Offer` prices (3000/4500 EUR) are on the page as public copy since Phase 5 — not a new disclosure, just machine-readable.
- `/xx` 404 fix required `dynamicParams = false` + a locale guard in `getContent` (details in DONE) — behavior-preserving vs. Phase 2 (404), needed only because the root layout moved.

OPEN TODOs INTRODUCED:
- SR case studies: `/sr/work/*` serves EN prose with SR chrome. Decision for Rade — translate the 5 MDX files (new `content/work/sr/` or per-file variants) or ship v1 with EN case studies.
- OG image SR variant (see DEVIATIONS) — optional.
- Carried, unchanged: LinkedIn URL (still `"#"`+omitted from sameAs), booking tool (mailto stand-in), privacy legal review, APR matični broj/PIB, two case metrics (cosmetics, agritech), archive-rag latency number.

NEXT STEP:
- Rade reviews: (1) the SR translation quality page-by-page, (2) chrome labels + credibility-strip labels, (3) the sovereignty-heading modal treatment, (4) EN-case-studies-on-/sr decision, (5) OG card look. Then Phase 8: Deploy + Analytics (static export, Cloudflare Workers, `_redirects` for `/` → `/en`, Cloudflare Web Analytics, styled 404, pre-launch TODO sweep). Post-deploy: run the hosted Google Rich Results test on the live URLs.

### 006 — Phase 6: About, Contact, Privacy — 2026-07-12
STATUS: DONE
COMMITS: ba4ccd2 (code + this entry), follow-up hash-record commit
MODEL: Sonnet 5 / Claude Code

RESOLVED DECISIONS FROM RADE (applied before/during this phase):
- **Domain confirmed:** `radosavbrdar.com` is canonical. ~~`radebrdar.com` will 301 to it~~ — **[CORRECTED 2026-07-12, per Rade at Phase 7 start: only `radosavbrdar.com` was registered; there is no `radebrdar.com` and no 301 redirect to plan for.]** Pure DNS/deploy concern, no code change here — noting for Phase 8, which already plans domain + redirect rules.
- **Contact email confirmed:** `hello@radosavbrdar.com` (resolves the Contact-page TODO). Added `lib/site.ts` (`CONTACT_EMAIL`, `CONTACT_MAILTO`) as the single source for this fact, since it now appears in `content/en/{home,assessment,contact,privacy}.ts` — four content files, not the "few similar lines" threshold, enough to risk drift if it's ever revised again.
- Applied it to Phase 3's four `href="#"` CTAs in `content/en/home.ts`: `cta.links` "Email" → resolved mailto (TODO fully closed); hero "Book a call" and `cta.links` "Book a call" → mailto too, but via the booking-tool fallback logic (point 4 below), not the email resolution itself — that's what "hero excluded, see 4" meant. `cta.links` "LinkedIn" stays `"#"` (still open, point 3).
- **LinkedIn:** still TODO, left flagged in `content/en/contact.ts` and `content/en/home.ts`.
- **Booking tool:** still TODO. Per Rade, "Book a call"-type CTAs point at `CONTACT_MAILTO` for v1 with a comment noting a booking link may replace it. Applied to all such CTAs site-wide, including `content/en/assessment.ts`'s "Book the assessment" and "Book the call" (and its "Email" link) — Rade's instruction named Phase 3's four links specifically, but Phase 4's assessment page carries the identical unresolved facts (same email, same booking-tool gap); leaving it inconsistent would have read as a bug, not an open TODO. Flagging this as an inference beyond the literal instruction.
- **Privacy/imprint:** implemented `content-of-record-completion.md` PART 4 verbatim, "[email]" → `hello@radosavbrdar.com`. Legal-review status and the APR matični broj/PIB gap are `TODO` code comments in `content/en/privacy.ts`, not rendered — confirmed via grep that no "TODO" string reaches any Phase 6 page's HTML.

DONE:
- `content/types.ts` — added `AboutContent`, `ContactContent`, `PrivacyContent`.
- `content/en/about.ts` — verbatim from `content-of-record-completion.md` PART 2 (the "full copy" version, superseding the shorter tournament-doc draft). "How I work" renders as a real heading (it was bolded in the source, unlike the doc's own non-rendered organizational labels "Hero:"/"The arc:"/"The studio:").
- `content/en/contact.ts` — verbatim from PART 3, with the resolved email/booking treatment above.
- `content/en/privacy.ts` — verbatim from PART 4 (draft), resolved email, both remaining TODOs kept as comments only. Not explicitly listed as a file in the plan's Phase 6 Approach (only `app/[locale]/privacy/page.tsx` is named) — created it anyway for consistency with every other page's architecture (typed content file + `getContent()`, zero hardcoded copy in JSX) and because Phase 7's `content/sr/*.ts` mirroring needs the same shape this page has for every other route. Flagged as a deviation from the plan's literal file list.
- `lib/site.ts` — `CONTACT_EMAIL` / `CONTACT_MAILTO` constants (see above).
- `lib/content.ts` — registered `about`/`contact`/`privacy` in `ContentMap`.
- `app/[locale]/about/page.tsx`, `app/[locale]/contact/page.tsx`, `app/[locale]/privacy/page.tsx` — new pages, all reading only from their content files.
- Fixed a latent bug in `app/[locale]/page.tsx` and `app/[locale]/ai-assessment/page.tsx`'s `href()` helpers: they only special-cased the literal `"#"` placeholder, so a `mailto:` link introduced by this phase would have been wrongly locale-prefixed (`/en mailto:...`). Now anything not starting with `/` passes through unchanged.

ACCEPTANCE CHECK:
- [x] All three pages render — verified via curl (200 on `/en` and `/sr` for `about`/`contact`/`privacy`) and Puppeteer screenshots (desktop + mobile, all three).
- [x] Footer links resolve — `/contact` and `/privacy` (already linked from Footer since Phase 2) now render real content instead of 404ing.
- [x] Build passes — zero TS errors, all 6 new routes (3 pages × 2 locales) prerendered static.
- [x] (carried standard) No horizontal overflow at 375px on any of the three pages; `npm run lint` shows only the pre-existing Phase 1 `StatusStrip.tsx` finding.
- [x] Verified the email/booking resolution end-to-end: curl-grepped rendered HTML across Home, Assessment, and Contact — `mailto:hello@radosavbrdar.com` present everywhere expected, `href="#"` remains only on LinkedIn (both still-open items), no "TODO" string reaches any page's HTML.

DEVIATIONS FROM PLAN:
- Created `content/en/privacy.ts` though the plan's Phase 6 Approach only lists `app/[locale]/privacy/page.tsx` for Privacy (unlike About/Contact, which explicitly pair a content file with their page) — see DONE above for reasoning.
- Extended the email/booking-tool resolution to Phase 4's `content/en/assessment.ts`, which Rade's instruction didn't explicitly name (it named "the four href='#' CTA links from Phase 3") — done for internal consistency, since the underlying facts are identical. Flagged above and here for visibility.
- `lib/site.ts` is a new, small shared-constants file — not listed anywhere in the plan. Justified by the email fact now appearing in four content files; kept to two exported constants, no broader "site config" scope creep.

OPEN TODOs INTRODUCED:
- None new. Carried forward and still open: LinkedIn URL, booking-tool choice (mailto is the v1 stand-in per Rade), Privacy page's legal review, and the Imprint's APR matični broj/PIB. All exist only as code comments, never rendered.

NEXT STEP:
- Rade reviews About/Contact/Privacy (especially the "How I work" heading treatment and the mailto fallback for "Book a call") → then Phase 7: SEO/GEO + Serbian Locale (`generateMetadata` per page, JSON-LD, sitemap/robots, `content/sr/*.ts` full translation — domain is now confirmed, so canonical URLs can be set for real).

### 005 — Phase 5: Work System + Case Studies — 2026-07-12
STATUS: DONE
COMMITS: f94d2b4 (code + this entry), follow-up hash-record commit
MODEL: Sonnet 5 / Claude Code

RESOLVED DECISIONS FROM RADE (applied before starting this phase):
- `archive-rag.mdx`: corpus is 10,649 pages (1 page = 1 vector). `problem` updated "100k+" → "10,000+"; `metric: { value: "10,649", label: "pages indexed" }`. The Context paragraph's "tens of thousands of pages" phrase was also corrected to "10,000+ pages" for the same reason (not explicitly named by Rade, but the identical fact restated less precisely two sentences later — see DEVIATIONS). Query-latency TODO remains open.
- `tennis-club-saas.mdx`: `metric: { value: "121", label: "active members" }`. Outcome text now ends "...150+ reservations per week in season, self-service." (Rade's source: June 2026 report, 738 reservations / ~170 per week average; 150+ is the conservative public claim — the raw report numbers are **not** published on the page, only the public claim, same treatment as the founding-client rate in Phase 4.) Both TODOs in this file now resolved, none remain.
- `agritech-platform.mdx`: naming permission granted. Title, Context, Solution, and Outcome now name "agrobudget" directly (previously anonymized as "an agritech SaaS"/"the client"). Metric TODO remains open (traffic/demo-request delta).
- `legal-ai.mdx`: no change — municipality naming stays sector-level per the content doc; TODO remains open.
- `cosmetics-brand.mdx`: no change — metric TODO remains open (Skinissima naming was already resolved in DEV-LOG 000, before Phase 3).
- `content/en/assessment.ts`: hero price line resolved to exactly "Fixed price: 3.000 € (remote) · 4.500 € with on-site days (EU, travel included)" — closes the on-site-phrasing TODO opened in Phase 4 (DEV-LOG 004).

DONE:
- Installed `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`; configured `next.config.ts` with `createMDX({})` — no remark/rehype plugins, since case studies use a plain `export const frontmatter = {...}` object (Next's own documented pattern) instead of YAML frontmatter, avoiding Turbopack's restriction on non-serializable remark plugin options (see DEVIATIONS). Added the App-Router-required `mdx-components.tsx` at the root, mapping `h2`/`p` to Blueprint Terminal typography so case-study prose is styled without per-file markup.
- `content/work/*.mdx` — 5 case studies (`archive-rag`, `tennis-club-saas`, `cosmetics-brand`, `legal-ai`, `agritech-platform`), each: `export const frontmatter` (title/slug/sector/year/problem/stack/outcome/metric/featured/order, matching the plan's typed shape) + `## Context` / `## Solution` / `## Stack` (a single-item `StatusStrip` driven by `frontmatter.stack`, so the mono tech list is never duplicated) / `## Outcome`, verbatim from `content-of-record-completion.md` PART 1 with Rade's resolutions applied.
- `content/work/mdx.d.ts` — augments `declare module "*.mdx"` with the `frontmatter: CaseFrontmatter` named export (`@types/mdx` only types the default export by design; this is its own documented extension point).
- `lib/work.ts` — `getAllCases()` / `getFeaturedCases()` / `getCaseBySlug(slug)`, explicit static-import map (no filesystem globbing), sorted by `order`.
- `content/types.ts` — added `CaseMetric`, `CaseFrontmatter` (replacing Phase 3's `CaseStub`); `HomeContent.proof` no longer carries `cases` (sourced from `lib/work.ts` now); `AssessmentContent.hero` collapsed `price`+`deliveryNote` into one `priceLine` field to hold Rade's exact resolved sentence.
- `components/CaseCard.tsx` — now takes `caseData: CaseFrontmatter` + `locale`, and is a real `Link` to `/work/[slug]` (previously a static, unlinked card — there was nothing to link to before this phase).
- `app/[locale]/work/page.tsx` — intro line (verbatim, "Five projects, curated...") + grid of all 5 `CaseCard`s.
- `app/[locale]/work/[slug]/page.tsx` — header (sector · year, title, metric — hidden when a metric's `value` is literally `"TODO"`, so unresolved metrics never render to visitors) + the compiled MDX body. `generateStaticParams` from `getAllCases()`, `dynamicParams = false` (unknown slugs hard-404).
- `app/[locale]/page.tsx` (Home) — proof strip now renders `getFeaturedCases()` via `CaseCard`, replacing Phase 3's hardcoded stub array.
- `content/en/assessment.ts`, `app/[locale]/ai-assessment/page.tsx` — price line resolved per Rade (see above); page now renders `content.hero.priceLine` directly.

ACCEPTANCE CHECK:
- [x] `/en/work` lists 5 cases; each slug page renders; Home shows 4 featured — verified via curl (200 on all 5 case pages + index, both locales) and a Puppeteer screenshot of `/en/work` (all 5 titles, including "...for agrobudget"); grepped `/en`'s rendered HTML for case `<h3>`s — exactly the 4 `featured: true` titles, `agritech-platform` correctly absent.
- [x] Every case has all frontmatter fields; missing metrics marked TODO — all 5 files carry the full `CaseFrontmatter` shape; `cosmetics-brand` and `agritech-platform` keep `metric.value: "TODO"` in the content file (satisfies the acceptance check) while the page template hides that field from the rendered page rather than showing visitors the literal word "TODO" — confirmed via curl grep, no "TODO" string reaches either page's HTML.
- [x] Build passes with static generation for all slugs — zero TS errors; build output shows `/[locale]/work/[slug]` prerendered for all 5 slugs × 2 locales (confirmed the 10 `.html` files directly in `.next/server/app/`); `/en/work/nonexistent-slug` → 404 (via `dynamicParams = false`).
- [x] (carried standard) No overflow at 375px on `/work`, a case page, and Home; `npm run lint` shows only the pre-existing Phase 1 `StatusStrip.tsx` finding, nothing new.

DEVIATIONS FROM PLAN:
- Plan says "typed frontmatter" in `.mdx` files; implemented as a plain `export const frontmatter = {...}` JS object rather than YAML frontmatter + `remark-frontmatter`/`remark-mdx-frontmatter`. This is Next's own documented recommendation for `@next/mdx` (which doesn't support YAML frontmatter itself) and — per the Next docs bundled in `node_modules` — YAML-frontmatter remark plugins hit a real restriction under Turbopack ("remark and rehype plugins without serializable options cannot be used yet with Turbopack, because JavaScript functions can't be passed to Rust"), which this project uses by default. The object is still fully typed (`content/work/mdx.d.ts`) and satisfies every field the plan lists.
- "Stack (StatusStrip)" is implemented as a `## Stack` heading inside each `.mdx` body containing `<StatusStrip items={[{ label: "stack", value: frontmatter.stack.join(" · ") }]} />`, rather than the page template splitting the compiled MDX output to inject a component between Solution and Outcome (not possible — a compiled MDX file is one atomic component). This keeps `Context → Solution → Stack → Outcome` in the plan's exact order and the stack list has one source of truth (`frontmatter.stack`), at the cost of each `.mdx` file needing one `import` + one JSX line rather than being pure prose.
- `archive-rag.mdx`'s Context paragraph ("tens of thousands of pages") was corrected to "10,000+ pages" alongside the explicitly-named frontmatter `problem` field — Rade named only the frontmatter line, but the Context prose restates the identical fact with the same now-corrected imprecision; leaving it would have shipped a page where two sentences about the same corpus disagreed by roughly 2x. Flagging since it's an inference beyond the literal instruction, not a literal quote from Rade.
- `agritech-platform.mdx`: naming substitutions beyond the frontmatter `title` (Context: "An agritech SaaS for farm budgeting and management" → "agrobudget, an agritech SaaS for farm budgeting and management,"; Solution: "the client's" → "agrobudget's"; Outcome: "the client" → "agrobudget") — the source doc's own anonymization existed only because naming wasn't cleared (its own TODO said so); once granted, applying the name consistently throughout rather than only in the title avoids an inconsistent case study.
- `CaseCard` now requires a `locale` prop and renders as a `Link` to `/work/[slug]` — it had nothing to link to in Phase 3 (no case pages existed yet); this phase gives it somewhere to go, matching plan intent ("wire Home proof strip to real case data") more literally than a static card would.

OPEN TODOs INTRODUCED:
- None new. Carried forward, all pre-existing and explicitly left open per Rade: `archive-rag.mdx` query-latency number; `cosmetics-brand.mdx` and `agritech-platform.mdx` metrics; `legal-ai.mdx` municipality-naming permission. All four are `// TODO:`/`{/* TODO: */}` comments in their content files, not rendered to visitors.

NEXT STEP:
- Rade reviews the 5 case pages (especially the agrobudget naming and the tennis-club reservations claim) → then Phase 6: About, Contact, Privacy (`content/en/about.ts`, `content/en/contact.ts`, `app/[locale]/privacy/page.tsx`).

### 004 — Phase 4: Services + AI Assessment — 2026-07-12
STATUS: DONE
COMMITS: 1832089 (code + this entry), follow-up hash-record commit
MODEL: Sonnet 5 / Claude Code

DONE:
- `content/types.ts` — added `ServiceDetail`, `ServicesPageContent`, `AssessmentTimelinePhase`, `AssessmentContent`.
- `content/en/services.ts` — verbatim from `website-copy-tournament.md` PART 5 → SERVICES: intro line + three services (`private-ai`, `web`, `brand`), each with hook/bullets/what-you-own; Private AI additionally carries the engagement note and an `assessmentCta` (see DEVIATIONS).
- `content/en/assessment.ts` — verbatim from `ai-assessment-tournament.md` PART 4: hero, 3 questions, 14-day timeline (StatusStrip data + full phase copy), "the document is yours", "why fixed price" (incl. the worst-case line + pull-quote), "who this is for", closing CTA.
- `lib/content.ts` — extended `ContentMap`/`getContent` to also serve `services` and `assessment` (en only; sr still falls back).
- `app/[locale]/services/page.tsx` — one page, three `<section id="private-ai|web|brand">` anchored sections per the plan.
- `app/[locale]/ai-assessment/page.tsx` — hero (headline, body, price line, CTA) → three numbered questions → 14-day timeline (`StatusStrip` rendering `day 01–03 · data audit` etc., exactly as the plan specifies, plus the full phase copy below it) → document-is-yours → why-fixed-price → who-this-is-for → CTA.

ACCEPTANCE CHECK:
- [x] Both pages render full copy; anchors work — verified via Puppeteer screenshots (1440px settled, 375px) plus a direct anchor-scroll test (`/en/services#web` lands the section ~27px from viewport top, correct; `#brand` — the last section — clamps at the document's max scroll position since there isn't enough trailing content to push it further, which is correct native browser behavior, not a bug).
- [x] Assessment page linked from Services and Nav — Services' Private AI section renders an "AI Assessment →" link to `/ai-assessment` (the linked text is the exact quoted term "AI Assessment" already used in the engagement-note copy, not invented marketing copy); Nav's existing "AI Assessment" link (Phase 2, previously 404ing) now resolves 200.
- [x] Placeholder price clearly marked with a TODO comment in content file — `content/en/assessment.ts` has a header comment explaining the price is Rade's already-confirmed launch-kit number (not invented) and flagging the still-open on-site/founding-rate phrasing question.
- [x] Build passes; responsive check — zero TS errors, all four new routes (`/en` + `/sr` × `/services`, `/ai-assessment`) prerendered static (200 via curl on a scratch port); `scrollWidth === clientWidth === 375` on both pages at mobile.

DEVIATIONS FROM PLAN:
- Plan says the assessment price "stays as visible placeholder `[X] €`", but DEV-LOG 000 already recorded Rade's launch-kit decision (€3.000 remote / €4.500 on-site) and explicitly said content files may use it. Used "3.000 €" (matching the tournament template's own `[X] €` number-then-symbol order) in both spots the placeholder appeared (hero price line, "Worst case" sentence). Did not surface the €4.500 on-site delta or the €2.000 founding-client rate (the latter is explicitly a private offer, not page copy) — flagged as an open TODO for Rade to decide the on-site phrasing.
- "Private AI section links prominently to `/ai-assessment`" (plan's Approach step) isn't itself copy from the tournament doc — implemented as a distinct link using the exact already-verbatim quoted term "AI Assessment" from the engagement note, rather than inventing new CTA button text.
- The 14-day timeline is plan-specified to use `StatusStrip` (`day 01–03 · data audit`); its three `value`s ("data audit", "proof of concept", "the plan") are the same words as the phase headings in the source copy, only lowercased/depunctuated to match the mono status-line convention (same treatment as Phase 3's credibility-strip labels) — the full-sentence phase copy renders unchanged directly below it.
- `ServiceDetail.description` made optional: the tournament copy's "Web Platforms & Products" entry has no descriptive sentence between its hook and bullet list (only Private AI and Brand to Product do) — left absent rather than inventing filler text.

OPEN TODOs INTRODUCED:
- `content/en/assessment.ts` — on-site price (€4.500) / founding-rate phrasing on the page, pending Rade (see DEVIATIONS).
- `content/en/assessment.ts` — "Book the assessment" and CTA-block "Book the call" / "Email" hrefs are `"#"`, same open booking-tool/contact-email items as Phase 3's Home CTAs.
- Carried from `ai-assessment-tournament.md`'s own "Open items before this page ships" list (not yet actioned, no DEV-LOG resolution exists for these unlike price): NDA microcopy near the day-8 PoC promise, and a stated capacity upper bound (document types / sample size). Left the copy as given rather than inventing either.

NEXT STEP:
- Rade reviews Services + AI Assessment (price phrasing, the "AI Assessment" link treatment) → then Phase 5: Work System + Case Studies (`/work` index + `/work/[slug]` MDX pages, wiring the same case data already used as Home's proof-strip stubs).

### 003 — Phase 3: Content Layer + Home — 2026-07-11
STATUS: DONE
COMMITS: 7d3305d (code + this entry), follow-up hash-record commit
MODEL: Sonnet 5 / Claude Code

DONE:
- `content/types.ts` — `HomeContent`, `ServiceContent`, `CaseStub`, `CTALink` interfaces. Reuses `StatusStripItem` from `components/StatusStrip.tsx` for the credibility strip rather than redeclaring it.
- `content/en/home.ts` — full Home copy, verbatim from `website-copy-tournament.md` PART 5 → HOME. Proof-strip case data (title/problem/stack/outcome) is verbatim frontmatter from `content-of-record-completion.md` PART 1, the four `featured: true` cases in their listed `order` (archive-rag, tennis-club-saas, cosmetics-brand, legal-ai) — same source Phase 5 will use for the real `/work/[slug]` pages, so Home won't drift from them later.
- `lib/content.ts` — `getContent(locale, page)`, a small `Record<Locale, Partial<ContentMap>>` map with `en` fallback for `sr`, exactly as specced (no dynamic import magic).
- `components/CaseCard.tsx` — shared component: title, one-line problem, mono `stack: a · b · c` line, outcome.
- `app/[locale]/page.tsx` — full Home, all 7 sections as local components/JSX reading only from `getContent(locale, "home")`: Hero (h1, subline, mono identity line, two CTAs), Sovereignty beat, three Services (each ending in a mono "what you own" line), Differentiation block, Proof strip (4 `CaseCard`s + "All work →"), Credibility `StatusStrip`, CTA block (Email/LinkedIn/Book a call).

ACCEPTANCE CHECK:
- [x] Home renders all 7 sections with tournament copy, EN — verified via Puppeteer screenshots (1440px settled after the StatusStrip type-in, 375px full-page) and a DOM text-content check confirming all four credibility items are present post-animation.
- [x] No copy hardcoded in JSX — every section reads from `content.*`; grepped `app/[locale]/page.tsx` for stray literal sentence strings, none found (only structural `className`s and the `href(locale, cta)` helper).
- [x] Responsive 375px–1440px; build passes — `scrollWidth === clientWidth === 375` at mobile (no horizontal overflow), zero TS errors, both locale routes prerendered as static HTML.

DEVIATIONS FROM PLAN:
- Section 6 (credibility) copy in the tournament doc is four full sentences ("30 years in visual & web technology", "60M+ views on Google Maps imagery", "2 production private-AI deployments", "400+ companies on an invoicing platform I built and maintain"), not `label: value` pairs — but `StatusStrip` (locked Phase 1 signature component) requires that shape, and Phase 1's own spec text illustrates exactly this pattern (`uptime: 30y · deployments: 2 · maps_views: 60M+`). Added four short structural labels (`experience`, `reach`, `deployments`, `platform`) not present in the source; every sentence itself is unchanged as the `value`. Flagging since "verbatim" is a hard rule — this is a structural fit, not a copy rewrite, but worth Rade's eyes.
- Proof-strip card titles use the case studies' actual frontmatter `title` field from `content-of-record-completion.md` (e.g. "Skinissima — Brand Foundation to Production Website") rather than the tournament doc's shorter descriptive label for that slot ("Natural Cosmetics Brand & Web"). Both are content-of-record; picked the frontmatter version because Phase 5 will render real `/work/[slug]` pages from that same source, so Home and Work stay consistent instead of showing two different titles for the same case.
- CTA hrefs left as `"#"` with inline `// TODO:` comments for: hero "Book a call", and CTA-block "Email" / "LinkedIn" / "Book a call" — all three depend on decisions still open per DEV-LOG 000 (contact email, LinkedIn URL, booking tool) and `content-of-record-completion.md` PART 3. Not invented. "See the work" and "All work" safely route to `/work` (internal route already established by the plan/Nav, not an invented external value).
- Confirmed via DEV-LOG 000 that Skinissima naming is already approved ("Skinissima = yes") before using it on the public Home page, even though `content-of-record-completion.md` itself still shows that case's naming as `TODO: confirm ... (assumed yes...)` — DEV-LOG is the authoritative record per protocol, and it already closed this item.

OPEN TODOs INTRODUCED:
- `content/en/home.ts` — 4 CTA hrefs (`"#"`) pending Rade: contact email, LinkedIn URL, booking-tool decision. Carried from Phase 0/Contact-page open items, not new.
- Structural StatusStrip labels on the credibility strip (see DEVIATIONS) — flagging for Rade's review, not a blocking TODO.

NEXT STEP:
- Rade reviews the Home page (copy accuracy, the credibility-strip label choice, the Skinissima title choice) → then Phase 4: Services + AI Assessment (`app/[locale]/services/page.tsx`, `app/[locale]/ai-assessment/page.tsx`, matching content files, verbatim from `website-copy-tournament.md` SERVICES section and `ai-assessment-tournament.md` PART 4).

### 002 — Phase 2: Locale Routing + Layout Shell — 2026-07-11
STATUS: DONE (reopened once after real-device smoke test — see BUG FOUND AFTER "DONE" below)
COMMITS: 3f57e93, 1ff88fb (original), d9303a2 (reopen fix + this entry), follow-up hash-record commit
MODEL: Sonnet 5 / Claude Code

DONE:
- `lib/i18n.ts` — `locales = ['en','sr']`, `defaultLocale = 'en'`, `Locale` type, `isLocale()` guard.
- `proxy.ts` (see DEVIATIONS) — redirects `/` → `/en`, matcher `"/"` only, nothing else.
- `app/[locale]/layout.tsx` — `generateStaticParams` for both locales, `notFound()` on invalid locale param, renders `<Nav>` + `<main>` + `<Footer>`.
- `components/Nav.tsx` — client component (needs `usePathname` for the locale switcher regardless of toggle mechanism): logo (`radosav brdar` + mono `identitet` suffix, suffix hidden below `sm` to keep the lockup comfortable at 375px), 5 nav links (Work/Services/AI Assessment/About/Contact — all still 404 until later phases build those routes, expected), EN/SR locale switcher (segment-replace on current pathname, so it works at any depth once nested routes exist), mobile disclosure menu built on native `<details>/<summary>` (open/close is fully browser-native, no React state — see BUG FOUND below for why).
- `components/Footer.tsx` — Contact + Privacy links, imprint line (`identitet — Radosav Brdar · Sombor, Serbia`, sourced from content-of-record PART 2; full legal imprint is a Phase 6 TODO already tracked).
- `app/[locale]/page.tsx` — placeholder Home ("home: pending Phase 3").
- Deleted `app/page.tsx` (Phase 1 token showcase).
- `app/layout.tsx` — trimmed the stale "Design system preview" metadata description left over from the showcase; final title/description marked TODO for Phase 7.

BUG FOUND AFTER "DONE" (real-device smoke test):
- First pass shipped the mobile disclosure as a `<button onClick={...}>` + `useState` toggle (React-driven). It passed every automated check at the time, including a Puppeteer `page.click()` interaction test — but Rade's real-device smoke test found that **tapping the button on an actual phone did nothing.**
- Root cause was NOT the suspected "use client" directive (it was present, correctly, from the first commit) — ruled out immediately on inspection. The `onClick`+`useState` mechanism is inherently more fragile on real touch hardware than automated mouse-click emulation reveals (hydration timing, touch-to-click synthesis, small tap targets — Puppeteer's `page.click()` dispatches a synthetic mouse event at the element's bounding-box center, which is not equivalent to a real touchstart/touchend sequence on a device).
- Fix: rebuilt the disclosure with native `<details>/<summary>` — the open/close state is now entirely browser-native (toggling the `open` attribute), so it can't be broken by React hydration races, missed touch events, or JS failing to load at all. `components/Nav.tsx` no longer imports `useState`.
- That rebuild introduced a second, genuine bug caught during the fix's own verification: the mobile-nav `<nav>` was styled `absolute inset-x-0 top-full` (to escape the header's flex row and render full-width below it). Measured via Puppeteer (`getComputedStyle` + `offsetHeight`) that this **defeated the browser's native hiding of un-opened `<details>` content** — `display` computed to `block` and the nav had nonzero height even while `<details>` was closed. Root cause not fully isolated (likely how Chrome's newer `<details>` content-hiding implementation interacts with descendants taken out of normal flow via `position: absolute`), but the fix doesn't depend on understanding it further: visibility is now explicit and self-contained — `hidden` by default, `group-open:block` when the ancestor `<details class="group">` has the `open` attribute (Tailwind's `open:`/`group-open:` variant, confirmed present in the installed Tailwind v4 build). The native open/close toggle itself is unaffected; only "how the hidden state is expressed in CSS" changed from implicit (native UA behavior) to explicit (authored classes).
- Verified with real touch emulation this time: Puppeteer `page.emulate()` with an iPhone 12 profile (`isMobile: true`, `hasTouch: true`, mobile Safari UA) + `page.touchscreen.tap()` at the summary element's actual coordinates — confirmed closed → tap → `open` attribute set + all 7 links present and visible → tap again → closes. Also re-verified keyboard access: Tab reaches the `<summary>` (native focusability), `Enter` toggles `open` natively, and subsequent Tabs walk correctly through all 7 mobile-nav links.
- Did not touch `app/not-found.tsx` or any 404 page styling — out of scope per the plan (explicitly Phase 8).

ACCEPTANCE CHECK (re-run after the fix):
- [x] `/` redirects to `/en` (307); `/en` and `/sr` render (200); `/xx` returns 404 — curl against a production build/start on a scratch port.
- [x] Nav works on mobile (375px) and desktop; keyboard navigable — this time verified with real touch emulation (Puppeteer `page.emulate()` iPhone 12 profile + `page.touchscreen.tap()`, not `page.click()`) and a Chrome-CDP screenshot of both open/closed states. Keyboard: Tab → `<summary>` focus → `Enter` opens (native) → Tab walks all 7 links in order.
- [x] Locale switcher preserves current path — segment-replace mechanism verified on `/en` → `/sr` (href resolves to `/sr`); `/en/work` → `/sr/work` from the plan's example still can't be exercised until `/work` ships in Phase 5, mechanism is depth-agnostic.
- [x] `npm run build` — zero TS errors, zero warnings, both locale routes prerendered as static HTML.

DEVIATIONS FROM PLAN:
- Plan names the file `middleware.ts`. Next.js 16.2.10 deprecates that convention in favor of `proxy.ts` (function must be named/exported `proxy`, not `middleware`) — confirmed via the Next docs shipped in `node_modules`. Build succeeded either way (deprecation warning only), but per Rade's approval used `proxy.ts` now rather than carrying a warning that would need fixing later anyway. Same single responsibility as the plan specified (redirect `/` → `/en`, nothing else). This file is temporary regardless of name: Phase 8 (static export) drops proxy/middleware entirely and moves the redirect to a `_redirects` rule, per the plan's own Phase 8 approach — confirmed proxy is unsupported under static export in the Next docs.
- Plan says "Mobile: simple disclosure menu, no library" without specifying the mechanism; shipped first with `onClick`/`useState`, reopened and rebuilt on native `<details>/<summary>` after the real-device failure above. No library either way; the disclosure is now zero-JS for its core open/close behavior.
- Nav's brand lockup hides the `identitet` mono suffix below the `sm` breakpoint (640px) — not in the plan's literal spec, but a minimal fit adjustment for very narrow phones; full lockup still shows at ≥640px, well before the `md` breakpoint where the mobile disclosure switches to the desktop nav.
- Footer imprint line uses only the already-approved content-of-record facts (studio name, Sombor/Serbia) — the full legal imprint (APR matični broj/PIB) stays a `// TODO` per CLAUDE.md; not inventing a registration number. Same for Contact: linked to `/contact` rather than a raw `mailto:`, since the contact email is still an open TODO (rade@identitet.rs vs hello@radosavbrdar.com) and shouldn't be guessed.

OPEN TODOs INTRODUCED:
- `app/layout.tsx` — final site title/description copy, deferred to Phase 7 (SEO/GEO).
- `components/Footer.tsx` — full imprint line (legal form + APR matični broj/PIB), carried from Phase 0's open items, wired properly in Phase 6.
- Pre-existing (not introduced this phase, but surfaced by `npm run lint`, which isn't part of any phase's ACCEPTANCE CHECK): `components/StatusStrip.tsx:33` — `react-hooks/immutability` flags the `elapsed` reassignment inside the `.map` used to stagger animation delays. Build passes; not touched since StatusStrip is out of Phase 2's file list. Flagging for whichever phase next touches that component.

PROCESS NOTE FOR FUTURE PHASES:
- Real-device smoke testing caught what automated desktop-click Puppeteer testing missed. Any interactive mobile UI (disclosure menus, future form controls, etc.) must be verified with **touch emulation** (`page.emulate()` with a real device profile + `page.touchscreen.tap()`) as part of its acceptance check, not `page.click()`, and ideally spot-checked on an actual device before marking a phase DONE. Prefer native HTML disclosure/interaction elements (`<details>`, `<dialog>`, form controls) over React state where the plan allows "no library" — they remove an entire class of hydration/touch-timing bugs by construction.

NEXT STEP:
- Rade re-confirms the mobile menu works on the real device that caught this, then visually approves the rest of the Phase 2 shell (desktop nav, locale switcher, footer) → then Phase 3: Content Layer + Home (`content/types.ts`, `content/en/home.ts` verbatim from the tournament doc, `lib/content.ts`, `components/CaseCard.tsx`, full `app/[locale]/page.tsx`).

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
