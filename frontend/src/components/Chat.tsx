import type { Message } from "../types";
import { type JSX } from "react";

interface ChatProps {
  message: Message;
}

function linkify(text: string): JSX.Element[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

const Chat = ({ message }: ChatProps) => {
  const cleanedMessage = message.message.replace(/^(?:\r?\n)+|(?:\r?\n)+$/g, "");

  return (
    <div
      className={`chat ${
        message.sender === "User" ? "chat-end" : "chat-start"
      }`}
    >
      <div
        className={`mx-2 my-1 chat-header font-bold ${
          message.sender === "Bot" && "text-primary"
        }`}
      >
        {message.sender === "User" ? "You" : "SFDC Chatbot"}
      </div>
      <div
        className={`chat-bubble flex flex-col rounded-box md:text-lg ${
          message.sender === "User" && "chat-bubble-primary"
        }`}
      >
        <div className="m-2 whitespace-pre-line">
          {message.sender === "Bot" ? linkify(cleanedMessage) : cleanedMessage}
        </div>
      </div>
    </div>
  );
};

export default Chat;
