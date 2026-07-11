import type { CaseStub } from "@/content/types";

interface CaseCardProps {
  caseStub: CaseStub;
  className?: string;
}

export default function CaseCard({ caseStub, className }: CaseCardProps) {
  return (
    <article className={`border border-line p-6 ${className ?? ""}`}>
      <h3 className="text-lg font-semibold text-text">{caseStub.title}</h3>
      <p className="mt-2 text-sm text-muted">{caseStub.problem}</p>
      <p className="mt-4 font-mono text-xs text-muted">
        stack: {caseStub.stack.join(" · ")}
      </p>
      <p className="mt-2 text-sm text-text">{caseStub.outcome}</p>
    </article>
  );
}
