import { Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../Shared/EmptyState";
import MessagesList from "./MessagesList";

import "./Messages.css";

export default function MessagesPage() {
  const { user } = useAuth();
  const { users, messages } = useApp();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const conversations = Object.entries(messages || {})
    .map(([conversationId, msgs]) => {
      const [id1, id2] = conversationId.split("-");

      const otherUserId = String(id1) === String(user.id) ? id2 : id1;

      const otherUser = users.find((u) => String(u.id) === String(otherUserId));

      if (!otherUser) {
        return null;
      }

      return {
        conversationId,
        otherUser,
        lastMessage: msgs[msgs.length - 1]?.text || "",
      };
    })
    .filter(Boolean);

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
