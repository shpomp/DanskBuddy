export type UserRole = "learner" | "native";

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
  interests?: string[];
  availability?: string[];
  bio?: string;
  createdAt?: string;
};

export type MatchStatus = "pending" | "accepted" | "declined";

export type Match = {
  id: string;
  requesterId: string;
  receiverId: string;
  status: MatchStatus;
  createdAt: string;
};

export type SendMatchResult =
  | {
      success: true;
      match: Match;
    }
  | {
      success: false;
      error: string;
    };
