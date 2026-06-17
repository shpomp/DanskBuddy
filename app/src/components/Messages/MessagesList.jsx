import { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../Shared/EmptyState";
import ChatWindow from "./ChatWindow";

import "./Messages.css";

export default function MessagesList() {
  const { user } = useAuth();

  const { messages, users } = useApp();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const currentUser = user || {
    id: "1",
  };
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const conversations = Object.entries(messages || {}).map(
    ([conversationId, msgs]) => {
      const [id1, id2] = conversationId.split("-");

      const otherUserId = String(id1) === String(currentUser.id) ? id2 : id1;

      const otherUser = users.find((u) => String(u.id) === String(otherUserId));

      return {
        conversationId,

        otherUser,

        lastMessage: msgs[msgs.length - 1]?.text || "",
      };
    }
  );

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

      {conversations.map((conversation) => (
        <div
          key={conversation.conversationId}
          className="conversation-item"
          onClick={() => setSelectedUserId(String(conversation.otherUser?.id))}
        >
          <div className="avatar">{conversation.otherUser?.avatar}</div>

          <div>
            <h4>{conversation.otherUser?.name}</h4>

            <p>{conversation.lastMessage}</p>
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>

      {selectedUserId && <ChatWindow otherUserId={selectedUserId} />}
    </div>
  );
}
