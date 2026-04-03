import { Timestamp } from "firebase/firestore";
import type { Worker, WorkerPayload } from "@/types";

interface StoredWorker extends Omit<Worker, "createdAt"> {
  createdAtMs: number;
}

const WORKERS_STORAGE_KEY = "localjob-demo-workers";
const WORKERS_EVENT = "localjob-demo-workers-change";

const seededWorkers: StoredWorker[] = [
  {
    id: "worker-aman-electrician",
    name: "Aman Verma",
    skill: "Electrician",
    area: "Rohini Sector 7",
    city: "Delhi",
    phone: "9876543210",
    bio: "House wiring, switch board repair, inverter setup, and urgent same-day electrical fixes.",
    experience: "8 years",
    available: true,
    userId: "seed-user-1",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 2,
    viewCount: 143,
  },
  {
    id: "worker-salim-plumber",
    name: "Salim Khan",
    skill: "Plumber",
    area: "Laxmi Nagar",
    city: "Delhi",
    phone: "9811122233",
    bio: "Pipe leak repair, bathroom fittings, motor line checks, and kitchen plumbing work.",
    experience: "10 years",
    available: true,
    userId: "seed-user-2",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 5,
    viewCount: 97,
  },
  {
    id: "worker-rakesh-painter",
    name: "Rakesh Painter",
    skill: "Painter",
    area: "Indirapuram",
    city: "Ghaziabad",
    phone: "9899001122",
    bio: "Room repainting, wall putty, texture work, and quick fresh-coat jobs for flats and shops.",
    experience: "6 years",
    available: false,
    userId: "seed-user-3",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 8,
    viewCount: 82,
  },
  {
    id: "worker-dev-carpenter",
    name: "Dev Kumar",
    skill: "Carpenter",
    area: "Noida Sector 62",
    city: "Noida",
    phone: "9922334455",
    bio: "Custom shelves, door repair, bed fitting, and modular furniture touch-up work.",
    experience: "9 years",
    available: true,
    userId: "seed-user-4",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 12,
    viewCount: 121,
  },
  {
    id: "worker-jagdeep-mechanic",
    name: "Jagdeep Singh",
    skill: "Mechanic",
    area: "Pitampura",
    city: "Delhi",
    phone: "9988776655",
    bio: "Two-wheeler servicing, battery checks, puncture support, and roadside minor repairs.",
    experience: "7 years",
    available: true,
    userId: "seed-user-5",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 18,
    viewCount: 68,
  },
  {
    id: "worker-rehana-tailor",
    name: "Rehana Bano",
    skill: "Tailor",
    area: "Jamia Nagar",
    city: "Delhi",
    phone: "9797979797",
    bio: "Women’s suits, blouse fitting, simple alterations, and urgent stitching for local customers.",
    experience: "11 years",
    available: true,
    userId: "seed-user-6",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 22,
    viewCount: 109,
  },
  {
    id: "worker-harsh-ac",
    name: "Harsh AC Care",
    skill: "AC Technician",
    area: "Dwarka Sector 10",
    city: "Delhi",
    phone: "9911007788",
    bio: "AC servicing, cooling issues, gas refill checks, and split AC installation support.",
    experience: "5 years",
    available: false,
    userId: "seed-user-7",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 30,
    viewCount: 76,
  },
  {
    id: "worker-meena-electrician",
    name: "Meena Electric Works",
    skill: "Electrician",
    area: "Rohini Sector 11",
    city: "Delhi",
    phone: "9870011223",
    bio: "Ceiling fan repair, lighting upgrades, and apartment electrical troubleshooting.",
    experience: "4 years",
    available: true,
    userId: "seed-user-8",
    createdAtMs: Date.now() - 1000 * 60 * 60 * 40,
    viewCount: 58,
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function toWorker(worker: StoredWorker): Worker {
  return {
    ...worker,
    createdAt: Timestamp.fromMillis(worker.createdAtMs),
  };
}

function readStoredWorkers() {
  if (!isBrowser()) {
    return [...seededWorkers];
  }

  const rawWorkers = window.localStorage.getItem(WORKERS_STORAGE_KEY);

  if (!rawWorkers) {
    window.localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(seededWorkers));
    return [...seededWorkers];
  }

  try {
    const parsedWorkers = JSON.parse(rawWorkers) as StoredWorker[];

    if (!Array.isArray(parsedWorkers)) {
      window.localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(seededWorkers));
      return [...seededWorkers];
    }

    return parsedWorkers;
  } catch {
    window.localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(seededWorkers));
    return [...seededWorkers];
  }
}

function sortWorkers(workers: StoredWorker[]) {
  return [...workers].sort((left, right) => right.createdAtMs - left.createdAtMs);
}

function emitWorkersChange() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(WORKERS_EVENT));
}

function writeStoredWorkers(workers: StoredWorker[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(sortWorkers(workers)));
  emitWorkersChange();
}

function readWorkers(limitCount?: number) {
  const workers = sortWorkers(readStoredWorkers());

  return (limitCount ? workers.slice(0, limitCount) : workers).map(toWorker);
}

function createWorkerId() {
  return `worker-${Math.random().toString(36).slice(2, 10)}`;
}

export async function getWorkers(limitCount?: number) {
  return readWorkers(limitCount);
}

export function subscribeToWorkers(
  onData: (workers: Worker[]) => void,
  onError: (error: Error) => void,
  limitCount?: number,
) {
  try {
    const handleUpdate = () => {
      onData(readWorkers(limitCount));
    };

    handleUpdate();

    if (!isBrowser()) {
      return () => undefined;
    }

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === WORKERS_STORAGE_KEY) {
        handleUpdate();
      }
    };

    window.addEventListener(WORKERS_EVENT, handleUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(WORKERS_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  } catch (error) {
    onError(error instanceof Error ? error : new Error("Unable to subscribe to workers."));
    return () => undefined;
  }
}

export async function getWorkerById(id: string) {
  const worker = readStoredWorkers().find((entry) => entry.id === id);
  return worker ? toWorker(worker) : null;
}

export async function getWorkerByUserId(userId: string) {
  const worker = readStoredWorkers().find((entry) => entry.userId === userId);
  return worker ? toWorker(worker) : null;
}

export async function addWorker(worker: WorkerPayload, userId: string) {
  const nextWorker: StoredWorker = {
    ...worker,
    id: createWorkerId(),
    userId,
    createdAtMs: Date.now(),
    viewCount: 0,
  };

  writeStoredWorkers([nextWorker, ...readStoredWorkers()]);
  return nextWorker.id;
}

export async function updateWorker(id: string, worker: WorkerPayload) {
  const workers = readStoredWorkers().map((entry) =>
    entry.id === id
      ? {
          ...entry,
          ...worker,
        }
      : entry,
  );

  writeStoredWorkers(workers);
}

export async function updateWorkerAvailability(id: string, available: boolean) {
  const workers = readStoredWorkers().map((entry) =>
    entry.id === id
      ? {
          ...entry,
          available,
        }
      : entry,
  );

  writeStoredWorkers(workers);
}

export async function deleteWorker(id: string) {
  writeStoredWorkers(readStoredWorkers().filter((entry) => entry.id !== id));
}

export async function incrementViewCount(id: string) {
  const workers = readStoredWorkers().map((entry) =>
    entry.id === id
      ? {
          ...entry,
          viewCount: entry.viewCount + 1,
        }
      : entry,
  );

  writeStoredWorkers(workers);
}
