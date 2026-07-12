// Single source of truth for facts that repeat across content files, so a
// future change doesn't have to be hunted down in four places. Resolved by
// Rade -- see DEV-LOG 006.
export const CONTACT_EMAIL = "hello@radosavbrdar.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

// Canonical domain, confirmed by Rade (DEV-LOG 006, corrected at Phase 7
// start: only radosavbrdar.com is registered). Used by metadata, JSON-LD,
// sitemap and robots.
export const SITE_URL = "https://radosavbrdar.com";

// Resolved by Rade at Phase 8 start (closes the TODO open since Phase 3).
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/radosav-brdar-aa643538/";
