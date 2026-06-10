export default function api(route) {
  const a = "a";
  return `${import.meta.env.VITE_API_URL}/api${route}`;
}
