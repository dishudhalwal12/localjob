import { SearchIcon } from "@/components/Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="relative block w-full">
      <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/45" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter colony or area name..."
        className="h-12 w-full rounded-full border border-black/10 bg-[#f9f7f3] pl-12 pr-4 text-sm text-ink outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/15"
      />
    </label>
  );
}
