"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const JOB_TYPES = ["All", "Full-time", "Internship", "Contract"];
const LOCATIONS = ["All", "Remote", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Pune"];

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSearch = searchParams.get("q") || "";
  const currentType = searchParams.get("type") || "All";
  const currentLocation = searchParams.get("location") || "All";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`/radar?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search roles, companies..."
          defaultValue={currentSearch}
          onChange={(e) => updateParams("q", e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
        />
      </div>

      <select
        value={currentType}
        onChange={(e) => updateParams("type", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors cursor-pointer"
      >
        {JOB_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select
        value={currentLocation}
        onChange={(e) => updateParams("location", e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors cursor-pointer"
      >
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
}
