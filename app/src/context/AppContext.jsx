import { createContext, useContext, useState, useEffect } from "react";
import { generateId } from "../utils/uuid";
import {
  getUsers,
  saveUsers,
  getMatches,
  saveMatches,
  getMessages,
  saveMessages,
  getPosts,
  savePosts,
} from "../utils/storage";
const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => getUsers());
  const [matches, setMatches] = useState(() => getMatches());
  const [messages, setMessages] = useState(() => getMessages());
  const [posts, setPosts] = useState(() => getPosts());

  useEffect(() => {
    saveUsers(users);
  }, [users]);
  useEffect(() => {
    saveMatches(matches);
  }, [matches]);
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);
  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  function registerUser(userData) {
    const newUser = {
      id: generateId(),
      createdAt: new Date().toISOString().split("T")[0],
      avatar: "😊",
      topics: [],
      ...userData,
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  }
  function getUserById(id) {
    return users.find((u) => u.id === id);
  }

  function sendMatchRequest(requesterId, receiverId) {
    const exists = matches.some(
      (m) =>
        (m.requesterId === requesterId && m.receiverId === receiverId) ||
        (m.requesterId === receiverId && m.receiverId === requesterId)
    );
    if (exists) return { success: false, error: "Already sent." };
    const match = {
      id: generateId(),
      requesterId,
      receiverId,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setMatches((prev) => [...prev, match]);
    return { success: true, match };
  }
  function respondToMatch(matchId, status) {
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, status } : m))
    );
  }
  function getMatchesForUser(userId) {
    return matches.filter(
      (m) => m.requesterId === userId || m.receiverId === userId
    );
  }

  function buildConversationId(userId1, userId2) {
    return [userId1, userId2].sort().join("-");
  }
  function sendMessage(senderId, receiverId, text) {
    const conversationId = buildConversationId(senderId, receiverId);
    const msg = {
      id: generateId(),
      conversationId,
      senderId,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] ?? []), msg],
    }));
    return msg;
  }
  function getConversation(userId1, userId2) {
    return messages[buildConversationId(userId1, userId2)] ?? [];
  }

  function createPost(authorId, authorName, content) {
    const post = {
      id: generateId(),
      authorId,
      authorName,
      content,
      createdAt: new Date().toISOString(),
      likes: [],
    };
    setPosts((prev) => [post, ...prev]);
    return post;
  }
  function toggleLike(postId, userId) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const liked = p.likes.includes(userId);
        return {
          ...p,
          likes: liked
            ? p.likes.filter((id) => id !== userId)
            : [...p.likes, userId],
        };
      })
    );
  }
  function deletePost(postId, requesterId) {
    const post = posts.find((p) => p.id === postId);
    if (!post) return { success: false, error: "Not found." };
    if (post.authorId !== requesterId)
      return { success: false, error: "Not allowed." };
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    return { success: true };
  }
  return (
    <AppContext.Provider
      value={{
        users,
        matches,
        messages,
        posts,
        registerUser,
        getUserById,
        sendMatchRequest,
        respondToMatch,
        getMatchesForUser,
        buildConversationId,
        sendMessage,
        getConversation,
        createPost,
        toggleLike,
        deletePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
