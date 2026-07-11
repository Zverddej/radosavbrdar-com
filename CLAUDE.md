# CLAUDE.md — radosavbrdar.com

Personal/studio site for Radosav Brdar · identitet studio.
Purpose: validation-after-referral. Visitor arrives via recommendation; site must confirm expertise in 60 seconds.

## SOURCE OF TRUTH (read before any work)

All in `/docs/`:

1. `radosavbrdar-implementation-plan.md` — THE plan. Phases 1–8, stack, folder structure, acceptance checks. Execute it as written.
2. `website-copy-tournament.md` — site copy of record (Home, Services, nav labels).
3. `ai-assessment-tournament.md` — /ai-assessment page copy of record (PART 4).
4. `content-of-record-completion.md` — case studies, About/Contact/Privacy copy, SR translation glossary.

**Copy is implemented VERBATIM. Never rewrite, improve, or paraphrase copy. `TODO:` markers are for Rade — leave them visible in content files with a `// TODO:` comment, never invent values (price, metrics, URLs, registration numbers).**

## STACK (locked — do not substitute)

- Next.js 15+ (App Router, static export target)
- Tailwind CSS v4 (CSS-first config via `@theme` in globals.css)
- MDX via `@next/mdx` — case studies only
- TypeScript strict. No `any` without a justifying comment.
- No database, no auth, no server actions, no i18n library, no CMS, no CSS-in-JS, no state library.
- Deploy: Cloudflare Workers static assets (Phase 8).

## GLOBAL RULES

1. **One phase = one goal = one commit (or small commit series).** Never start the next phase early.
2. Minimal files per step. If the phase spec doesn't list a file, don't create it.
3. Every phase ends with its ACCEPTANCE CHECK executed and results reported honestly. A failed check = phase not done. Do not claim "works" without running the check.
4. `npm run build` must pass with zero TS errors before any phase is declared complete.
5. Accessibility floor: semantic HTML, visible keyboard focus, `prefers-reduced-motion` respected, WCAG AA contrast.
6. If the plan conflicts with reality (library version, API change): STOP, state the conflict in DEV-LOG under "Blockers", propose the minimal fix, wait for Rade's approval.
7. Comments only where a decision isn't obvious from the code.
8. Design direction "Blueprint Terminal" is locked (Phase 1 spec) — tokens, IBM Plex, StatusStrip signature component. No creative reinterpretation.

## DEV-LOG PROTOCOL (non-negotiable)

`DEV-LOG.md` in repo root is the continuity mechanism. Any Claude instance (Fable, Sonnet, CLI agent) must be able to resume the project from DEV-LOG.md + this file alone.

**Rules:**

- A phase is NOT complete until its DEV-LOG entry is written and committed **in the same commit series as the code**.
- Entries are append-only, newest at the top, numbered `###NNN`.
- Entry is written AFTER the acceptance check runs — record actual results, including failures.
- On session start: read DEV-LOG.md top entry first, then the plan phase it points to. Never re-derive state from the codebase alone.
- Mid-phase interruption (context limit, crash, Rade stops the session): write a `STATUS: IN PROGRESS` entry immediately with exact state — what's done, what's half-done, which file was being edited, what the next concrete step is.

**Entry template** (also embedded in DEV-LOG.md):

```markdown
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
- <TODO markers left in code/content for Rade>

NEXT STEP:
- <the exact first action for the next session>
```

## HOW TO REPORT TO RADE

- End of each phase: short summary in chat — what was built, acceptance results, what needs Rade's decision (from the plan's OPEN ITEMS list).
- Never present untested work as working. If a visual/browser check is needed, say so explicitly and list what Rade should click.
