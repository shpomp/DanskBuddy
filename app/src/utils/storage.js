export const KEYS = {
  USERS: "danskbuddy_users",
  CURRENT: "danskbuddy_current",
  MATCHES: "danskbuddy_matches",
  MESSAGES: "danskbuddy_messages",
  POSTS: "danskbuddy_posts",
};

export function getItem(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Storage error:", err);
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function getUsers() {
  return getItem(KEYS.USERS) || [];
}
export function saveUsers(users) {
  setItem(KEYS.USERS, users);
}

export function getMatches() {
  return getItem(KEYS.MATCHES) || [];
}
export function saveMatches(matches) {
  setItem(KEYS.MATCHES, matches);
}

// ⚠️ IMPORTANT: messages default is {} (an object), NOT [].
// Messages are stored as { conversationId: [messages] }
// Do NOT change this to || [] — it will break sendMessage and getConversation.
export function getMessages() {
  return getItem(KEYS.MESSAGES) || {};
}
export function saveMessages(messages) {
  setItem(KEYS.MESSAGES, messages);
}

export function getPosts() {
  return getItem(KEYS.POSTS) || [];
}
export function savePosts(posts) {
  setItem(KEYS.POSTS, posts);
}

export function getCurrentUser() {
  const id = getItem(KEYS.CURRENT);
  if (!id) return null;
  return getUsers().find((u) => String(u.id) === String(id)) || null;
}

export function setCurrentUser(userId) {
  setItem(KEYS.CURRENT, userId);
}
export function clearCurrentUser() {
  removeItem(KEYS.CURRENT);
}
