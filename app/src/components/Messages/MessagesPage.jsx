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
  const conversations = Object.entries(messages || [])
    .reduce((result, [conversationId, msgs]) => {
      const [id1, id2] = conversationId.split("::");

      const isMine =
        String(id1) === String(user.id) || String(id2) === String(user.id);

      if (!isMine) return result;

      const otherUserId = String(id1) === String(user.id) ? id2 : id1;

      const otherUser = users.find((u) => String(u.id) === String(otherUserId));

      if (!otherUser) return result;

      const lastMsg = msgs[msgs.length - 1];

      result.push({
        conversationId,
        otherUser,
        lastMessage: lastMsg?.text ?? "",
        lastMessageAt: lastMsg?.createdAt ?? "",
      });

      return result;
    }, [])
    .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

      <MessagesList conversations={conversations} />
    </div>
  );
}
