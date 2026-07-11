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
