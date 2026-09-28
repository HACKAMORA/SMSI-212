export function ScoreRing({
  score,
  size = 168,
  label = "Maturité",
}: {
  score: number | null;
  size?: number;
  label?: string;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const pct = score ?? 0;
  const dash = (pct / 100) * c;
  const color =
    score === null ? "#D6D4CC" : score >= 70 ? "#059669" : score >= 45 ? "#D97706" : "#E11D48";

  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#EDECE6" strokeWidth="9" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl font-semibold leading-none tabular-nums">
          {score === null ? "—" : score}
          {score !== null && <span className="text-base font-medium text-ink-faint">%</span>}
        </p>
        <p className="mt-1 text-xs text-ink-faint">{label}</p>
      </div>
    </div>
  );
}
