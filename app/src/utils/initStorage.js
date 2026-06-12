import seedData from "../data/seedData";

const KEY = "danskbuddy_users";

export const initStorage = () => {
  try {
    const existing = localStorage.getItem(KEY);

    if (!existing) {
      localStorage.setItem(KEY, JSON.stringify(seedData));
      console.log("Seed data initialized in localStorage");
    }
  } catch (error) {
    console.error("Failed to initialize localStorage:", error);
  }
};
