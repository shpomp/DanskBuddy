const BASE =
  "inline-flex items-center justify-center px-5 py-2.5 rounded-sm text-sm font-semibold cursor-pointer border-0 disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANT = {
  primary: "bg-primary text-white",
  secondary: "bg-surface text-text",
  // TODO: add "outline" and "ghost" variants
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
