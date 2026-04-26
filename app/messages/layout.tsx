"use client";

import React, { useEffect, useState } from "react";
import { subscribeToUserChats } from "@/lib/chats";
import { subscribeToAuth } from "@/lib/auth";
import { getWorkerById } from "@/lib/workers";
import { getUserProfile } from "@/lib/users";
import type { Chat } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<(Chat & { otherUser?: { name: string } })[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId, loading: userLoading } = useUser();
  const params = useParams();
  const activeChatId = params?.chatId;

  useEffect(() => {
    if (!userId) return;

    const unsubscribeChats = subscribeToUserChats(
      userId,
      async (userChats) => {
        try {
          const enrichedChats = await Promise.all(
            userChats.map(async (chat) => {
              const otherUserId = chat.participants.find((p) => p !== userId);
              if (!otherUserId) return { ...chat };

              try {
                const worker = await getWorkerById(otherUserId);
                if (worker) return { ...chat, otherUser: worker };

                const profile = await getUserProfile(otherUserId);
                if (profile) return { ...chat, otherUser: { name: profile.email.split("@")[0] } };
              } catch (err) {
                console.error("Profile fetch error:", err);
              }
              return { ...chat, otherUser: { name: "User" } };
            })
          );
          setChats(enrichedChats.sort((a, b) => (b.updatedAt?.toMillis() || 0) - (a.updatedAt?.toMillis() || 0)));
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      }
    );
    return () => unsubscribeChats();
  }, [userId]);

  if (!userId && !userLoading && !loading) {
    return <div className="p-20 text-center">Please log in to view messages.</div>;
  }

  return (
    <div className="flex h-[calc(100vh-74px)] bg-offwhite overflow-hidden">
      {/* Sidebar: 30% */}
      <aside className="w-[30%] min-w-[320px] border-r border-black/10 bg-white flex flex-col">
        <header className="p-6 border-b border-black/5">
          <h1 className="text-2xl font-bold">Messages</h1>
        </header>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-10 text-center text-xs text-muted animate-pulse uppercase tracking-widest">Loading chats...</div>
          ) : (
            <div className="divide-y divide-black/5">
              {chats.map((chat) => {
                const isActive = activeChatId === chat.id;
                return (
                  <Link 
                    key={chat.id} 
                    href={`/messages/${chat.id}`}
                    className={`flex items-center gap-4 p-5 transition hover:bg-[#fcfbf9] ${
                      isActive ? "bg-[#f7f3ef] border-l-4 border-crimson pl-4" : ""
                    }`}
                  >
                    <div className="h-12 w-12 rounded-full bg-[#f7f3ef] flex-shrink-0 flex items-center justify-center text-lg font-bold">
                      {chat.otherUser?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className={`font-bold truncate ${isActive ? "text-crimson" : "text-ink"}`}>
                          {chat.otherUser?.name || "User"}
                        </h3>
                        <span className="text-[10px] text-muted whitespace-nowrap">
                          {chat.updatedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate">{chat.lastMessage || "No messages yet"}</p>
                    </div>
                  </Link>
                );
              })}
              {chats.length === 0 && (
                <div className="p-10 text-center text-muted italic text-sm">No conversations yet.</div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area: 70% */}
      <main className="flex-1 flex flex-col bg-[#fcfbf9]">
        {children}
      </main>
    </div>
  );
}
