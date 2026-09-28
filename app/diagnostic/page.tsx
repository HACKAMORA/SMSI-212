"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Chip } from "@/components/Chip";
import { ANSWER_OPTIONS, StatusBadge } from "@/components/StatusBadge";
import { CONTROLS, controlsInDomain } from "@/data/controls";
import { DOMAINS, DOMAIN_ORDER } from "@/lib/domains";
import { useAssessment } from "@/lib/assessment-context";
import { SECTORS } from "@/lib/storage";
import type { Answer, DomainId } from "@/lib/types";

export default function DiagnosticPage() {
  const { assessment, setMeta, answer, setJustification, ready } = useAssessment();
  const [domain, setDomain] = useState<DomainId>("organisationnel");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    return controlsInDomain(domain).filter((c) => {
      if (onlyOpen && assessment.answers[c.id]) return false;
      if (!query) return true;
      return (
        c.id.includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.question.toLowerCase().includes(query)
      );
    });
  }, [domain, onlyOpen, q, assessment.answers]);

  const doneInDomain = controlsInDomain(domain).filter(
    (c) => assessment.answers[c.id],
  ).length;

  return (
    <AppShell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ui-kicker">Conformité · Évaluation</p>
          <h1 className="ui-h1 mt-1">Évaluation Annexe A</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            {CONTROLS.length} mesures de l&apos;Annexe A (2022). Répondez domaine
            par domaine. Tout est enregistré dans ce navigateur.
          </p>
        </div>
        <p className="text-sm text-ink-faint">
          {ready ? Object.keys(assessment.answers).length : 0} / {CONTROLS.length}{" "}
          répondues
        </p>
      </header>

      <section className="ui-card mt-6 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-xs text-ink-faint">
          Organisation
          <input
            value={assessment.orgName}
            onChange={(e) => setMeta({ orgName: e.target.value })}
            placeholder="Ex. Atlas Connect"
            className="mt-1 w-full px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-xs text-ink-faint">
          Secteur
          <select
            value={assessment.sector}
            onChange={(e) => setMeta({ sector: e.target.value })}
            className="mt-1 w-full px-3 py-2 text-sm"
          >
            {SECTORS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-xs text-ink-faint">
          Ville
          <input
            value={assessment.city}
            onChange={(e) => setMeta({ city: e.target.value })}
            className="mt-1 w-full px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-xs text-ink-faint">
          Cible de certification
          <input
            type="month"
            value={assessment.targetDate}
            onChange={(e) => setMeta({ targetDate: e.target.value })}
            className="mt-1 w-full px-3 py-2 text-sm"
          />
        </label>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        {DOMAINS.map((d) => {
          const total = controlsInDomain(d.id).length;
          const done = controlsInDomain(d.id).filter(
            (c) => assessment.answers[c.id],
          ).length;
          const active = domain === d.id;
          return (
            <Chip key={d.id} active={active} onClick={() => setDomain(d.id)}>
              {d.annex} {d.label}
              <span className="ml-2 text-xs opacity-70">
                {done}/{total}
              </span>
            </Chip>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filtrer un contrôle…"
          className="w-full max-w-xs px-3 py-2 text-sm"
        />
        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={onlyOpen}
            onChange={(e) => setOnlyOpen(e.target.checked)}
          />
          Masquer les déjà répondues
        </label>
        <p className="text-sm text-ink-faint">
          {doneInDomain}/{controlsInDomain(domain).length} dans ce domaine
        </p>
      </div>

      <ol className="mt-6 space-y-4">
        {items.map((c) => {
          const current = assessment.answers[c.id];
          return (
            <li
              key={c.id}
              className="ui-card p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-teal">
                    A.{c.id}
                    {c.dnssi[0] && (
                      <span className="ml-2 font-normal text-ink-faint">
                        · DNSSI {c.dnssi.map((d) => d.code).join(", ")}
                      </span>
                    )}
                  </p>
                  <h2 className="mt-1 text-base font-semibold">{c.title}</h2>
                </div>
                <StatusBadge status={current} empty={!current} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {c.question}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ANSWER_OPTIONS.map((opt) => {
                  const on = current === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        answer(c.id, on ? null : (opt.value as Answer))
                      }
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                        on
                          ? toneClass(opt.value)
                          : "bg-paper text-ink-muted ring-paper-line hover:text-ink"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {current === "na" && (
                <textarea
                  value={assessment.justifications[c.id] ?? ""}
                  onChange={(e) => setJustification(c.id, e.target.value)}
                  placeholder="Justification de l'exclusion (exigée pour la SoA)…"
                  rows={2}
                  className="mt-3 w-full px-3 py-2 text-sm"
                />
              )}
              <p className="mt-4 text-sm text-ink-muted">
                <span className="font-medium text-ink">En pratique. </span>
                {c.howToStart}{" "}
                <Link
                  href={`/bibliotheque/${c.id}`}
                  className="text-teal underline-offset-2 hover:underline"
                >
                  Fiche pédagogique
                </Link>
              </p>
            </li>
          );
        })}
      </ol>

      <nav className="mt-8 flex justify-between text-sm">
        <DomainNav current={domain} dir={-1} onChange={setDomain} />
        <DomainNav current={domain} dir={1} onChange={setDomain} />
      </nav>
    </AppShell>
  );
}

function toneClass(value: Answer): string {
  if (value === "conforme") return "bg-moss-soft text-moss ring-moss/20";
  if (value === "partiel") return "bg-amber-soft text-amber ring-amber/20";
  if (value === "non_conforme") return "bg-rose-soft text-rose ring-rose/20";
  return "bg-paper-line text-ink-muted ring-transparent";
}

function DomainNav({
  current,
  dir,
  onChange,
}: {
  current: DomainId;
  dir: -1 | 1;
  onChange: (id: DomainId) => void;
}) {
  const i = DOMAIN_ORDER.indexOf(current) + dir;
  if (i < 0 || i >= DOMAIN_ORDER.length) return <span />;
  const next = DOMAINS.find((d) => d.id === DOMAIN_ORDER[i])!;
  return (
    <button
      type="button"
      onClick={() => onChange(next.id)}
      className="text-teal hover:underline"
    >
      {dir < 0 ? "←" : ""} {next.label} {dir > 0 ? "→" : ""}
    </button>
  );
}
