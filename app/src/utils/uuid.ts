/**

- Generates a real UUID using the browser's built-in crypto API.
- Example output: "110e8400-e29b-41d4-a716-446655440000"
*/
export function generateId() {
  return crypto.randomUUID();
}
