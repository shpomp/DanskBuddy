import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import MessageBubble from "./MessageBubble";

import "./Messages.css";

export default function ChatWindow() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { users, sendMessage, getConversation } = useApp();

  const { userId } = useParams();

  const [text, setText] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  const otherUser = users.find((u) => String(u.id) === String(userId));

  if (!otherUser) {
    return <p>User not found</p>;
  }

  const messages = getConversation(user.id, userId);

  const handleSend = () => {
    const message = text.trim();

    if (!message) return;

    sendMessage(user.id, userId, message);

    setText("");
  };

  return (
    <div className="chat-window">
      <button onClick={() => navigate("/messages")}>← Back</button>

      <div className="chat-header">
        <div className="avatar">{otherUser.avatar}</div>

        <div>
          <h3>{otherUser.name}</h3>
          <span>Online</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isMine={String(message.senderId) === String(user.id)}
            />
          ))
        )}
      </div>

      <div className="chat-input">
        <input
          value={text}
          placeholder={`Message ${otherUser.name}`}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
