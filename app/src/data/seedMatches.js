// Test personas (all password: password123)
// Maja (id:1, native)  — login to see all three tabs.
// Carlos (id:7) — Sent tab shows his request to Maja; Connected with Sofie (3)
// Priya (id:6)  — Sent tab shows her request to Maja; Connected with Carlos (7)
// Lars (id:2)   — Connected with Maja (1)

const seedMatches = [
  // --- Incoming for Maja (shows in her Pending tab) ---
  {
    id: "match-1",
    requesterId: "7",
    receiverId: "1",
    status: "pending",
    createdAt: "2026-01-15",
  },
  {
    id: "match-2",
    requesterId: "6",
    receiverId: "1",
    status: "pending",
    createdAt: "2026-01-16",
  },

  // --- Outgoing from Maja (shows in her Sent tab) ---
  {
    id: "match-3",
    requesterId: "1",
    receiverId: "5",
    status: "pending",
    createdAt: "2026-01-17",
  },

  // --- Accepted connections ---
  {
    id: "match-4",
    requesterId: "1",
    receiverId: "2",
    status: "accepted",
    createdAt: "2026-01-10",
  },
  {
    id: "match-5",
    requesterId: "7",
    receiverId: "3",
    status: "accepted",
    createdAt: "2026-01-12",
  },
  {
    id: "match-6",
    requesterId: "6",
    receiverId: "7",
    status: "accepted",
    createdAt: "2026-01-13",
  },
];

export default seedMatches;
