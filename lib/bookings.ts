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
} from "firebase/firestore";
import { db } from "./firebase";
import type { Booking, BookingPayload, BookingStatus } from "@/types";

const BOOKINGS_COLLECTION = "bookings";

export async function createBooking(payload: BookingPayload) {
  if (!db) return;

  const bookingId = Math.random().toString(36).substr(2, 9);
  const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);

  const booking: Booking = {
    id: bookingId,
    ...payload,
    date: Timestamp.fromDate(payload.date),
    status: "pending",
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };

  await setDoc(bookingRef, booking);
  return bookingId;
}

export async function getCustomerBookings(customerId: string) {
  if (!db) return [];

  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where("customerId", "==", customerId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Booking);
}

export async function getWorkerBookings(workerId: string) {
  if (!db) return [];

  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where("workerId", "==", workerId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Booking);
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  if (!db) return;

  const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
  await updateDoc(bookingRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}
