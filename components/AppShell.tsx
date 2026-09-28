"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoActions } from "@/components/DemoActions";
import { useAssessment } from "@/lib/assessment-context";
import { overallScore, progressPct } from "@/lib/scoring";

const NAV = [
  { href: "/diagnostic", label: "Évaluation" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/plan", label: "Plan" },
  { href: "/bibliotheque", label: "Référentiel" },
  { href: "/soa", label: "SoA" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { assessment, ready } = useAssessment();
  const pct = ready ? progressPct(assessment.answers) : 0;
  const score = ready ? overallScore(assessment.answers) : null;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-paper-line/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 lg:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-teal text-xs font-bold text-white">
              S
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              SMISI-212
            </span>
          </Link>

          <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
            {NAV.map((item) => {
              const active = path === item.href || path.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                    active
                      ? "bg-ink text-white"
                      : "text-ink-muted hover:bg-paper hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 text-xs text-ink-muted md:flex">
            <span className="max-w-[140px] truncate">
              {assessment.orgName || "Sans organisation"}
            </span>
            <span className="tabular-nums font-medium text-ink">
              {ready ? `${pct}%` : "…"}
              {score !== null ? ` · ${score}` : ""}
            </span>
            {assessment.isDemo && (
              <span className="rounded-full bg-teal-soft px-2 py-0.5 font-medium text-teal">
                démo
              </span>
            )}
          </div>
          <div className="hidden lg:block">
            <DemoActions compact />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">{children}</main>
    </div>
  );
}
