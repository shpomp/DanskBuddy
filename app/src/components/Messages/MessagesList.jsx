import { useNavigate } from "react-router-dom";
import Avatar from "../Shared/Avatar";
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
          {" "}
          <Avatar
            initials={conversation.otherUser.name.charAt(0)}
            online={true}
            size="md"
          />
          <div>
            <h4>{conversation.otherUser.name}</h4>

            <p>{conversation.lastMessage || "Start conversation"}</p>
          </div>
        </div>
      ))}
    </>
  );
}
