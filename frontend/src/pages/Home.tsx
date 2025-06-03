import { useEffect, useRef, useState } from "react";
import { GoPaperAirplane } from "react-icons/go";
import type { Message } from "../types";
import ChatScreen from "../components/ChatScreen";

const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT;

const Home = () => {
  const [chats, setChats] = useState<Message[]>(() => {
    const savedChats = localStorage.getItem("chat");
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const [prompt, setPrompt] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [thinking, setThinking] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const addMessage = (message: Message) => {
    setChats((prev) => [...prev, message]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() === "") return;
    addMessage({ sender: "User", message: prompt });
    const userPrompt = prompt;
    setPrompt("");
    setThinking(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userPrompt,
          ...(sessionId && { sessionId }),
        }),
      });

      if (response.ok) {
        const body = await response.json();
        setSessionId(body.sessionId);
        addMessage({
          sender: "Bot",
          message: body.response,
        });
      } else throw new Error("Internal server error!");
    } catch (error) {
      console.error("Error:", error);
      addMessage({
        sender: "Bot",
        message: "Sorry, I am unable to process your request at the moment.",
      });
    } finally {
      setThinking(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    const firstChat = async () => {
      setThinking(true);
      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "hi",
          }),
        });

        if (response.ok) {
          const body = await response.json();
          setSessionId(body.sessionId);
          addMessage({
            sender: "Bot",
            message: body.response,
          });
        } else throw new Error("Internal server error!");
      } catch (error) {
        console.error("Error:", error);
        addMessage({
          sender: "Bot",
          message: "Sorry, I am unable to process your request at the moment.",
        });
      } finally {
        setThinking(false);
      }
    };

    if (chats.length === 0) {
      firstChat();
    }
  }, []);

  return (
    <div className="mx-auto px-4 w-full">
      <div className="flex flex-col justify-center gap-2">
        <ChatScreen chats={chats} thinking={thinking} />
        <form
          ref={formRef}
          className="mt-2 px-72 flex items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <textarea
            rows={1}
            placeholder="Got a question? Ask away..."
            className="px-4 py-3 h-12 input focus:input-primary w-full rounded-full overflow-hidden overflow-wrap break-words whitespace-pre-wrap"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            className="mx-2 p-2 group btn rounded-full size-14 bg-base-300 transition-all hover:scale-105"
            type="submit"
          >
            <GoPaperAirplane className="transition-all group-hover:scale-125 group-hover:-rotate-45 group-hover:text-primary" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
