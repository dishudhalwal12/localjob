"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signInDemo, signUpDemo } from "@/lib/demo-auth";

interface AuthPanelProps {
  onSuccess?: () => void;
}

type AuthTab = "login" | "register";

export function AuthPanel({ onSuccess }: AuthPanelProps) {
  const [tab, setTab] = useState<AuthTab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || password.length < 6) {
      toast.error("Use a valid email and a password with at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      if (tab === "login") {
        await signInDemo(email.trim(), password);
        toast.success("Signed in to demo mode.");
      } else {
        await signUpDemo(email.trim(), password);
        toast.success("Demo account created.");
      }

      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[24px] border border-black/10 bg-white p-6 shadow-localjob">
      <div className="flex gap-2 rounded-full bg-[#f7f3ef] p-1">
        {(["login", "register"] as AuthTab[]).map((authTab) => {
          const active = tab === authTab;

          return (
            <button
              key={authTab}
              type="button"
              onClick={() => setTab(authTab)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                active ? "bg-crimson text-white" : "text-ink"
              }`}
            >
              {authTab}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-bold text-ink">
          {tab === "login" ? "Log in to list yourself" : "Create your worker account"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Only workers need an account. Visitors can browse freely without signing in.
        </p>
        <p className="mt-2 text-sm leading-6 text-crimson">
          Demo mode: accounts are stored only in this browser.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            placeholder="worker@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            placeholder="At least 6 characters"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="pill-button-primary mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting
          ? "Please wait..."
          : tab === "login"
            ? "Log In"
            : "Create Account"}
      </button>
    </div>
  );
}
