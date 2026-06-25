import { createContext, useContext, useState, useCallback } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  getUsers,
  saveUsers,
} from "../utils/storage";

// ─── Password hashing ─────────────────────────────────────────────────────────
// Uses the browser's built-in crypto.subtle — no extra packages needed.
// We hash before storing so plain text passwords never appear in localStorage.

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
// onUpdateUser — optional callback passed in from AppContext so both
// contexts stay in sync when a user's profile is updated.
// Without this, AuthContext and AppContext would hold different versions
// of the same user object until the next page reload.
export function AuthProvider({ children, onUpdateUser }) {
  const [user, setUser] = useState(() => getCurrentUser());

  /**

- login(email, password)
- Hashes the password before comparing — never compares plain text.
- Returns { success: true, user } or { success: false, error }
*/
  const login = useCallback(async (email, password) => {
    const hashed = await hashPassword(password);
    const users = getUsers();
    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === hashed
    );
    if (!match) return { success: false, error: "Invalid email or password." };
    setCurrentUser(match.id);
    setUser(match);
    return { success: true, user: match };
  }, []);

  /**

- logout()
- Clears the session from state and localStorage.
*/
  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  /**

- updateUser(updatedData)
- Updates the current user in localStorage AND notifies AppContext
- via the onUpdateUser callback so both stay in sync.
- 
- Without the callback, AppContext.users would still hold the old
- user data until the next reload — causing a desync bug.
*/
  const updateUser = useCallback(
    (updatedData) => {
      if (!user) return;

      const users = getUsers();
      const updatedUser = { ...user, ...updatedData };
      const updatedUsers = users.map((u) =>
        u.id === user.id ? updatedUser : u
      );

      saveUsers(updatedUsers);
      setUser(updatedUser);

      // Tell AppContext about the change so its users state also updates
      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }

      return updatedUser;
    },
    [user, onUpdateUser]
  );

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, hashPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;
