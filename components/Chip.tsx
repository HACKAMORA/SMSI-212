export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`ui-chip ${active ? "ui-chip-on" : ""}`}
    >
      {children}
    </button>
  );
}
