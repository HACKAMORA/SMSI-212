import Link from "next/link";
import { DemoActions } from "@/components/DemoActions";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-sm font-bold text-white">
            S
          </span>
          <span className="text-sm font-semibold tracking-tight">SMISI-212</span>
        </div>
        <Link href="/diagnostic" className="ui-btn-ghost">
          Entrer
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="ui-kicker">ISO 27001 · DNSSI · Casa / Rabat</p>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              La conformité,
              <br />
              <span className="text-ink-muted">sans le théâtre du RSSI.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              93 mesures, un score de maturité, un plan d&apos;action et les
              modèles. Pour le DSI d&apos;une PME qui a 18 mois et un client
              européen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/diagnostic" className="ui-btn-primary h-12 px-6">
                Lancer l&apos;évaluation
              </Link>
              <DemoActions />
            </div>
          </div>

          <div className="relative">
            <div className="ui-card p-6">
              <p className="text-xs font-medium text-ink-faint">Atlas Connect · BPO Casa</p>
              <p className="mt-4 text-6xl font-semibold tracking-tight">
                39<span className="text-2xl text-ink-faint">%</span>
              </p>
              <p className="mt-1 text-sm text-ink-muted">Maturité globale · point zéro</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["A.5 Org.", "34%"],
                  ["A.6 RH", "50%"],
                  ["A.7 Phys.", "41%"],
                  ["A.8 Tech", "38%"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-paper px-3 py-3">
                    <p className="text-xs text-ink-faint">{k}</p>
                    <p className="mt-1 text-lg font-semibold">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Éval", "93 questions claires"],
            ["Radar", "4 domaines, avant / après"],
            ["Plan", "Priorisé, PDF, Excel"],
            ["Fiches", "Français + modèles"],
            ["SoA", "Exclusions justifiées"],
          ].map(([t, d]) => (
            <article key={t} className="ui-card p-5">
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-2 text-sm text-ink-muted">{d}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
