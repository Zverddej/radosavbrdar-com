import { CONTACT_EMAIL } from "@/lib/site";
import type { CTALink } from "@/content/types";

interface MailtoNoteProps {
  links: CTALink[];
  className?: string;
}

/**
 * mailto: links silently do nothing for visitors without a configured
 * desktop mail client. Wherever a CTA points at one, show the address as
 * plain selectable text too, so there's always a working path. Renders
 * nothing if none of the given links is a mailto: (e.g. once a booking
 * tool replaces the TODO'd mailto CTAs, this disappears on its own).
 */
export default function MailtoNote({ links, className }: MailtoNoteProps) {
  if (!links.some((link) => link.href.startsWith("mailto:"))) {
    return null;
  }

  return (
    <span className={`font-mono text-sm text-muted ${className ?? ""}`}>
      {CONTACT_EMAIL}
    </span>
  );
}
