const BASE =
  "inline-flex items-center justify-center px-[22px] py-[11px] rounded-pill text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANT = {
  primary: "bg-primary text-white border-0 shadow-primary",
  secondary: "bg-surface text-foreground border-0",
  outline: "bg-white text-foreground border border-surface",
  // TODO: add "ghost" variant
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE} ${VARIANT[variant] ?? VARIANT.primary}`}
    >
      {children}
    </button>
  );
}
