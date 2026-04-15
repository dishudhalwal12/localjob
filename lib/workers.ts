import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
  type DocumentSnapshot,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { Worker, WorkerPayload, WorkerSkillFilter } from "@/types";

interface WorkerRecord extends WorkerPayload {
  id: string;
  userId: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  viewCount: number;
}

const WORKERS_COLLECTION = "workers";

type FirestoreAction =
  | "browse_workers"
  | "read_worker"
  | "read_own_listing"
  | "create_worker"
  | "update_worker"
  | "update_availability"
  | "delete_worker"
  | "increment_view_count";

function getFirestoreUnavailableMessage() {
  return isFirebaseConfigured
    ? "Firestore is unavailable right now."
    : "Firebase is not configured for this project.";
}

function requireDb() {
  if (!db) {
    throw new Error(getFirestoreUnavailableMessage());
  }

  return db;
}

function workersCollection() {
  return collection(requireDb(), WORKERS_COLLECTION);
}

function toWorker(
  snapshot: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>,
) {
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data({ serverTimestamps: "estimate" }) as Partial<WorkerRecord>;

  return {
    id: snapshot.id,
    userId: typeof data.userId === "string" ? data.userId : snapshot.id,
    name: typeof data.name === "string" ? data.name : "",
    skill: data.skill ?? "Electrician",
    area: typeof data.area === "string" ? data.area : "",
    city: typeof data.city === "string" ? data.city : "",
    phone: typeof data.phone === "string" ? data.phone : "",
    bio: typeof data.bio === "string" ? data.bio : "",
    experience: typeof data.experience === "string" ? data.experience : "",
    available: data.available ?? true,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt : null,
    viewCount: typeof data.viewCount === "number" ? data.viewCount : 0,
  } satisfies Worker;
}

function sortWorkers(workers: Worker[]) {
  return [...workers].sort(
    (left, right) => (right.createdAt?.toMillis() ?? 0) - (left.createdAt?.toMillis() ?? 0),
  );
}

function buildWorkersQuery(skill: WorkerSkillFilter = "All", limitCount?: number) {
  const constraints: QueryConstraint[] = [];

  if (skill === "All") {
    constraints.push(orderBy("createdAt", "desc"));
  } else {
    constraints.push(where("skill", "==", skill));
  }

  if (limitCount) {
    constraints.push(limit(limitCount));
  }

  return query(workersCollection(), ...constraints);
}

function getPermissionDeniedMessage(action: FirestoreAction) {
  switch (action) {
    case "browse_workers":
    case "read_worker":
      return "Firestore blocked public reads. Deploy the rules from firestore.rules to your Firebase project and try again.";
    case "read_own_listing":
      return "Firestore blocked the listing check. Deploy the rules from firestore.rules to your Firebase project, then reload this page.";
    case "create_worker":
      return "Firestore blocked the listing write. Open Firestore Rules in Firebase Console and publish this repo's firestore.rules, or run firebase deploy --only firestore:rules.";
    case "update_worker":
    case "update_availability":
    case "delete_worker":
      return "Firestore blocked this account from changing the listing. Make sure your published Firestore Rules match firestore.rules in this repo.";
    case "increment_view_count":
      return "Firestore blocked the profile view update. Publish this repo's firestore.rules to your Firebase project and try again.";
    default:
      return "Firestore denied this request.";
  }
}

function getFirestoreErrorMessage(
  error: unknown,
  fallback: string,
  action: FirestoreAction,
) {
  if (typeof error === "object" && error && "code" in error) {
    const code = String(error.code);

    if (code === "permission-denied") {
      return getPermissionDeniedMessage(action);
    }

    if (code === "unavailable") {
      return "Firestore is temporarily unavailable. Please try again.";
    }
  }

  return error instanceof Error ? error.message : fallback;
}

export async function getWorkers(limitCount?: number, skill: WorkerSkillFilter = "All") {
  try {
    const snapshot = await getDocs(buildWorkersQuery(skill, limitCount));
    return sortWorkers(snapshot.docs.map((workerDoc) => toWorker(workerDoc)).filter(Boolean) as Worker[]);
  } catch (error) {
    throw new Error(getFirestoreErrorMessage(error, "Unable to load workers.", "browse_workers"));
  }
}

export async function getWorkerById(id: string) {
  try {
    const snapshot = await getDoc(doc(requireDb(), WORKERS_COLLECTION, id));
    return toWorker(snapshot);
  } catch (error) {
    throw new Error(getFirestoreErrorMessage(error, "Unable to load this worker.", "read_worker"));
  }
}

export async function getWorkerByUserId(userId: string) {
  try {
    const snapshot = await getDoc(doc(requireDb(), WORKERS_COLLECTION, userId));
    return toWorker(snapshot);
  } catch (error) {
    throw new Error(
      getFirestoreErrorMessage(error, "Unable to check your listing.", "read_own_listing"),
    );
  }
}

export async function addWorker(worker: WorkerPayload, userId: string) {
  try {
    await setDoc(doc(requireDb(), WORKERS_COLLECTION, userId), {
      ...worker,
      id: userId,
      userId,
      viewCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return userId;
  } catch (error) {
    throw new Error(getFirestoreErrorMessage(error, "Unable to create your listing.", "create_worker"));
  }
}

export async function updateWorker(id: string, worker: WorkerPayload) {
  try {
    await updateDoc(doc(requireDb(), WORKERS_COLLECTION, id), {
      ...worker,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(getFirestoreErrorMessage(error, "Unable to update your listing.", "update_worker"));
  }
}

export async function updateWorkerAvailability(id: string, available: boolean) {
  try {
    await updateDoc(doc(requireDb(), WORKERS_COLLECTION, id), {
      available,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(
      getFirestoreErrorMessage(error, "Unable to update your status.", "update_availability"),
    );
  }
}

export async function deleteWorker(id: string) {
  try {
    await deleteDoc(doc(requireDb(), WORKERS_COLLECTION, id));
  } catch (error) {
    throw new Error(getFirestoreErrorMessage(error, "Unable to delete your listing.", "delete_worker"));
  }
}

export async function incrementViewCount(id: string) {
  try {
    await updateDoc(doc(requireDb(), WORKERS_COLLECTION, id), {
      viewCount: increment(1),
    });
  } catch (error) {
    throw new Error(
      getFirestoreErrorMessage(
        error,
        "Unable to update the profile view count.",
        "increment_view_count",
      ),
    );
  }
}
