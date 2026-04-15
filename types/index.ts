import type { Timestamp } from "firebase/firestore";

export const workerSkills = [
  "Electrician",
  "Plumber",
  "Painter",
  "Carpenter",
  "Mechanic",
  "Tailor",
  "AC Technician",
] as const;

export type WorkerSkill = (typeof workerSkills)[number];
export type WorkerSkillFilter = "All" | WorkerSkill;

export interface Worker {
  id: string;
  name: string;
  skill: WorkerSkill;
  area: string;
  city: string;
  phone: string;
  bio: string;
  experience: string;
  available: boolean;
  userId: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  viewCount: number;
}

export interface WorkerPayload {
  name: string;
  skill: WorkerSkill;
  area: string;
  city: string;
  phone: string;
  bio: string;
  experience: string;
  available: boolean;
}
