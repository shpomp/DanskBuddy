import { useState } from "react";
import { translateMessage } from "../../utils/translateMessage";

export default function MessageBubble({ message, isMine }) {
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedText, setTranslatedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleTranslate() {
  if (translatedText) {
    setIsTranslated(true);
    return;
  }
  setIsLoading(true);
  try {
    const translated = await translateMessage(message.text);
    setTranslatedText(translated);
    setIsTranslated(true);
  } catch (err) {
    console.error("Translation failed:", err);
  } finally {
    setIsLoading(false); // always runs, even if API fails
  }
}
// 👇 this was missing
  function handleShowOriginal() {
    setIsTranslated(false);
  }

  return (
    <div className={isMine ? "message-row sent" : "message-row received"}>
      {/* Message text — shows original or translated */}
      <div className="message-bubble">
        {isTranslated ? translatedText : message?.text}
      </div>

      {/* Translate toggle button */}
      <button onClick={isTranslated ? handleShowOriginal : handleTranslate}>
        {isLoading ? "Translating..." : isTranslated ? "Show original" : "Translate"}
      </button>
    </div>
  );
}