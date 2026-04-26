"use client";

import { useEffect, useState } from "react";
import { subscribeToUserChats } from "@/lib/chats";
import { subscribeToAuth } from "@/lib/auth";
import { getWorkerById } from "@/lib/workers";
import { getUserProfile } from "@/lib/users";
import type { Chat, Worker, User } from "@/types";
import Link from "next/link";

export default function InboxPage() {
  const [chats, setChats] = useState<(Chat & { otherUser?: { name: string } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = subscribeToAuth((user: any) => {
      if (user) {
        setUserId(user.uid);
        try {
          const unsubscribeChats = subscribeToUserChats(
            user.uid,
            async (userChats) => {
              try {
                const enrichedChats = await Promise.all(
                  userChats.map(async (chat) => {
                    const otherUserId = chat.participants.find((p) => p !== user.uid);
                    if (!otherUserId) return { ...chat };

                    // Try to find as worker first
                    const worker = await getWorkerById(otherUserId);
                    if (worker) return { ...chat, otherUser: worker };

                    // If not a worker, try to find as a regular user (customer)
                    const profile = await getUserProfile(otherUserId);
                    if (profile) return { ...chat, otherUser: { name: profile.email.split("@")[0] } };

                    return { ...chat, otherUser: { name: "User" } };
                  })
                );
                setChats(enrichedChats.sort((a, b) => (b.updatedAt?.toMillis() || 0) - (a.updatedAt?.toMillis() || 0)));
                setLoading(false);
                setError(null);
              } catch (e) {
                console.error("Enrichment error:", e);
                setLoading(false);
              }
            },
            (err) => {
              setError(err.message);
              setLoading(false);
            }
          );
          return () => unsubscribeChats();
        } catch (err) {
          console.error("Chats subscription error:", err);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (loading) return <div className="p-10 text-center text-muted">Loading messages...</div>;
  if (!userId) return <div className="p-10 text-center">Please log in to view messages.</div>;

  if (error) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-2xl border border-crimson/20 bg-[#fff5f5] p-6">
          <h2 className="text-xl font-bold text-ink">Unable to load messages</h2>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      
      <div className="space-y-2">
        {chats.map((chat) => (
          <Link 
            key={chat.id} 
            href={`/messages/${chat.id}`}
            className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 bg-white hover:bg-[#fcfbf9] transition shadow-sm"
          >
            <div className="h-12 w-12 rounded-full bg-[#f7f3ef] flex items-center justify-center text-xl font-bold">
              {chat.otherUser?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <h3 className="font-bold truncate">{chat.otherUser?.name || "User"}</h3>
              <p className="text-sm text-muted truncate">{chat.lastMessage || "Start a conversation"}</p>
            </div>
            <div className="text-[10px] text-muted">
              {chat.updatedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </Link>
        ))}
        {chats.length === 0 && (
          <div className="py-20 text-center text-muted italic">No messages yet.</div>
        )}
      </div>
    </div>
  );
}
