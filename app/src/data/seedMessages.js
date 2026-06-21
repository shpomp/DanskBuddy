// Conversations between connected users.
// Key format must match buildConversationId: sort([id1, id2]).join("::")
//   Maja(1) & Lars(2)   → "1::2"
//   Carlos(7) & Sofie(3)→ "3::7"
//   Priya(6) & Carlos(7)→ "6::7"

const seedMessages = {
  "1::2": [
    {
      id: "msg-1",
      conversationId: "1::2",
      senderId: "2",
      text: "Hej Maja! Tak fordi du accepterede min anmodning.",
      createdAt: "2026-01-11T09:00:00Z",
    },
    {
      id: "msg-2",
      conversationId: "1::2",
      senderId: "1",
      text: "Hej Lars! Selvfølgelig, det er en fornøjelse.",
      createdAt: "2026-01-11T09:05:00Z",
    },
    {
      id: "msg-3",
      conversationId: "1::2",
      senderId: "2",
      text: "Hvornår har du tid til at øve udtale?",
      createdAt: "2026-01-11T09:07:00Z",
    },
    {
      id: "msg-4",
      conversationId: "1::2",
      senderId: "1",
      text: "Jeg er ledig i weekenden. Lørdag kl. 14?",
      createdAt: "2026-01-11T09:10:00Z",
    },
    {
      id: "msg-5",
      conversationId: "1::2",
      senderId: "2",
      text: "Perfekt, vi ses lørdag!",
      createdAt: "2026-01-11T09:11:00Z",
    },
  ],

  "3::7": [
    {
      id: "msg-6",
      conversationId: "3::7",
      senderId: "7",
      text: "Hola Sofie! I mean... Hej Sofie!",
      createdAt: "2026-01-13T14:00:00Z",
    },
    {
      id: "msg-7",
      conversationId: "3::7",
      senderId: "3",
      text: "Haha, hej Carlos! Du er allerede i gang 😄",
      createdAt: "2026-01-13T14:03:00Z",
    },
    {
      id: "msg-8",
      conversationId: "3::7",
      senderId: "7",
      text: "Jeg prøver! Kan du hjælpe mig med bøjning af verber?",
      createdAt: "2026-01-13T14:05:00Z",
    },
    {
      id: "msg-9",
      conversationId: "3::7",
      senderId: "3",
      text: "Ja, det kan jeg. Lad os starte med 'at være' og 'at have'.",
      createdAt: "2026-01-13T14:08:00Z",
    },
  ],

  "6::7": [
    {
      id: "msg-10",
      conversationId: "6::7",
      senderId: "6",
      text: "Hej Carlos! Jeg så at du også lærer dansk.",
      createdAt: "2026-01-14T10:00:00Z",
    },
    {
      id: "msg-11",
      conversationId: "6::7",
      senderId: "7",
      text: "Ja! Hvor langt er du kommet?",
      createdAt: "2026-01-14T10:02:00Z",
    },
    {
      id: "msg-12",
      conversationId: "6::7",
      senderId: "6",
      text: "Jeg er begynder, men jeg øver hver dag.",
      createdAt: "2026-01-14T10:04:00Z",
    },
  ],
};

export default seedMessages;
