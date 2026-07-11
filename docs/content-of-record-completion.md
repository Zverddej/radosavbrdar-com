# Content of Record — Completion Document

Companion to `website-copy-tournament.md` and `ai-assessment-tournament.md`. This document completes the site's content of record: case studies (Phase 5), About/Contact/Privacy (Phase 6), and the Serbian translation glossary (Phase 7). Agent: implement verbatim; do not rewrite. `TODO:` markers are for Rade, not for the agent to fill.

---

## PART 1 — CASE STUDIES (Phase 5)

Format per the tournament-winning V3 template: Context / Solution / Stack / Outcome. Frontmatter values included.

---

### 1. archive-rag.mdx

```yaml
title: "Private RAG for a Historical Research Archive"
slug: "archive-rag"
sector: "Historical research / Archives"
year: 2026
problem: "A 100k+ page WWII archive, unsearchable: scanned microfilm, mixed German and English, no digital index."
stack: ["fastapi", "qdrant", "bge-m3", "hybrid-search", "self-hosted-llm", "ocr-pipeline"]
outcome: "Full-text semantic search over the entire corpus, running on private infrastructure."
metric: { value: "TODO", label: "pages indexed" }  # TODO: exact page/chunk count from Qdrant
featured: true
order: 1
```

**Context**
A historical research project needed to work with tens of thousands of pages of WWII-era archival material — German military records and RAF operational logs — available only as scanned microfilm reels. No OCR, no index, no way to ask "where is X mentioned?" without weeks of manual reading. The material is research-sensitive: sending it to a cloud AI service was not an option.

**Solution**
An end-to-end private pipeline. OCR tuned for degraded historical typescript in two languages, with structured Markdown output. Semantic + keyword hybrid search over the full corpus, with optional LLM re-ranking for difficult queries. A multi-tenant visibility model — shared and private document collections with server-side access filtering as the single security chokepoint — so multiple researchers work on one system without seeing each other's private material. A purpose-built frontend: reel browser, page-level navigation, lazy-loaded thumbnails. Everything runs on dedicated infrastructure; no document ever leaves it.

**Stack**
FastAPI · Qdrant · BGE-M3 embeddings · hybrid search with LLM re-ranking · self-hosted and API-routed LLMs with a multi-provider configuration layer · custom OCR pipeline · session-based auth

**Outcome**
A previously unsearchable archive answers questions in seconds. Researchers query in natural language across German and English sources simultaneously. The system is the reference deployment behind the AI Assessment offer — the same architecture, adapted per client.
TODO: add exact corpus size (pages / chunks indexed) and a typical query latency number.

---

### 2. tennis-club-saas.mdx

```yaml
title: "Booking & Membership Platform for a Tennis Club"
slug: "tennis-club-saas"
sector: "Sports club management"
year: 2026
problem: "Court booking by phone calls and paper lists — double bookings, no membership rule enforcement, no visibility."
stack: ["nextjs", "prisma", "postgresql", "telegram-bot", "pwa"]
outcome: "Self-service booking with automatic rule enforcement, running as a PWA members use daily."
metric: { value: "TODO", label: "active members" }  # TODO: current member count + reservations/week
featured: true
order: 2
```

**Context**
A tennis club with decades of tradition ran its daily operations on phone calls and paper. Court reservations collided, membership rules (who can book what, when, how far ahead) existed only in people's heads, and the club administration spent hours weekly untangling conflicts.

**Solution**
A multi-tenant club management platform built around the club's real rules, not a generic booking template. Membership tiers with enforced booking permissions, court-specific rules, prime-time limits per member, waitlists with automatic promotion when a slot frees up, guest accounts, and admin booking on behalf of members. Telegram notifications for confirmations and waitlist promotions. Tournament archive, leaderboard and head-to-head statistics for the competitive side of club life. Installable as a PWA — no app store, works on every phone.

**Stack**
Next.js · Prisma · PostgreSQL · Telegram Bot API · PWA · deployed behind Cloudflare

**Outcome**
Booking conflicts eliminated; rules enforce themselves. The administration's weekly scheduling overhead dropped to near zero, and members book courts at midnight without calling anyone.
TODO: member count, average reservations per week, months in production.

---

### 3. cosmetics-brand.mdx

```yaml
title: "Skinissima — Brand Foundation to Production Website"
slug: "cosmetics-brand"
sector: "Natural cosmetics / D2C"
year: 2026
problem: "A new natural cosmetics brand with strong products and no identity, no digital presence, no launch plan."
stack: ["brand-strategy", "identity-design", "nextjs", "tailwind", "seo-geo"]
outcome: "Complete brand system and a production website sharing one design language, launch-ready."
metric: { value: "TODO", label: "TODO — e.g. Lighthouse score / launch metric" }
featured: true
order: 3
```
TODO: confirm public naming with Sanja and Igor (assumed yes — brand launch benefits from visibility).

**Context**
Two founders with a serious natural cosmetics line and nothing around it: no brand identity, no website, no e-commerce plan — and a market (Serbia) with specific technical requirements ahead: fiscalization, local payment gateways, phased launch logistics.

**Solution**
The full brand-to-product arc that the hybrid service promises. Brand Foundation workshops with the founders; identity development through structured exploration (20 logo variants across 5 typographic directions, narrowed by criteria, not taste alone); trademark availability research. Then the website: a bespoke "apothecary" design system translated directly from the brand foundation, built on a modern stack with full SEO and GEO optimization. E-commerce architecture planned in phases — launch with cash-on-delivery, payment gateway and fiscalization integration staged to match business readiness rather than forcing everything before day one.

**Stack**
Brand strategy · identity & design system · Next.js 16 · Tailwind v4 · structured data / GEO optimization · phased e-commerce architecture (fiscalization-ready)

**Outcome**
One continuous system from brand values to production code — no agency handoff, no translation loss between the logo file and the website that carries it.
TODO: one hard number post-launch (traffic, conversion, or launch timeline vs. industry norm).

---

### 4. legal-ai.mdx

```yaml
title: "Legal AI Assistant for Municipal Administration"
slug: "legal-ai"
sector: "Public administration / Legal"
year: 2025
problem: "Municipal legal teams answering the same regulatory questions repeatedly, across four jurisdictions' legislation."
stack: ["rag", "faiss", "regional-llm", "python"]
outcome: "A legal question-answering system over regional legislation, developed with an EU-based partner."
metric: { value: "4", label: "jurisdictions covered (SR/HR/SI/BA)" }
featured: true
order: 4
```

**Context**
Municipal administrations across the region face the same structural problem: legal teams spend a large share of their time answering recurring questions about legislation and procedure — in Serbian, Croatian, Slovenian, and Bosnian legal frameworks that are similar but never identical. Confidentiality and data locality are non-negotiable in public administration.

**Solution**
A retrieval-augmented legal assistant over regional legislation, built in partnership with a Slovenian company for EU-side delivery. Legislation corpus per jurisdiction, semantic retrieval tuned for legal language, and answers grounded in the retrieved articles rather than model memory — with citations back to the source text. Commercial model designed around public-sector constraints: multiple hosting configurations from fully on-premise to EU-hosted private servers.

**Stack**
Python · FAISS · RAG architecture with source-grounded answers · multi-jurisdiction corpus management · flexible deployment models

**Outcome**
The second reference deployment behind the Private AI service line — and the origin of the EU partnership through which sovereign AI deployments are delivered inside the Union.
TODO: confirm what can be said about pilot municipalities; keep sector-level if no permission.

---

### 5. agritech-platform.mdx

```yaml
title: "Product Presentation Platform for an AgriTech SaaS"
slug: "agritech-platform"
sector: "AgriTech / SaaS"
year: 2025
problem: "A capable farm-management SaaS that looked generic online — the product's depth was invisible to prospects."
stack: ["wordpress", "interactive-widgets", "motion-design", "video"]
outcome: "A redesigned web presence with an interactive product hub that shows the platform instead of describing it."
metric: { value: "TODO", label: "TODO — traffic or demo-request delta" }
featured: false
order: 5
```
TODO: confirm naming (agrobudget) with client.

**Context**
An agritech SaaS for farm budgeting and management had a real product and a website that undersold it — static text where an interactive product deserved demonstration, and a WordPress installation with accumulated technical debt, including a hidden malware backdoor discovered during the work.

**Solution**
Hero section redesign around an interactive hub-and-spoke widget presenting the platform's modules as an explorable system rather than a feature list. Product video production using AI generation pipelines, directed with proper motion-design briefs. WordPress remediation: the malware backdoor found and removed, performance fixes, implementation in the client's existing builder stack so their team could maintain it.

**Stack**
WordPress / Breakdance · custom interactive HTML5 widget · AI video generation (directed) · security remediation

**Outcome**
The product's actual depth became visible at first scroll — and the client kept a platform their own team can run.
TODO: one metric — demo requests, bounce rate, or traffic change after redesign.

---

## PART 2 — ABOUT PAGE (Phase 6, full copy)

**Hero:**
> **I've reinvented my craft five times in thirty years.**
> The principle never changed: understand the system, then build it properly.

**The arc:**
> Prepress and graphic production in the 90s — where a mistake meant reprinting ten thousand sheets, and precision became a habit rather than a virtue. Then 360° photography: close to 60 million views on Google Maps, over a thousand businesses put on the map. Then the web — hundreds of sites, brands, and campaigns built for companies across the region. A business directory founded and run. A local street-view platform built from scratch.
>
> And now: private AI systems. Retrieval, search, and language models running on hardware I can physically touch — my own inference servers, my own deployments, my own uptime to answer for. No rented magic, no black boxes.
>
> Each of these was a different craft. All of them were the same job: take a system apart, understand it honestly, build it properly.

**How I work:**
> **In phases.** Every project is broken into phases with one goal each, a fixed scope, and an explicit acceptance check. You always know what's being built, what it costs, and when it's done.
>
> **Directly.** You talk to the person doing the work. Questions get answered by whoever wrote the code — usually the same day.
>
> **For ownership.** Everything I build is designed to be handed over: documented, explained, and runnable without me. The measure of a good system is that it doesn't need its builder.

**The studio:**
> *identitet* is the studio name this work lives under — a one-person studio by design, with a network of long-term specialist collaborators for larger builds, and an EU-based delivery partnership for deployments inside the Union. Based in Sombor, Serbia. Working across the EU.

---

## PART 3 — CONTACT PAGE (Phase 6, full copy)

> **Bring your problem, not a brief.**
> The fastest way to find out if we should work together is a 30-minute call. No pitch, no deck. Describe the problem; I'll tell you honestly whether I'm the right person for it — and if I'm not, who is.
>
> **Email:** TODO: confirm address (rade@identitet.rs or hello@radosavbrdar.com)
> **LinkedIn:** TODO: profile URL
> **Book a call:** TODO: Cal.com/Calendly URL or remove for v1
>
> Radosav Brdar · identitet studio
> Sombor, Serbia · working across the EU
> Response time: within one business day.

---

## PART 4 — PRIVACY & IMPRINT (Phase 6, draft — legal review TODO)

**Privacy, in plain language:**
> This site is built the way I build everything: with as little of your data as possible.
>
> **No cookies.** This site sets no cookies and uses no tracking pixels.
> **Analytics without surveillance.** Traffic is measured with Cloudflare Web Analytics, a cookieless system that collects aggregate page statistics only — no personal identifiers, no cross-site tracking, no profiles.
> **Email.** If you write to me, your message and address are used to reply to you and for nothing else. They are not added to any list and not shared with anyone.
> **Hosting.** The site is served via Cloudflare's global network. Standard technical server logs may be processed by Cloudflare as infrastructure provider.
>
> Questions about any of this: [email].

**Imprint:**
> identitet — Radosav Brdar
> Sombor, Serbia
> TODO: legal form + registration number (APR matični broj / PIB) as required for business identification.

---

## PART 5 — SERBIAN TRANSLATION GLOSSARY (Phase 7)

Rules for the translator (agent or human): srpska latinica, persiranje (Vi) u obraćanju klijentu, tehnički termini koji su ustaljeni na engleskom ostaju na engleskom (RAG, deployment, stack, open-source). Prevod mora zvučati kao da je pisan na srpskom, ne prevođen.

**Locked translations of the hard creative lines:**

| English (of record) | Serbian (of record) |
|---|---|
| Own What You Build (master frame) | **Vaše je ono što napravimo** |
| I build systems you own — not subscriptions you rent. | Gradim sisteme koje posedujete — ne pretplate koje iznajmljujete. |
| Your data never leaves your building. | Vaši podaci nikada ne napuštaju vašu zgradu. |
| What you own when we're done | Šta je vaše kad završimo |
| You work directly with the person who builds it. | Radite direktno sa čovekom koji to gradi. |
| No account managers. No handoffs. No juniors learning on your budget. | Bez account menadžera. Bez prebacivanja. Bez juniora koji uče o vašem trošku. |
| Proof, not promises. | Dokazi, ne obećanja. |
| Someone probably sent you here. | Neko Vas je verovatno uputio ovde. |
| Bring your problem, not a brief. | Donesite problem, ne brief. |
| That's the cheapest "no" you'll ever buy. | To je najjeftinije „ne" koje ćete ikada platiti. |
| In 14 days, you'll know exactly what AI can do for your firm. | Za 14 dana znaćete tačno šta AI može da uradi za Vašu firmu. |
| Not a demo with my data — a test with yours. | Ne demo sa mojim podacima — test sa Vašim. |
| AI that never phones home. | AI koji nikome ne javlja ništa. |
| Built to be maintained, not just launched. | Napravljeno da se održava, ne samo da se lansira. |
| One head, no translation loss. | Jedna glava, bez gubitka u prevodu. |
| understand the system, then build it properly | razumeti sistem, pa ga napraviti kako treba |
| no rented magic, no black boxes | bez iznajmljene magije, bez crnih kutija |

**Terms that stay English in SR text:** RAG, deployment (u tehničkom kontekstu; „uvođenje" gde je prirodno), stack, e-commerce, open-source, on-premise, uptime.
**Terms translated always:** ownership → vlasništvo/posedovanje; assessment → snimak stanja (proizvod se na SR zove **„AI Snimak stanja"** — postojeći naziv, ne prevoditi kao „procena").
