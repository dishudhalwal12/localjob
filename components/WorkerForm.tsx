"use client";

import { useEffect, useState, type FormEvent } from "react";
import { workerSkills, type WorkerPayload, type WorkerSkill } from "@/types";

export interface WorkerFormErrors {
  name?: string;
  skill?: string;
  area?: string;
  city?: string;
  phone?: string;
  bio?: string;
  experience?: string;
}

export const emptyWorkerForm: WorkerPayload = {
  name: "",
  skill: "Electrician",
  area: "",
  city: "",
  phone: "",
  bio: "",
  experience: "",
  available: true,
};

function validate(values: WorkerPayload): WorkerFormErrors {
  const errors: WorkerFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.skill) {
    errors.skill = "Please choose a skill.";
  }

  if (!values.area.trim()) {
    errors.area = "Please enter your area or locality.";
  }

  if (!values.city.trim()) {
    errors.city = "Please enter your city.";
  }

  if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }

  if (values.bio.length > 180) {
    errors.bio = "Bio must stay within 180 characters.";
  }

  if (!values.experience.trim()) {
    errors.experience = "Please add your experience.";
  }

  return errors;
}

interface WorkerFormProps {
  initialValues?: WorkerPayload;
  submitLabel: string;
  onSubmit: (values: WorkerPayload) => Promise<void> | void;
  onCancel?: () => void;
  cancelLabel?: string;
  submitting?: boolean;
}

export function WorkerForm({
  initialValues = emptyWorkerForm,
  submitLabel,
  onSubmit,
  onCancel,
  cancelLabel = "Cancel",
  submitting = false,
}: WorkerFormProps) {
  const [values, setValues] = useState<WorkerPayload>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);

  useEffect(() => {
    setValues(initialValues);
    setTouched({});
    setShowAllErrors(false);
  }, [initialValues]);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const shouldShowError = (field: keyof WorkerFormErrors) => showAllErrors || touched[field];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAllErrors(true);

    if (!isValid) {
      return;
    }

    await onSubmit({
      ...values,
      name: values.name.trim(),
      area: values.area.trim(),
      city: values.city.trim(),
      phone: values.phone.trim(),
      bio: values.bio.trim(),
      experience: values.experience.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
          Full Name
        </label>
        <input
          type="text"
          value={values.name}
          onBlur={() => setTouched((current) => ({ ...current, name: true }))}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
          placeholder="What do people call you?"
          className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
        />
        {shouldShowError("name") && errors.name ? (
          <p className="mt-2 text-sm text-crimson">{errors.name}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
          Skill
        </label>
        <select
          value={values.skill}
          onBlur={() => setTouched((current) => ({ ...current, skill: true }))}
          onChange={(event) =>
            setValues((current) => ({ ...current, skill: event.target.value as WorkerSkill }))
          }
          className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
        >
          {workerSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        {shouldShowError("skill") && errors.skill ? (
          <p className="mt-2 text-sm text-crimson">{errors.skill}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
          Area
        </label>
        <input
          type="text"
          value={values.area}
          onBlur={() => setTouched((current) => ({ ...current, area: true }))}
          onChange={(event) => setValues((current) => ({ ...current, area: event.target.value }))}
          placeholder="Your colony or locality (e.g. Rohini Sector 11)"
          className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
        />
        {shouldShowError("area") && errors.area ? (
          <p className="mt-2 text-sm text-crimson">{errors.area}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
          City
        </label>
        <input
          type="text"
          value={values.city}
          onBlur={() => setTouched((current) => ({ ...current, city: true }))}
          onChange={(event) => setValues((current) => ({ ...current, city: event.target.value }))}
          placeholder="Your city"
          className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
        />
        {shouldShowError("city") && errors.city ? (
          <p className="mt-2 text-sm text-crimson">{errors.city}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
          Phone
        </label>
        <input
          type="tel"
          inputMode="numeric"
          value={values.phone}
          onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              phone: event.target.value.replace(/\D/g, "").slice(0, 10),
            }))
          }
          placeholder="Your 10-digit mobile number"
          className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
        />
        {shouldShowError("phone") && errors.phone ? (
          <p className="mt-2 text-sm text-crimson">{errors.phone}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
          Bio
        </label>
        <textarea
          rows={4}
          maxLength={180}
          value={values.bio}
          onBlur={() => setTouched((current) => ({ ...current, bio: true }))}
          onChange={(event) => setValues((current) => ({ ...current, bio: event.target.value }))}
          placeholder="Tell people what you do"
          className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
        />
        <div className="mt-2 flex items-center justify-between gap-4">
          {shouldShowError("bio") && errors.bio ? (
            <p className="text-sm text-crimson">{errors.bio}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-black/45">{values.bio.length}/180</p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
          Experience
        </label>
        <input
          type="text"
          value={values.experience}
          onBlur={() => setTouched((current) => ({ ...current, experience: true }))}
          onChange={(event) =>
            setValues((current) => ({ ...current, experience: event.target.value }))
          }
          placeholder="How many years? (e.g. 6 years)"
          className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
        />
        {shouldShowError("experience") && errors.experience ? (
          <p className="mt-2 text-sm text-crimson">{errors.experience}</p>
        ) : null}
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-[#f8f6f2] px-4 py-4">
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
            Available Now
          </p>
          <p className="mt-1 text-sm text-muted">Show people if you are ready to take work.</p>
        </div>
        <button
          type="button"
          onClick={() => setValues((current) => ({ ...current, available: !current.available }))}
          className={`relative inline-flex h-8 w-14 rounded-full transition ${
            values.available ? "bg-crimson" : "bg-black/15"
          }`}
          aria-pressed={values.available}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
              values.available ? "left-7" : "left-1"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col gap-3 pt-3 sm:flex-row">
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="pill-button-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-55"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>

        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="pill-button-secondary w-full justify-center"
          >
            {cancelLabel}
          </button>
        ) : null}
      </div>
    </form>
  );
}
