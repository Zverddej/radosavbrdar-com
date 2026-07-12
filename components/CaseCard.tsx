import Link from "next/link";
import type { CaseFrontmatter } from "@/content/types";
import type { Locale } from "@/lib/i18n";

interface CaseCardProps {
  caseData: CaseFrontmatter;
  locale: Locale;
  className?: string;
}

export default function CaseCard({ caseData, locale, className }: CaseCardProps) {
  return (
    <Link
      href={`/${locale}/work/${caseData.slug}`}
      className={`block border border-line p-6 hover:border-amber ${className ?? ""}`}
    >
      <h3 className="text-lg font-semibold text-text">{caseData.title}</h3>
      <p className="mt-2 text-sm text-muted">{caseData.problem}</p>
      <p className="mt-4 font-mono text-xs text-muted">
        stack: {caseData.stack.join(" · ")}
      </p>
      <p className="mt-2 text-sm text-text">{caseData.outcome}</p>
    </Link>
  );
}
