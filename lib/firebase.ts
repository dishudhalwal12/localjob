import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasPlaceholderValue = Object.values(firebaseConfig).some(
  (value) => !value || value.includes("your_") || value.includes("your-"),
);

export const isFirebaseConfigured = !hasPlaceholderValue;

export const firebaseApp: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const db: Firestore | null = firebaseApp ? getFirestore(firebaseApp) : null;

let authInstance: Auth | null = null;
let authReadyPromise: Promise<Auth | null> | null = null;

export function getFirebaseAuth() {
  if (!firebaseApp || typeof window === "undefined") {
    return null;
  }

  if (!authInstance) {
    authInstance = getAuth(firebaseApp);
  }

  return authInstance;
}

export async function ensureFirebaseAuth() {
  const auth = getFirebaseAuth();

  if (!auth) {
    return null;
  }

  if (!authReadyPromise) {
    authReadyPromise = setPersistence(auth, browserLocalPersistence)
      .catch(() => undefined)
      .then(() => auth);
  }

  return authReadyPromise;
}
