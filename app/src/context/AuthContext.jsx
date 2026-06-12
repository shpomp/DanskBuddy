import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  getUsers,
  saveUsers,
} from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const found = getCurrentUser();
    setUser(found);
  }, []);
  function login(email, password) {
    const users = getUsers();
    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) return { success: false, error: "Invalid email or password." };
    setCurrentUser(match.id);
    setUser(match);
    return { success: true, user: match };
  }
  function logout() {
    clearCurrentUser();
    setUser(null);
  }
  function updateUser(updatedData) {
    if (!user) return;
    const users = getUsers();
    const updatedUser = { ...user, ...updatedData };
    saveUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    setUser(updatedUser);
    return updatedUser;
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
