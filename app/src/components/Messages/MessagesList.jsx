import { useNavigate } from "react-router-dom";

export default function MessagesList({ conversations }) {
  const navigate = useNavigate();

  return (
    <>
      {conversations.map((conversation) => (
        <div
          key={conversation.conversationId}
          className="conversation-item"
          onClick={() => navigate(`/messages/${conversation.otherUser.id}`)}
        >
          <div className="avatar">{conversation.otherUser.avatar}</div>

          <div>
            <h4>{conversation.otherUser.name}</h4>

            <p>{conversation.lastMessage || "Start conversation"}</p>
          </div>
        </div>
      ))}
    </>
  );
}
