import { workerSkills, type WorkerSkillFilter } from "@/types";

interface SkillFilterProps {
  value: WorkerSkillFilter;
  onChange: (skill: WorkerSkillFilter) => void;
}

const filters: WorkerSkillFilter[] = ["All", ...workerSkills];

export function SkillFilter({ value, onChange }: SkillFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {filters.map((skill) => {
        const active = skill === value;

        return (
          <button
            key={skill}
            type="button"
            onClick={() => onChange(skill)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? "border-crimson bg-crimson text-white"
                : "border-black bg-white text-black hover:border-crimson hover:text-crimson"
            }`}
          >
            {skill}
          </button>
        );
      })}
    </div>
  );
}
