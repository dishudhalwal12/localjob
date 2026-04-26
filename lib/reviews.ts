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
  increment,
  runTransaction,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Review, ReviewPayload } from "@/types";

const REVIEWS_COLLECTION = "reviews";
const WORKERS_COLLECTION = "workers";

export async function addReview(payload: ReviewPayload) {
  if (!db) return;

  const reviewId = Math.random().toString(36).substr(2, 9);
  const reviewRef = doc(db, REVIEWS_COLLECTION, reviewId);
  const workerRef = doc(db, WORKERS_COLLECTION, payload.workerId);

  await runTransaction(db, async (transaction) => {
    const workerDoc = await transaction.get(workerRef);
    if (!workerDoc.exists()) throw new Error("Worker not found");

    const workerData = workerDoc.data();
    const currentRating = workerData.rating || 0;
    const currentCount = workerData.reviewCount || 0;

    const newCount = currentCount + 1;
    const newRating = (currentRating * currentCount + payload.rating) / newCount;

    transaction.set(reviewRef, {
      id: reviewId,
      ...payload,
      createdAt: serverTimestamp(),
    });

    transaction.update(workerRef, {
      rating: newRating,
      reviewCount: newCount,
      updatedAt: serverTimestamp(),
    });
  });

  return reviewId;
}

export async function getWorkerReviews(workerId: string) {
  if (!db) return [];

  const q = query(
    collection(db, REVIEWS_COLLECTION),
    where("workerId", "==", workerId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Review);
}
