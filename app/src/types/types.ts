export type UserRole = "learner" | "native" | "both";

export type User = {
  id: string;
  email?: string;
  name: string;
  avatar?: string;
  city?: string;
  role?: UserRole;
  danishLevel?: string;
  nativeLanguage?: string;
  learningGoals?: string[];
  topics?: string[];
  availability?: string[];
  bio?: string;
  createdAt?: string;
};
