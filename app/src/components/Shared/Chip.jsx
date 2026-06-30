const BASE =
  "inline-flex items-center px-[14px] py-[8px] rounded-pill text-[13px] font-bold cursor-pointer";

const VARIANT = {
  filled: "bg-primary text-white border-0",
  outline: "bg-white text-neutral border border-surface",
  subtle: "bg-transparent text-success border-0 !px-0 !py-0 font-normal",
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
