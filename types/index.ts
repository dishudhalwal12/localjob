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

export type UserRole = "admin" | "customer" | "worker";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Timestamp | null;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
}

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
  // New Fields
  packages?: Package[];
  location?: { lat: number; lng: number };
  rating?: number;
  reviewCount?: number;
  approvalStatus?: "pending" | "approved" | "rejected";
  isVerified?: boolean;
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
  packages?: Package[];
  location?: { lat: number; lng: number };
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  workerId: string;
  customerId: string;
  packageId?: string;
  date: Timestamp | null;
  timeSlot: string;
  status: BookingStatus;
  price: number;
  address: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface BookingPayload {
  workerId: string;
  customerId: string;
  packageId?: string;
  date: Date;
  timeSlot: string;
  price: number;
  address: string;
}

export interface Review {
  id: string;
  workerId: string;
  customerId: string;
  bookingId?: string;
  rating: number;
  comment: string;
  customerName?: string;
  createdAt: Timestamp | null;
}

export interface ReviewPayload {
  workerId: string;
  customerId: string;
  bookingId?: string;
  rating: number;
  comment: string;
  customerName?: string;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: Timestamp | null;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: Timestamp | null;
  read: boolean;
}
