"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthPanel } from "@/components/AuthPanel";
import { WorkerForm } from "@/components/WorkerForm";
import { signOutDemo } from "@/lib/demo-auth";
import { useDemoAuth } from "@/hooks/useDemoAuth";
import { addWorker, getWorkerByUserId } from "@/lib/workers";
import type { Worker, WorkerPayload } from "@/types";

export default function ListYourselfPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useDemoAuth();
  const [existingWorker, setExistingWorker] = useState<Worker | null>(null);
  const [checkingListing, setCheckingListing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    if (!user) {
      setExistingWorker(null);
      setCheckingListing(false);
      return;
    }

    const loadListing = async () => {
      setCheckingListing(true);

      try {
        const listing = await getWorkerByUserId(user.uid);

        if (!active) {
          return;
        }

        setExistingWorker(listing);
      } catch (error) {
        if (!active) {
          return;
        }

        toast.error(error instanceof Error ? error.message : "Unable to check your listing.");
      } finally {
        if (active) {
          setCheckingListing(false);
        }
      }
    };

    void loadListing();

    return () => {
      active = false;
    };
  }, [user]);

  const handleCreate = async (values: WorkerPayload) => {
    if (!user) {
      toast.error("Please log in before creating a listing.");
      return;
    }

    setSubmitting(true);

    try {
      await addWorker(values, user.uid);
      toast.success("Your listing is live.");
      startTransition(() => router.push("/dashboard"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save your listing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-offwhite pb-16 sm:pb-20">
      <section className="bg-crimson py-14 text-white sm:py-16">
        <div className="page-shell">
          <h1 className="display-heading text-[clamp(4rem,10vw,6.6rem)] text-white">
            List Yourself
          </h1>
        </div>
      </section>

      <section className="-mt-6">
        <div className="page-shell">
          <div className="mx-auto max-w-[580px] rounded-[24px] bg-white p-7 shadow-localjob sm:p-10">
            <div className="mb-6 rounded-[18px] border border-crimson/15 bg-[#fff5f5] px-4 py-4 text-sm leading-6 text-ink">
              Demo mode is active. Worker data and sign-ins are saved locally in this browser for
              presentation purposes.
            </div>

            {authLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 w-48 rounded-full bg-[#f0ece7]" />
                <div className="h-12 rounded-2xl bg-[#f0ece7]" />
                <div className="h-12 rounded-2xl bg-[#f0ece7]" />
                <div className="h-12 rounded-full bg-[#f0ece7]" />
              </div>
            ) : !user ? (
              <AuthPanel />
            ) : checkingListing ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 w-44 rounded-full bg-[#f0ece7]" />
                <div className="h-12 rounded-2xl bg-[#f0ece7]" />
                <div className="h-12 rounded-2xl bg-[#f0ece7]" />
                <div className="h-40 rounded-3xl bg-[#f0ece7]" />
              </div>
            ) : existingWorker ? (
              <div className="rounded-[24px] border border-black/10 bg-[#f9f7f3] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="eyebrow">already listed</p>
                    <h2 className="display-heading mt-2 text-[3rem] text-ink">
                      You&apos;re already live.
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      void signOutDemo();
                      toast.success("Signed out of demo mode.");
                    }}
                    className="pill-button-secondary h-fit"
                  >
                    Sign Out
                  </button>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">
                  Your worker profile is active for {existingWorker.area}, {existingWorker.city}.
                  Manage updates and status from your dashboard.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/dashboard" className="pill-button-primary">
                    Go to Dashboard
                  </Link>
                  <Link href={`/find/${existingWorker.id}`} className="pill-button-secondary">
                    Preview Listing
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <p className="text-sm leading-6 text-muted">
                    Add your name, skill, area, and number so nearby people can call you directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      void signOutDemo();
                      toast.success("Signed out of demo mode.");
                    }}
                    className="pill-button-secondary h-fit shrink-0"
                  >
                    Sign Out
                  </button>
                </div>
                <WorkerForm submitLabel="List Me →" onSubmit={handleCreate} submitting={submitting} />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
