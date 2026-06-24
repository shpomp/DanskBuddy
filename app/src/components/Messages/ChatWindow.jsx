import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import MessageBubble from "./MessageBubble";
import Chip from "../Shared/Chip";
import LevelBadge from "../Shared/LevelBadge";
import Avatar from "../Shared/Avatar";
import "./Messages.css";
import { Phone, Video } from "lucide-react";

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

  const displayLevel =
    otherUser.danishLevel === "beginner"
      ? "A1"
      : otherUser.danishLevel === "intermediate"
        ? "B1"
        : otherUser.danishLevel === "advanced"
          ? "C1"
          : "native";
  const messages = getConversation(user.id, userId);

  const handleSend = () => {
    const message = text.trim();

    if (!message) return;

    sendMessage(user.id, userId, message);

    setText("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header bg-white flex items-center px-4 h-[70px]">
        <button className="back-button" onClick={() => navigate("/messages")}>
          ←
        </button>

        <Avatar initials={otherUser.name.charAt(0)} online={true} size="lg" />
        <div className="chat-user-info">
          <div className="chat-name-row">
            <h3>{otherUser.name}</h3>
          </div>

          <div className="chat-meta">
            <Chip variant="subtle">Online</Chip>

            <span>·</span>

            <Chip variant="subtle">{otherUser.role}</Chip>

            <span>·</span>

            <LevelBadge level={displayLevel} />
          </div>
        </div>
        <div className="chat-actions">
          <button title="Voice call">
            <Phone size={20} />
          </button>

          <button title="Video call">
            <Video size={20} />
          </button>
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

        <button onClick={handleSend} aria-label="send">
          ➤
        </button>
      </div>
    </div>
  );
}
