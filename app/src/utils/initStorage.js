import seedUsers from "../data/seedData";
import seedMatches from "../data/seedMatches";
import seedMessages from "../data/seedMessages";
import seedPosts from "../data/seedPosts";

const KEYS = {
  USERS: "danskbuddy_users",
  MATCHES: "danskbuddy_matches",
  MESSAGES: "danskbuddy_messages",
  POSTS: "danskbuddy_posts",
};

const seeds = [
  { key: KEYS.USERS, data: seedUsers },
  { key: KEYS.MATCHES, data: seedMatches },
  { key: KEYS.MESSAGES, data: seedMessages },
  { key: KEYS.POSTS, data: seedPosts },
];

export const initStorage = () => {
  try {
    seeds.forEach(({ key, data }) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    });
  } catch (error) {
    console.error("Failed to initialize localStorage:", error);
  }
};
