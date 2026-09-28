"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useAssessment } from "@/lib/assessment-context";
import {
  assessmentToCsv,
  downloadText,
  exportPdf,
  planToCsv,
} from "@/lib/export";
import { buildPlan, HORIZON_META, type Horizon } from "@/lib/plan";
import { domainMeta } from "@/lib/domains";

const ORDER: Horizon[] = ["quick_win", "moyen", "structurant"];

export default function PlanPage() {
  const { assessment, ready, toggleDone } = useAssessment();
  const plan = ready ? buildPlan(assessment.answers) : [];
  const open = plan.filter((i) => !assessment.doneActions.includes(i.control.id));
  const closed = plan.filter((i) => assessment.doneActions.includes(i.control.id));
  const slug = (assessment.orgName || "smsi").replace(/\s+/g, "-").toLowerCase();

  return (
    <AppShell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ui-kicker">Conformité · Plan</p>
          <h1 className="ui-h1 mt-1">Plan d&apos;action</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Généré à partir des écarts. Priorité = criticité × facilité. Cochez
            une action quand le premier pas est lancé — elle reste visible en
            bas.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={plan.length === 0}
            onClick={() =>
              downloadText(
                `SMISI-212_plan_${slug}.csv`,
                planToCsv(assessment),
                "text/csv;charset=utf-8",
              )
            }
            className="ui-btn-ghost disabled:opacity-40"
          >
            Excel (CSV)
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() =>
              downloadText(
                `SMISI-212_diagnostic_${slug}.csv`,
                assessmentToCsv(assessment),
                "text/csv;charset=utf-8",
              )
            }
            className="ui-btn-ghost disabled:opacity-40"
          >
            Diagnostic CSV
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() => exportPdf(assessment)}
            className="ui-btn-primary disabled:opacity-40"
          >
            Export PDF
          </button>
        </div>
      </header>

      {!ready ? (
        <p className="mt-10 text-sm text-ink-faint">Chargement du dossier…</p>
      ) : plan.length === 0 ? (
        <p className="ui-card mt-8 max-w-lg p-5 text-sm text-ink-muted">
          Aucun écart pour l&apos;instant. Répondez « Non conforme » ou
          « Partiellement conforme » dans le{" "}
          <Link href="/diagnostic" className="text-teal underline">
            diagnostic
          </Link>{" "}
          pour alimenter ce plan.
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {open.length > 0 && (
            <p className="text-sm text-ink-faint">
              {closed.length} / {plan.length} actions marquées comme lancées
            </p>
          )}
          {ORDER.map((horizon) => {
            const items = open.filter((i) => i.horizon === horizon);
            if (items.length === 0) return null;
            const meta = HORIZON_META[horizon];
            return (
              <section key={horizon}>
                <h2 className="text-base font-semibold">{meta.label}</h2>
                <p className="mt-1 text-sm text-ink-muted">{meta.hint}</p>
                <ol className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.control.id}
                      className="ui-card p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            className="mt-1.5"
                            checked={false}
                            onChange={() => toggleDone(item.control.id)}
                          />
                        <div>
                          <p className="text-xs text-teal">
                            A.{item.control.id} ·{" "}
                            {domainMeta(item.control.domain).label}
                            {item.control.dnssi[0] && (
                              <span className="text-ink-faint">
                                {" "}
                                · DNSSI {item.control.dnssi[0].code}
                              </span>
                            )}
                          </p>
                          <h3 className="mt-1 text-base font-semibold">
                            {item.control.title}
                          </h3>
                        </div>
                        </label>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={item.answer} />
                          <span className="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-medium text-white">
                            P{item.priority}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-ink-muted">
                        {item.control.howToStart}
                      </p>
                      <p className="mt-3 text-xs text-ink-faint">
                        {item.impactLabel} · {item.effortLabel} ·{" "}
                        <Link
                          href={`/bibliotheque/${item.control.id}`}
                          className="text-teal hover:underline"
                        >
                          Ressources
                        </Link>
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
          {closed.length > 0 && (
            <section>
              <h2 className="text-base font-semibold">Déjà lancées</h2>
              <p className="mt-1 text-sm text-ink-muted">
                Décochez pour les remettre dans le plan actif.
              </p>
              <ul className="mt-4 space-y-2">
                {closed.map((item) => (
                  <li
                    key={item.control.id}
                    className="ui-card flex items-start gap-3 px-4 py-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked
                      onChange={() => toggleDone(item.control.id)}
                    />
                    <span className="text-ink-muted line-through">
                      A.{item.control.id} — {item.control.title}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </AppShell>
  );
}
