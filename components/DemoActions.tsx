"use client";

import { useRouter } from "next/navigation";
import { useAssessment } from "@/lib/assessment-context";

export function DemoActions({ compact = false }: { compact?: boolean }) {
  const { assessment, loadDemo, reset, ready } = useAssessment();
  const router = useRouter();
  const hasData = Object.keys(assessment.answers).length > 0;

  function onDemo() {
    if (hasData && !assessment.isDemo) {
      const ok = window.confirm(
        "Charger le dossier démo Atlas Connect ? Vos réponses actuelles seront remplacées.",
      );
      if (!ok) return;
    }
    loadDemo();
    router.push("/dashboard");
  }

  function onReset() {
    if (!hasData) {
      reset();
      return;
    }
    const ok = window.confirm("Effacer le dossier de ce navigateur et recommencer à zéro ?");
    if (ok) reset();
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!ready}
          onClick={onDemo}
          className="text-xs font-medium text-teal hover:text-teal-dark disabled:opacity-40"
        >
          Démo
        </button>
        <button
          type="button"
          disabled={!ready}
          onClick={onReset}
          className="text-xs text-ink-faint hover:text-ink-muted"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={onDemo} className="ui-btn-ghost h-12 px-6">
      Voir la démo Atlas Connect
    </button>
  );
}
