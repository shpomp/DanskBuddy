type Level = "beginner" | "intermediate" | "advanced" | "native";

interface Props {
  level: Level;
}

const BASE = "inline-block px-2.5 py-0.5 rounded-pill text-xs font-semibold";

const VARIANT: Record<Level, string> = {
  beginner: "bg-success-light text-success-dark",
  intermediate: "bg-warning-light text-warning",
  advanced: "bg-info-light text-info",
  native: "bg-info-light text-info",
};

export default function LevelBadge({ level }: Props) {
  return <span className={`${BASE} ${VARIANT[level]}`}>{level}</span>;
}
