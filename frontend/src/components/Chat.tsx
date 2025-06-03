import type { Message } from "../types";

interface ChatProps {
  message: Message;
}

const Chat = ({ message }: ChatProps) => {
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
          {message.message.replace(/^(?:\r?\n)+|(?:\r?\n)+$/g, "")}
        </div>
      </div>
    </div>
  );
};

export default Chat;
