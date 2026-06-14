type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";

interface Props {
  level: Level;
}

export default function LevelBadge({ level }: Props) {
  let className = "badge-gray";

  if (level === "beginner") className = "badge-green";
  if (level === "intermediate") className = "badge-blue";
  if (level === "advanced" || level === "native") {
    className = "badge-purple";
  }

  return <span className={className}>{level}</span>;
}
