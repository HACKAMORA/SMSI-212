"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { RadarMaturity } from "@/components/RadarMaturity";
import { ScoreRing } from "@/components/ScoreRing";
import { DOMAINS } from "@/lib/domains";
import { useAssessment } from "@/lib/assessment-context";
import {
  countAnswers,
  maturityLabel,
  overallScore,
  progressPct,
  scoresByDomain,
} from "@/lib/scoring";
import type { DomainId } from "@/lib/types";

export default function DashboardPage() {
  const { assessment, snapshot, ready } = useAssessment();
  const [label, setLabel] = useState("Point zéro");
  const [refId, setRefId] = useState<string>("");

  const score = ready ? overallScore(assessment.answers) : null;
  const byDomain = ready
    ? scoresByDomain(assessment.answers)
    : ({} as Record<DomainId, number | null>);
  const counts = ready
    ? countAnswers(assessment.answers)
    : {
        conforme: 0,
        partiel: 0,
        non_conforme: 0,
        na: 0,
        sans_reponse: 93,
      };
  const pct = ready ? progressPct(assessment.answers) : 0;

  const reference = useMemo(() => {
    const snap = assessment.snapshots.find((s) => s.id === refId);
    return snap?.byDomain ?? null;
  }, [assessment.snapshots, refId]);

  const first = assessment.snapshots[0];
  const last = assessment.snapshots[assessment.snapshots.length - 1];

  return (
    <AppShell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ui-kicker">{assessment.orgName || "Votre organisation"}</p>
          <h1 className="ui-h1 mt-1">Maturité</h1>
        </div>
        <p className="text-sm text-ink-faint">{pct}% du questionnaire</p>
      </header>

      {!ready ? (
        <p className="mt-8 text-sm text-ink-faint">Chargement…</p>
      ) : (
        <>
          <section className="mt-8 grid gap-4 lg:grid-cols-12">
            <article className="ui-card flex flex-col items-center justify-center p-8 lg:col-span-4">
              <ScoreRing score={score} />
              <p className="mt-4 text-lg font-medium">{maturityLabel(score)}</p>
            </article>
            <article className="ui-card p-6 lg:col-span-8">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">Par domaine</h2>
                {assessment.snapshots.length > 0 && (
                  <select
                    value={refId}
                    onChange={(e) => setRefId(e.target.value)}
                    className="px-2 py-1 text-xs"
                  >
                    <option value="">Sans référence</option>
                    {assessment.snapshots.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <RadarMaturity current={byDomain} previous={reference} />
            </article>
          </section>

          <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d) => (
              <article key={d.id} className="ui-card p-5">
                <p className="text-xs text-ink-faint">{d.annex}</p>
                <p className="mt-3 text-4xl font-semibold tabular-nums tracking-tight">
                  {byDomain[d.id] == null ? "—" : byDomain[d.id]}
                  {byDomain[d.id] != null && (
                    <span className="text-lg text-ink-faint">%</span>
                  )}
                </p>
                <p className="mt-2 text-sm text-ink-muted">{d.label}</p>
              </article>
            ))}
          </section>

          <section className="ui-card mt-4 p-6">
            <h2 className="font-medium">Répartition</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-5">
              {(
                [
                  ["conforme", "Conforme", "bg-emerald-500"],
                  ["partiel", "Partiel", "bg-amber-500"],
                  ["non_conforme", "Écarts", "bg-rose-500"],
                  ["na", "N/A", "bg-stone-400"],
                  ["sans_reponse", "Ouverts", "bg-stone-300"],
                ] as const
              ).map(([key, name, bar]) => (
                <li key={key}>
                  <p className="text-2xl font-semibold tabular-nums">{counts[key]}</p>
                  <p className="mt-1 text-xs text-ink-faint">{name}</p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper">
                    <div
                      className={`h-full ${bar}`}
                      style={{ width: `${(counts[key] / 93) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="ui-card mt-4 p-6">
            <h2 className="font-medium">Clichés</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => {
                  if (!label.trim()) return;
                  snapshot(label.trim());
                  setLabel("Revue");
                }}
                className="ui-btn-primary"
              >
                Enregistrer
              </button>
            </div>
            {assessment.snapshots.length === 0 ? (
              <p className="mt-4 text-sm text-ink-faint">Aucun cliché.</p>
            ) : (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead className="text-xs text-ink-faint">
                    <tr>
                      <th className="pb-2 font-medium">Nom</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Global</th>
                      {DOMAINS.map((d) => (
                        <th key={d.id} className="pb-2 font-medium">
                          {d.short}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {assessment.snapshots.map((s) => (
                      <tr key={s.id} className="border-t border-paper-line">
                        <td className="py-2.5">{s.label}</td>
                        <td className="py-2.5 text-ink-faint">
                          {new Date(s.createdAt).toLocaleDateString("fr-MA")}
                        </td>
                        <td className="py-2.5 text-teal">{s.overall}%</td>
                        {DOMAINS.map((d) => (
                          <td key={d.id} className="py-2.5">
                            {s.byDomain[d.id]}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {first && last && first.id !== last.id && (
                  <p className="mt-4 text-sm text-teal">
                    {first.overall}% → {last.overall}% (
                    {last.overall - first.overall >= 0 ? "+" : ""}
                    {last.overall - first.overall} pts)
                  </p>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </AppShell>
  );
}
