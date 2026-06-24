import { useNavigate } from "react-router-dom";
import Avatar from "../Shared/Avatar";

export default function MessagesList({ conversations }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {conversations.map((conversation) => (
        <div
          key={conversation.conversationId}
          onClick={() => navigate(`/messages/${conversation.otherUser.id}`)}
          className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
        >
          <Avatar
            initials={conversation.otherUser.name.charAt(0)}
            online={true}
            size="md"
          />

          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900">
              {conversation.otherUser.name}
            </h4>

            <p className="text-sm text-gray-500 truncate">
              {conversation.lastMessage || "Start conversation"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
