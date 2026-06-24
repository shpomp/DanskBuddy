const BASE = "inline-flex items-center text-[13px] font-normal cursor-pointer";
const VARIANT = {
  filled: "bg-primary text-white border-0",
  outline: "bg-white text-neutral border border-surface",
  subtle: "bg-transparent text-success border-0",
};
export default function Chip({ children, variant = "filled", onClick }) {
  return (
    <span
      onClick={onClick}
      className={`${BASE} ${VARIANT[variant] ?? VARIANT.filled}`}
    >
      {children}
    </span>
  );
}
