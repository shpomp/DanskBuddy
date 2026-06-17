import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../Shared/EmptyState";

import { useNavigate } from "react-router-dom";
import "./Messages.css";

export default function MessagesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { users } = useApp();

  const currentUser = user || {
    id: "1",
  };

  const availableUsers = users.filter(
    (u) => String(u.id) !== String(currentUser.id)
  );

  if (availableUsers.length === 0) {
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

      {availableUsers.map((person) => (
        <div
          key={person.id}
          className="conversation-item"
          onClick={() => navigate(`/messages/${person.id}`)}
        >
          <div className="avatar">{person.avatar}</div>

          <div>
            <h4>{person.name}</h4>

            <p>Start conversation</p>
          </div>
        </div>
      ))}
    </div>
  );
}
