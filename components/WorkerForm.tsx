import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { LocationIcon } from "@/components/Icons";
import { workerSkills, type WorkerPayload, type WorkerSkill, type Package } from "@/types";
import { getCurrentLocation, type Coordinates } from "@/lib/geo";

export interface WorkerFormErrors {
  name?: string;
  skill?: string;
  area?: string;
  city?: string;
  phone?: string;
  bio?: string;
  experience?: string;
  packages?: string;
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
  packages: [],
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
    setValues({
      ...initialValues,
      packages: initialValues.packages || [],
    });
    setTouched({});
    setShowAllErrors(false);
  }, [initialValues]);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const shouldShowError = (field: keyof WorkerFormErrors) => showAllErrors || touched[field];

  const addPackage = () => {
    const newPackage: Package = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      price: 0,
      description: "",
    };
    setValues((prev) => ({
      ...prev,
      packages: [...(prev.packages || []), newPackage],
    }));
  };

  const removePackage = (id: string) => {
    setValues((prev) => ({
      ...prev,
      packages: (prev.packages || []).filter((p) => p.id !== id),
    }));
  };

  const updatePackage = (id: string, field: keyof Package, value: string | number) => {
    setValues((prev) => ({
      ...prev,
      packages: (prev.packages || []).map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

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

  const handleFetchLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setValues(prev => ({ ...prev, location }));
      toast.success("Location captured!");
    } catch (error) {
      toast.error("Failed to get location. Please ensure location services are enabled.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Existing fields ... */}
      <div className="space-y-5">
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              placeholder="e.g. 6 years"
              className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
              Area
            </label>
            <input
              type="text"
              value={values.area}
              onBlur={() => setTouched((current) => ({ ...current, area: true }))}
              onChange={(event) => setValues((current) => ({ ...current, area: event.target.value }))}
              placeholder="Locality"
              className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            />
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
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
            Service Location
          </label>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleFetchLocation}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl border transition ${
                values.location ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-black/15 bg-white text-ink hover:border-black/25"
              }`}
            >
              <LocationIcon className="h-4 w-4" />
              <span>{values.location ? "Location Pinned" : "Pin My Current Location"}</span>
            </button>
            <p className="text-[11px] leading-relaxed text-muted px-1">
              Used to help customers near you find your services more easily.
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
            Phone
          </label>
          <input
            type="tel"
            value={values.phone}
            onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                phone: event.target.value.replace(/\D/g, "").slice(0, 10),
              }))
            }
            placeholder="10-digit mobile"
            className="h-12 w-full rounded-xl border border-black/15 px-4 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
            Bio
          </label>
          <textarea
            rows={3}
            value={values.bio}
            onBlur={() => setTouched((current) => ({ ...current, bio: true }))}
            onChange={(event) => setValues((current) => ({ ...current, bio: event.target.value }))}
            placeholder="Tell people about your services"
            className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>

        {/* Packages Section */}
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black/60">Service Packages</h3>
            <button
              type="button"
              onClick={addPackage}
              className="text-xs font-bold text-crimson hover:underline"
            >
              + Add Package
            </button>
          </div>
          
          <div className="space-y-4">
            {(values.packages || []).map((pkg) => (
              <div key={pkg.id} className="relative rounded-xl border border-black/5 bg-[#f8f6f2] p-4">
                <button
                  type="button"
                  onClick={() => removePackage(pkg.id)}
                  className="absolute right-3 top-3 text-black/30 hover:text-crimson"
                >
                  ✕
                </button>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Package Name (e.g. Basic Fix)"
                    value={pkg.name}
                    onChange={(e) => updatePackage(pkg.id, "name", e.target.value)}
                    className="h-10 rounded-lg border border-black/10 px-3 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={pkg.price || ""}
                    onChange={(e) => updatePackage(pkg.id, "price", parseFloat(e.target.value) || 0)}
                    className="h-10 rounded-lg border border-black/10 px-3 text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Short Description"
                  value={pkg.description}
                  onChange={(e) => updatePackage(pkg.id, "description", e.target.value)}
                  className="mt-3 h-10 w-full rounded-lg border border-black/10 px-3 text-sm"
                />
              </div>
            ))}
            {(values.packages || []).length === 0 && (
              <p className="text-center text-xs text-muted italic">No packages added. Add one to show upfront pricing.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#f8f6f2] px-4 py-4">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-black/55">
              Available Now
            </p>
          </div>
          <button
            type="button"
            onClick={() => setValues((current) => ({ ...current, available: !current.available }))}
            className={`relative inline-flex h-7 w-12 rounded-full transition ${
              values.available ? "bg-crimson" : "bg-black/15"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                values.available ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row">
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="pill-button-primary w-full justify-center disabled:opacity-50"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="pill-button-secondary w-full justify-center">
            {cancelLabel}
          </button>
        )}
      </div>
    </form>
  );
}
