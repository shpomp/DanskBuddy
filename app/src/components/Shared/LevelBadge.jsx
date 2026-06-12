export default function LevelBadge({ level }) {
  let className = "badge-gray";

  if (level === "A1" || level === "A2") className = "badge-green";
  if (level === "B1" || level === "B2") className = "badge-blue";
  if (level === "C1" || level === "C2" || level === "native") {
    className = "badge-purple";
  }

  return <span className={className}>{level}</span>;
}
