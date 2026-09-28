"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ANSWER_OPTIONS, StatusBadge } from "@/components/StatusBadge";
import { getControl } from "@/data/controls";
import { domainMeta } from "@/lib/domains";
import { useAssessment } from "@/lib/assessment-context";
import { getTemplate } from "@/lib/templates";
import type { Answer } from "@/lib/types";

export default function ControlPage() {
  const params = useParams<{ id: string }>();
  const { assessment, answer } = useAssessment();
  const control = getControl(params.id);
  if (!control) {
    return (
      <AppShell>
        <p>Contrôle introuvable.</p>
        <Link href="/bibliotheque" className="text-teal underline">
          Retour
        </Link>
      </AppShell>
    );
  }

  const current = assessment.answers[control.id];
  const domain = domainMeta(control.domain);

  return (
    <AppShell>
      <Link
        href="/bibliotheque"
        className="text-sm text-teal hover:underline"
      >
        ← Bibliothèque
      </Link>
      <p className="ui-kicker mt-4">
        {domain.annex} · {domain.label}
      </p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <h1 className="ui-h1">
          A.{control.id} — {control.title}
        </h1>
        <StatusBadge status={current} empty={!current} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {ANSWER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              answer(control.id, current === opt.value ? null : (opt.value as Answer))
            }
            className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
              current === opt.value
                ? "bg-ink text-white ring-ink"
                : "bg-white text-ink-muted ring-paper-line hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <Card title="La question">
            <p>{control.question}</p>
          </Card>
          <Card title="En français simple">
            <p>{control.explanation}</p>
          </Card>
          <Card title="Pourquoi ça compte ici">
            <p>{control.whyItMatters}</p>
          </Card>
          <Card title="Premier pas">
            <p>{control.howToStart}</p>
          </Card>
        </div>
        <aside className="space-y-4">
          <Card title="Pont DNSSI">
            {control.dnssi.length === 0 ? (
              <p className="text-ink-faint">Pas de correspondance directe listée.</p>
            ) : (
              <ul className="space-y-2">
                {control.dnssi.map((d) => (
                  <li key={d.code}>
                    <p className="font-medium text-teal">{d.code}</p>
                    <p>{d.title}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-ink-faint">
              Correspondance indicative pour aider un dossier d&apos;homologation
              — à valider contre le texte DNSSI / DGSSI en vigueur.
            </p>
          </Card>
          <Card title="Modèles">
            <ul className="space-y-3">
              {control.templates.map((id) => {
                const t = getTemplate(id);
                if (!t) return null;
                return (
                  <li key={id}>
                    <p className="text-[11px] uppercase tracking-wider text-ink-faint">
                      {t.kind}
                    </p>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-ink-muted">{t.summary}</p>
                    <ol className="mt-2 list-decimal space-y-1 pl-4 text-ink-muted">
                      {t.outline.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ol>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card title="Priorisation">
            <p>
              Criticité {control.criticality}/5 · Facilité {control.ease}/5
            </p>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="ui-card p-4">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}
