"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Chip } from "@/components/Chip";
import { StatusBadge } from "@/components/StatusBadge";
import { CONTROLS } from "@/data/controls";
import { DOMAINS } from "@/lib/domains";
import { useAssessment } from "@/lib/assessment-context";
import { TEMPLATES } from "@/lib/templates";
import type { DomainId } from "@/lib/types";

export default function LibraryPage() {
  const { assessment, ready } = useAssessment();
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [gaps, setGaps] = useState(false);
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CONTROLS.filter((c) => {
      if (domain !== "all" && c.domain !== domain) return false;
      if (gaps) {
        const a = assessment.answers[c.id];
        if (a !== "non_conforme" && a !== "partiel") return false;
      }
      if (!query) return true;
      const hay = `${c.id} ${c.title} ${c.explanation} ${c.dnssi.map((d) => d.code).join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [domain, gaps, q, assessment.answers]);

  return (
    <AppShell>
      <header>
        <p className="ui-kicker">Conformité · Référentiel</p>
        <h1 className="ui-h1 mt-1">Référentiel et modèles</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Pour chaque mesure : français simple, pourquoi ça compte pour une PME
          marocaine, premier pas, modèle, et colonne DNSSI.
        </p>
      </header>

      <section className="ui-card mt-6 p-5">
        <h2 className="text-sm font-semibold">Modèles documentaires</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {TEMPLATES.map((t) => (
            <li key={t.id} className="text-sm">
              <span className="text-[11px] uppercase tracking-wider text-ink-faint">
                {t.kind}
              </span>
              <p className="font-medium">{t.title}</p>
              <p className="text-ink-muted">{t.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Chip active={domain === "all"} onClick={() => setDomain("all")}>
          Tous
        </Chip>
        {DOMAINS.map((d) => (
          <Chip
            key={d.id}
            active={domain === d.id}
            onClick={() => setDomain(d.id)}
          >
            {d.short}
          </Chip>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher…"
          className="px-3 py-1.5 text-sm"
        />
        <label className="ml-auto flex items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={gaps}
            onChange={(e) => setGaps(e.target.checked)}
          />
          Écarts seulement
        </label>
      </div>

      <ul className="ui-card mt-4 divide-y divide-paper-line">
        {items.map((c) => (
          <li key={c.id}>
            <Link
              href={`/bibliotheque/${c.id}`}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-paper/70"
            >
              <div>
                <p className="text-xs text-teal">
                  A.{c.id}
                  <span className="ml-2 text-ink-faint">
                    DNSSI {c.dnssi.map((d) => d.code).join(", ")}
                  </span>
                </p>
                <p className="font-medium">{c.title}</p>
              </div>
              <StatusBadge
                status={assessment.answers[c.id]}
                empty={!ready || !assessment.answers[c.id]}
              />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-faint">{items.length} fiches</p>
    </AppShell>
  );
}
