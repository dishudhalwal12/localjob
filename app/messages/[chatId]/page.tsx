"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { subscribeToMessages, sendMessage } from "@/lib/chats";
import { useAuth } from "@/hooks/useAuth";
import type { Message } from "@/types";

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatId) return;
    
    const id = Array.isArray(chatId) ? chatId[0] : chatId;
    const unsubscribeMessages = subscribeToMessages(id, (newMessages) => {
      setMessages(newMessages);
    });

    return () => {
      unsubscribeMessages();
    };
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user) return;

    const id = Array.isArray(chatId) ? chatId[0] : chatId;
    await sendMessage(id, user.uid, text.trim());
    setText("");
  };

  return (
    <div className="flex flex-col h-full bg-offwhite">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === user?.uid ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] rounded-2xl p-4 text-sm shadow-sm ${
              msg.senderId === user?.uid 
                ? "bg-crimson text-white rounded-br-none" 
                : "bg-white border border-black/5 text-ink rounded-bl-none"
            }`}>
              {msg.text}
              <div className={`text-[9px] mt-1 opacity-50 text-right`}>
                {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="py-20 text-center text-muted italic text-sm">
            No messages yet. Send a message to start the conversation.
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="p-6 bg-white border-t border-black/10 flex gap-3">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 rounded-2xl bg-offwhite border border-black/5 px-5 py-4 text-sm outline-none focus:border-crimson/30 focus:bg-white transition-all"
        />
        <button 
          type="submit"
          className="h-[52px] w-[52px] rounded-2xl bg-crimson text-white flex items-center justify-center font-bold shadow-lg hover:shadow-crimson/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="text-xl">→</span>
        </button>
      </form>
    </div>
  );
}
