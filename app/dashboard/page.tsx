"use client";

import Link from "next/link";
import { startTransition, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { WorkerForm } from "@/components/WorkerForm";
import { signOutUser } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteWorker,
  getWorkerByUserId,
  updateWorker,
  updateWorkerAvailability,
} from "@/lib/workers";
import type { Worker, WorkerPayload } from "@/types";

function StatCard({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | number;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-localjob">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">{label}</p>
      {value !== undefined ? (
        <p className="mt-4 text-4xl font-bold text-ink">{value}</p>
      ) : (
        <div className="mt-4">{children}</div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    let active = true;

    if (authLoading) {
      return;
    }

    if (!user) {
      setWorker(null);
      setLoading(false);
      startTransition(() => router.replace("/list-yourself"));
      return;
    }

    const loadWorker = async () => {
      setLoading(true);

      try {
        const listing = await getWorkerByUserId(user.uid);

        if (!active) {
          return;
        }

        if (!listing) {
          toast.error("Create your listing first.");
          startTransition(() => router.replace("/list-yourself"));
          return;
        }

        setWorker(listing);
      } catch (error) {
        if (!active) {
          return;
        }

        toast.error(error instanceof Error ? error.message : "Unable to load your dashboard.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadWorker();

    return () => {
      active = false;
    };
  }, [authLoading, router, user]);

  const handleUpdate = async (values: WorkerPayload) => {
    if (!worker) {
      return;
    }

    setSaving(true);

    try {
      await updateWorker(worker.id, values);
      setWorker((current) => (current ? { ...current, ...values } : current));
      setEditing(false);
      toast.success("Listing updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update your listing.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvailabilityToggle = async () => {
    if (!worker) {
      return;
    }

    const nextValue = !worker.available;

    setWorker((current) => (current ? { ...current, available: nextValue } : current));

    try {
      await updateWorkerAvailability(worker.id, nextValue);
      toast.success(nextValue ? "Marked as available." : "Marked as busy.");
    } catch (error) {
      setWorker((current) => (current ? { ...current, available: !nextValue } : current));
      toast.error(error instanceof Error ? error.message : "Unable to change status.");
    }
  };

  const handleDelete = async () => {
    if (!worker) {
      return;
    }

    setSaving(true);

    try {
      await deleteWorker(worker.id);
      toast.success("Listing deleted.");
      startTransition(() => router.replace("/list-yourself"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete your listing.");
    } finally {
      setSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!authLoading && !user) {
    return null;
  }

  if (authLoading || loading) {
    return (
      <div className="bg-offwhite py-16">
        <div className="page-shell space-y-6">
          <div className="animate-pulse rounded-[24px] bg-white p-8 shadow-localjob">
            <div className="h-14 w-72 rounded-xl bg-[#f0ece7]" />
            <div className="mt-4 h-6 w-40 rounded-full bg-[#f0ece7]" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-[24px] bg-white p-6 shadow-localjob">
                <div className="h-4 w-24 rounded-full bg-[#f0ece7]" />
                <div className="mt-5 h-10 w-20 rounded-full bg-[#f0ece7]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!worker) {
    return null;
  }

  return (
    <div className="bg-offwhite py-12 pb-16 sm:py-14 sm:pb-20">
      <div className="page-shell">
        <header className="rounded-[28px] bg-white p-7 shadow-localjob sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="eyebrow">worker dashboard</p>
              <h1 className="display-heading text-[clamp(4rem,9vw,6.2rem)] text-ink">
                Your Listing
              </h1>
              <p className="mt-2 text-lg text-muted">{user?.email ?? worker.name}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                void signOutUser()
                  .then(() => {
                    toast.success("Signed out successfully.");
                    startTransition(() => router.replace("/list-yourself"));
                  })
                  .catch((error) => {
                    toast.error(error instanceof Error ? error.message : "Unable to sign out.");
                  });
              }}
              className="pill-button-secondary h-fit"
            >
              Sign Out
            </button>
          </div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <StatCard label="Profile Views" value={worker.viewCount} />
          <StatCard label="Your Skill">
            <span className="inline-flex rounded-full bg-crimson px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {worker.skill}
            </span>
          </StatCard>
          <StatCard label="Status">
            <button
              type="button"
              onClick={handleAvailabilityToggle}
              className={`relative inline-flex h-9 w-16 rounded-full transition ${
                worker.available ? "bg-crimson" : "bg-black/15"
              }`}
            >
              <span
                className={`absolute top-1 h-7 w-7 rounded-full bg-white transition ${
                  worker.available ? "left-8" : "left-1"
                }`}
              />
            </button>
            <p className="mt-3 text-sm text-muted">
              {worker.available ? "Available now" : "Currently busy"}
            </p>
          </StatCard>
        </section>

        <section className="mt-6 rounded-[28px] bg-white p-7 shadow-localjob sm:p-8">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="display-heading text-[3rem] text-ink">{worker.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {worker.area}, {worker.city}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setEditing((current) => !current)}
                className="pill-button-secondary"
              >
                {editing ? "Close Edit" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="pill-button rounded-full border border-crimson/25 bg-[#fff5f5] px-6 py-3 text-sm font-semibold text-crimson transition hover:-translate-y-0.5 hover:bg-[#ffe7ea]"
              >
                Delete
              </button>
            </div>
          </div>

          {editing ? (
            <div className="mt-6">
              <WorkerForm
                initialValues={{
                  name: worker.name,
                  skill: worker.skill,
                  area: worker.area,
                  city: worker.city,
                  phone: worker.phone,
                  bio: worker.bio,
                  experience: worker.experience,
                  available: worker.available,
                }}
                submitLabel="Save Changes"
                onSubmit={handleUpdate}
                onCancel={() => setEditing(false)}
                submitting={saving}
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                  Skill
                </p>
                <p className="mt-3 text-base font-medium text-ink">{worker.skill}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                  Experience
                </p>
                <p className="mt-3 text-base font-medium text-ink">{worker.experience}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                  Contact
                </p>
                <p className="mt-3 text-base font-medium text-ink">{worker.phone}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                  Status
                </p>
                <p className="mt-3 text-base font-medium text-ink">
                  {worker.available ? "Available for work" : "Currently busy"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                  Bio
                </p>
                <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                  {worker.bio || "No bio added yet."}
                </p>
              </div>

              <div className="sm:col-span-2">
                <Link href={`/find/${worker.id}`} className="text-sm font-medium text-crimson">
                  Preview public profile →
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>

      {showDeleteConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-5">
          <div className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-localjob">
            <h2 className="text-2xl font-bold text-ink">Are you sure?</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              This cannot be undone. Your worker listing will be removed from LocalJob.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="pill-button-primary w-full justify-center"
              >
                {saving ? "Deleting..." : "Delete Listing"}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="pill-button-secondary w-full justify-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
