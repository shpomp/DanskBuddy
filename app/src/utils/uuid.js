/**

- Generates a real UUID using the browser's built-in crypto API.
- Example output: "110e8400-e29b-41d4-a716-446655440000"
- 
- Note: This file is named uuid.js and generates true UUIDs,
- unlike the previous timestamp-based ID generator.
*/
export function generateId() {
  return crypto.randomUUID();
}
