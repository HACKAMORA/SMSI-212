"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Chip } from "@/components/Chip";
import { StatusBadge } from "@/components/StatusBadge";
import { CONTROLS } from "@/data/controls";
import { DOMAINS } from "@/lib/domains";
import { useAssessment } from "@/lib/assessment-context";
import { downloadText } from "@/lib/export";
import type { DomainId } from "@/lib/types";

export default function SoaPage() {
  const { assessment, ready, setJustification } = useAssessment();
  const [domain, setDomain] = useState<DomainId | "all">("all");

  const rows = useMemo(() => {
    return CONTROLS.filter((c) => domain === "all" || c.domain === domain);
  }, [domain]);

  const stats = useMemo(() => {
    let applicable = 0;
    let excluded = 0;
    let missingJustif = 0;
    for (const c of CONTROLS) {
      const a = assessment.answers[c.id];
      if (a === "na") {
        excluded += 1;
        if (!assessment.justifications[c.id]?.trim()) missingJustif += 1;
      } else if (a) {
        applicable += 1;
      }
    }
    return { applicable, excluded, missingJustif, unanswered: CONTROLS.length - applicable - excluded };
  }, [assessment.answers, assessment.justifications]);

  const slug = (assessment.orgName || "soa").replace(/\s+/g, "-").toLowerCase();

  return (
    <AppShell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ui-kicker">Conformité · SoA</p>
          <h1 className="ui-h1 mt-1">Déclaration d&apos;applicabilité</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Brouillon de SoA : pour chaque mesure, applicable ou non, statut, et
            justification — surtout pour les exclusions. À faire viser par la
            direction avant l&apos;audit.
          </p>
        </div>
        <button
          type="button"
          disabled={!ready}
          onClick={() => downloadText(`SMISI-212_SoA_${slug}.csv`, soaCsv(assessment), "text/csv;charset=utf-8")}
          className="ui-btn-ghost disabled:opacity-40"
        >
          Export SoA (CSV)
        </button>
      </header>

      {!ready ? (
        <p className="mt-8 text-sm text-ink-faint">Chargement du dossier…</p>
      ) : (
        <>
          <section className="mt-8 grid gap-3 sm:grid-cols-4">
            <Stat label="Applicables" value={stats.applicable} />
            <Stat label="Exclues (N/A)" value={stats.excluded} />
            <Stat label="Sans réponse" value={stats.unanswered} />
            <Stat
              label="N/A sans justification"
              value={stats.missingJustif}
              warn={stats.missingJustif > 0}
            />
          </section>

          <div className="mt-6 flex flex-wrap gap-2">
            <Chip active={domain === "all"} onClick={() => setDomain("all")}>
              Tous
            </Chip>
            {DOMAINS.map((d) => (
              <Chip
                key={d.id}
                active={domain === d.id}
                onClick={() => setDomain(d.id)}
              >
                {d.annex} {d.short}
              </Chip>
            ))}
          </div>

          <div className="ui-card mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-paper text-xs font-semibold uppercase tracking-wide text-ink-faint">
                <tr className="border-b border-paper-line">
                  <th className="px-4 py-3 font-medium">Code</th>
                  <th className="px-4 py-3 font-medium">Mesure</th>
                  <th className="px-4 py-3 font-medium">Applicable</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                  <th className="px-4 py-3 font-medium">DNSSI</th>
                  <th className="px-4 py-3 font-medium">Justification</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => {
                  const a = assessment.answers[c.id];
                  const applicable = a && a !== "na";
                  return (
                    <tr key={c.id} className="border-t border-paper-line align-top">
                      <td className="whitespace-nowrap px-4 py-3 text-teal">A.{c.id}</td>
                      <td className="px-4 py-3 font-medium">{c.title}</td>
                      <td className="px-4 py-3">
                        {!a ? "—" : applicable ? "Oui" : "Non"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={a} empty={!a} />
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-faint">
                        {c.dnssi.map((d) => d.code).join(", ")}
                      </td>
                      <td className="px-4 py-3">
                        <textarea
                          rows={2}
                          value={assessment.justifications[c.id] ?? ""}
                          onChange={(e) => setJustification(c.id, e.target.value)}
                          placeholder={
                            a === "na"
                              ? "Obligatoire : pourquoi cette exclusion…"
                              : "Preuve, owner, commentaire…"
                          }
                          className="w-full min-w-[220px] px-2 py-1.5 text-xs"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AppShell>
  );
}

function Stat({
  label,
  value,
  warn,
}: {
  label: string;
  value: number;
  warn?: boolean;
}) {
  return (
    <article className="ui-card p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className={`mt-1 text-3xl font-semibold tabular-nums ${warn ? "text-rose" : ""}`}>{value}</p>
    </article>
  );
}

function soaCsv(a: import("@/lib/types").Assessment): string {
  const header = ["Code", "Titre", "Applicable", "Statut", "DNSSI", "Justification"];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const labels: Record<string, string> = {
    conforme: "Conforme",
    partiel: "Partiellement conforme",
    non_conforme: "Non conforme",
    na: "Non applicable",
  };
  const rows = CONTROLS.map((c) => {
    const ans = a.answers[c.id];
    return [
      c.id,
      c.title,
      !ans ? "—" : ans === "na" ? "Non" : "Oui",
      ans ? labels[ans] : "Sans réponse",
      c.dnssi.map((d) => d.code).join(" | "),
      a.justifications[c.id] ?? "",
    ].map(esc);
  });
  return ["\uFEFF" + header.map(esc).join(";"), ...rows.map((r) => r.join(";"))].join("\n");
}
