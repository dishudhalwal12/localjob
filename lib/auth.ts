import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { ensureFirebaseAuth, getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { createUserProfile, ensureUserProfile } from "./users";
import type { UserRole } from "@/types";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getAuthUnavailableMessage() {
  return isFirebaseConfigured
    ? "Firebase Auth is only available in the browser."
    : "Firebase is not configured for this project.";
}

async function requireFirebaseAuth() {
  const auth = await ensureFirebaseAuth();

  if (!auth) {
    throw new Error(getAuthUnavailableMessage());
  }

  return auth;
}

function getFriendlyAuthError(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Log in instead.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/weak-password":
      return "Use a password with at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts right now. Please try again in a moment.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection and try again.";
    default:
      return error instanceof Error ? error.message : "Authentication failed.";
  }
}

export async function registerWorker(email: string, password: string, role: UserRole = "customer") {
  try {
    const auth = await requireFirebaseAuth();
    const credential = await createUserWithEmailAndPassword(
      auth,
      normalizeEmail(email),
      password,
    );

    // Create user profile in Firestore
    await createUserProfile(credential.user.uid, credential.user.email!, role);

    return credential.user;
  } catch (error) {
    throw new Error(getFriendlyAuthError(error));
  }
}

export async function signInWorker(email: string, password: string) {
  try {
    const auth = await requireFirebaseAuth();
    const credential = await signInWithEmailAndPassword(auth, normalizeEmail(email), password);

    // Ensure user profile exists (in case it wasn't created during registration or for existing users)
    await ensureUserProfile(credential.user.uid, credential.user.email!);

    return credential.user;
  } catch (error) {
    throw new Error(getFriendlyAuthError(error));
  }
}

export async function signOutUser() {
  try {
    const auth = await requireFirebaseAuth();
    await signOut(auth);
  } catch (error) {
    throw new Error(getFriendlyAuthError(error));
  }
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();

  if (!auth) {
    callback(null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, callback);
}
