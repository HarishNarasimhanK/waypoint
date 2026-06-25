"use client";

import { useTransition } from "react";
import { saveJob } from "@/actions/jobs";

type Props = {
  jobData: {
    title: string;
    company: string;
    location: string;
    jobType: string;
    description: string;
    qualifications: string | null;
    salary: string | null;
    sourcePlatform: string;
    sourceUrl: string;
    postedAt: string | null;
    relevanceScore: number | null;
  };
};

export function SaveButton({ jobData }: Props) {
  const [pending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await saveJob(jobData);
    });
  }

  return (
    <button
      onClick={handleSave}
      disabled={pending}
      className="px-4 py-2.5 text-sm font-medium border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
