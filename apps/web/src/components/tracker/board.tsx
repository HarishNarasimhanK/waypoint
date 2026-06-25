"use client";

import { SavedJobStatus } from "@/generated/prisma/client";
import { TrackerCard } from "./tracker-card";

type SavedJobWithJob = {
  id: string;
  jobId: string;
  status: SavedJobStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    jobType: string;
    salary: string | null;
    sourceUrl: string;
    sourcePlatform: string;
  };
};

type Props = {
  columns: Record<SavedJobStatus, SavedJobWithJob[]>;
};

const COLUMN_CONFIG: { status: SavedJobStatus; label: string; color: string }[] = [
  { status: "SAVED", label: "Saved", color: "bg-zinc-500" },
  { status: "APPLIED", label: "Applied", color: "bg-blue-500" },
  { status: "INTERVIEWING", label: "Interviewing", color: "bg-amber-500" },
  { status: "OFFER", label: "Offer", color: "bg-emerald-500" },
  { status: "REJECTED", label: "Rejected", color: "bg-red-400" },
];

export function TrackerBoard({ columns }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {COLUMN_CONFIG.map(({ status, label, color }) => (
        <div key={status} className="space-y-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs text-zinc-400 ml-auto">{columns[status].length}</span>
          </div>
          <div className="space-y-2 min-h-[200px]">
            {columns[status].map((savedJob) => (
              <TrackerCard key={savedJob.id} savedJob={savedJob} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
