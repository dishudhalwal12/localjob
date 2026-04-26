"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { subscribeToMessages, sendMessage } from "@/lib/chats";
import { subscribeToAuth } from "@/lib/auth";
import type { Message } from "@/types";

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeAuth = subscribeToAuth((user: any) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push("/list-yourself");
      }
    });

    const id = Array.isArray(chatId) ? chatId[0] : chatId;
    const unsubscribeMessages = subscribeToMessages(id, (newMessages) => {
      setMessages(newMessages);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, [chatId, router]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !userId) return;

    const id = Array.isArray(chatId) ? chatId[0] : chatId;
    await sendMessage(id, userId, text.trim());
    setText("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-offwhite">
      <header className="bg-white border-b border-black/10 p-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-muted">←</button>
        <h1 className="font-bold">Chat</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
              msg.senderId === userId ? "bg-crimson text-white rounded-br-none" : "bg-white border border-black/5 rounded-bl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-black/10 flex gap-2">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-[#f7f3ef] px-4 py-2 text-sm outline-none border border-transparent focus:border-crimson/20"
        />
        <button 
          type="submit"
          className="h-10 w-10 rounded-full bg-crimson text-white flex items-center justify-center font-bold"
        >
          →
        </button>
      </form>
    </div>
  );
}
