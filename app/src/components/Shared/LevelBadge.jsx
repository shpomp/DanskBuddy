export default function LevelBadge({ level }) {
  let className = "badge-gray";

  if (level === "beginner") className = "badge-green";
  if (level === "intermediate") className = "badge-blue";
  if (level === "advanced" || level === "native") {
    className = "badge-purple";
  }

  return <span className={className}>{level}</span>;
}
