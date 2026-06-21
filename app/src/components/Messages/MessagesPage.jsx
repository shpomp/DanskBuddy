import { Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../Shared/EmptyState";
import MessagesList from "./MessagesList";

import "./Messages.css";

export default function MessagesPage() {
  const { user } = useAuth();
  const { users, messages } = useApp();
  console.log("MESSAGES OBJECT:", messages);
  if (!user) {
    return <Navigate to="/login" />;
  }

  const conversations = users
    .filter((u) => String(u.id) !== String(user.id))
    .map((otherUser) => {
      const conversationId = [user.id, otherUser.id].sort().join("::");

      const msgs = messages[conversationId] || [];

      return {
        conversationId,
        otherUser,
        lastMessage: msgs[msgs.length - 1]?.text || "Start conversation",
      };
    });

  if (conversations.length === 0) {
    return (
      <EmptyState
        icon="💬"
        heading="No conversations yet"
        message="Start chatting with someone!"
      />
    );
  }

  return (
    <div className="messages-container">
      <h2>Messages</h2>

      <MessagesList conversations={conversations} />
    </div>
  );
}
