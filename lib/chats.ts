import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Chat, Message } from "@/types";

const CHATS_COLLECTION = "chats";

export async function createOrGetChat(participant1: string, participant2: string) {
  if (!db) return null;

  const q = query(
    collection(db, CHATS_COLLECTION),
    where("participants", "array-contains", participant1)
  );

  const snapshot = await getDocs(q);
  const existingChat = snapshot.docs.find((doc) => {
    const data = doc.data() as Chat;
    return data.participants.includes(participant2);
  });

  if (existingChat) {
    return existingChat.id;
  }

  const chatId = [participant1, participant2].sort().join("_");
  const chatRef = doc(db, CHATS_COLLECTION, chatId);
  
  await setDoc(chatRef, {
    id: chatId,
    participants: [participant1, participant2],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastMessage: "",
  });

  return chatId;
}

export function subscribeToMessages(chatId: string, callback: (messages: Message[]) => void) {
  if (!db) return () => {};

  const q = query(
    collection(db, CHATS_COLLECTION, chatId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Message));
    callback(messages);
  });
}

export async function sendMessage(chatId: string, senderId: string, text: string) {
  if (!db) return;

  const messagesRef = collection(db, CHATS_COLLECTION, chatId, "messages");
  await addDoc(messagesRef, {
    senderId,
    text,
    createdAt: serverTimestamp(),
  });

  const chatRef = doc(db, CHATS_COLLECTION, chatId);
  await updateDoc(chatRef, {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToUserChats(
  userId: string,
  callback: (chats: Chat[]) => void,
  onError?: (error: Error) => void
) {
  if (!db) return () => {};

  const q = query(
    collection(db, CHATS_COLLECTION),
    where("participants", "array-contains", userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const chats = snapshot.docs.map((doc) => doc.data() as Chat);
      callback(chats);
    },
    (error) => {
      console.error("Chats subscription error:", error);
      onError?.(error);
    }
  );
}
