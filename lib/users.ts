import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { User, UserRole } from "@/types";

export async function createUserProfile(userId: string, email: string, role: UserRole = "customer") {
  if (!db) return;

  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    id: userId,
    email,
    role,
    createdAt: serverTimestamp(),
  });
}

export async function updateUserRole(userId: string, role: UserRole) {
  if (!db) return;

  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { role }, { merge: true });
}

export async function getUserProfile(userId: string): Promise<User | null> {
  if (!db) return null;

  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as User;
}

export async function ensureUserProfile(userId: string, email: string) {
  const profile = await getUserProfile(userId);
  if (!profile) {
    await createUserProfile(userId, email);
  }
}
