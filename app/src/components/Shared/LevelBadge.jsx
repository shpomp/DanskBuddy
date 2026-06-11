export default function LevelBadge({ level }) {
  let color = "gray";

  if (level === "A1" || level === "A2") color = "green";
  if (level === "B1" || level === "B2") color = "blue";
  if (level === "C1" || level === "native") color = "purple";

  return <span style={{ color, fontWeight: "bold" }}>{level}</span>;
}
