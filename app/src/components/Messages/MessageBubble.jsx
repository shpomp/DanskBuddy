export default function MessageBubble({ message, isMine }) {
  return (
    <div className={isMine ? "message-row sent" : "message-row received"}>
      <div className="message-bubble">{message?.text}</div>
    </div>
  );
}
