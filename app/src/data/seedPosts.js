// Feed posts from several users with varying like counts.
// likes[] holds the IDs of users who liked the post.

const seedPosts = [
  {
    id: "post-1",
    authorId: "6",
    authorName: "Priya Sharma",
    content:
      "Første gang jeg bestilte kaffe på dansk uden at skifte til engelsk! Baristen forstod mig 🎉 'En stor kaffe latte tak!'",
    createdAt: "2026-01-18T08:30:00Z",
    likes: ["1", "2", "3", "7"],
  },
  {
    id: "post-2",
    authorId: "1",
    authorName: "Maja Nielsen",
    content:
      "Tip til alle danskindlærere: prøv at se danske børneprogrammer. Sproget er enkelt og udtalen er tydelig. DR Ramasjang er et godt sted at starte!",
    createdAt: "2026-01-17T11:00:00Z",
    likes: ["6", "7", "8", "9", "10"],
  },
  {
    id: "post-3",
    authorId: "7",
    authorName: "Carlos Mendez",
    content:
      "Hvilken forskel er der på 'hej' og 'goddag'? Jeg bruger dem om hverandre og folk griner af mig 😅",
    createdAt: "2026-01-16T15:45:00Z",
    likes: ["1", "6"],
  },
  {
    id: "post-4",
    authorId: "3",
    authorName: "Sofie Christensen",
    content:
      "'Hej' er hverdagslig og uformel — brug det med alle. 'Goddag' er formelt og høres sjældent nu til dags, mest hos ældre eller i butikker. Svar til Carlos 👆",
    createdAt: "2026-01-16T16:10:00Z",
    likes: ["7", "8", "6", "9"],
  },
  {
    id: "post-5",
    authorId: "9",
    authorName: "Ivan Petrov",
    content:
      "Beståede min Prøve i Dansk 2 i dag! Det har taget 8 måneder men det var det hele værd. Tak til alle mine sprogpartnere her 🏆",
    createdAt: "2026-01-15T18:00:00Z",
    likes: ["1", "2", "3", "6", "7", "8", "10"],
  },
  {
    id: "post-6",
    authorId: "2",
    authorName: "Lars Andersen",
    content:
      "Søger en engelsktalende sprogpartner til at bytte: du lærer dansk, jeg øver engelsk. Skriver du til mig? 🤝",
    createdAt: "2026-01-14T09:20:00Z",
    likes: ["10", "15"],
  },
];

export default seedPosts;
