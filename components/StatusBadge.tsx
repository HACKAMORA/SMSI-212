import type { Answer } from "@/lib/types";

const META: Record<Answer, { label: string; className: string }> = {
  conforme: { label: "Conforme", className: "bg-moss-soft text-moss" },
  partiel: { label: "Partiel", className: "bg-amber-soft text-amber" },
  non_conforme: { label: "Écart", className: "bg-rose-soft text-rose" },
  na: { label: "N/A", className: "bg-paper text-ink-muted" },
};

export function StatusBadge({
  status,
  empty,
}: {
  status?: Answer;
  empty?: boolean;
}) {
  if (!status || empty) {
    return (
      <span className="inline-flex rounded-full bg-paper px-2.5 py-0.5 text-xs text-ink-faint">
        Ouvert
      </span>
    );
  }
  const m = META[status];
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${m.className}`}>
      {m.label}
    </span>
  );
}

export const ANSWER_OPTIONS: { value: Answer; label: string }[] = [
  { value: "conforme", label: "Conforme" },
  { value: "partiel", label: "Partiellement conforme" },
  { value: "non_conforme", label: "Non conforme" },
  { value: "na", label: "Non applicable" },
];
