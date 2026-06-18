import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../Shared/EmptyState";
import { Navigate } from "react-router-dom";
import MessagesList from "./MessagesList";
import "./Messages.css";

export default function MessagesPage() {
  const { user } = useAuth();

  const { users } = useApp();
  if (!user) {
    return <Navigate to="/login" />;
  }

  const conversations = users.filter((u) => String(u.id) !== String(user.id));

  if (conversations.length === 0) {
    return (
      <EmptyState
        icon="💬"
        heading="No users found"
        message="No one to chat with"
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
