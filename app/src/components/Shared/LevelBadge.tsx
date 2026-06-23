export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";

interface Props {
  level: Level;
}

const BASE = "inline-flex items-center justify-center text-xs font-normal ";

const VARIANT = {
  A1: "text-success",
  A2: "text-success",
  B1: "text-success",
  B2: "text-success",
  C1: "text-success",
  C2: "text-success",
  native: "text-success",
};

export default function LevelBadge({ level }: Props) {
  return <span className={`${BASE} ${VARIANT[level]}`}>{level}</span>;
}
