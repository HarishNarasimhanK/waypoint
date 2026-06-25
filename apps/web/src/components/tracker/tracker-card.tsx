"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { SavedJobStatus } from "@/generated/prisma/client";
import { updateJobStatus, unsaveJob, updateJobNotes } from "@/actions/jobs";

type Props = {
  savedJob: {
    id: string;
    jobId: string;
    status: SavedJobStatus;
    notes: string | null;
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
};

const STATUS_OPTIONS: { value: SavedJobStatus; label: string }[] = [
  { value: "SAVED", label: "Saved" },
  { value: "APPLIED", label: "Applied" },
  { value: "INTERVIEWING", label: "Interviewing" },
  { value: "OFFER", label: "Offer" },
  { value: "REJECTED", label: "Rejected" },
];

export function TrackerCard({ savedJob }: Props) {
  const [pending, startTransition] = useTransition();
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(savedJob.notes || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { job } = savedJob;

  useEffect(() => {
    if (editingNotes && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingNotes]);

  function handleStatusChange(newStatus: SavedJobStatus) {
    startTransition(async () => {
      await updateJobStatus(savedJob.jobId, newStatus);
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await unsaveJob(savedJob.jobId);
    });
  }

  function handleNotesSave() {
    setEditingNotes(false);
    startTransition(async () => {
      await updateJobNotes(savedJob.jobId, notes);
    });
  }

  return (
    <div className={`p-3 rounded-lg border border-zinc-100 bg-white space-y-2 ${pending ? "opacity-50" : ""}`}>
      <div>
        <p className="text-sm font-medium leading-tight">{job.title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{job.company} · {job.location}</p>
      </div>

      {editingNotes ? (
        <div className="space-y-1.5">
          <textarea
            ref={textareaRef}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) handleNotesSave();
              if (e.key === "Escape") setEditingNotes(false);
            }}
            placeholder="Links, notes, reminders..."
            className="w-full text-xs px-2 py-1.5 rounded border border-zinc-200 bg-zinc-50 outline-none focus:border-blue-600 resize-none"
            rows={3}
          />
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleNotesSave}
              className="text-xs px-2 py-0.5 bg-zinc-900 text-white rounded font-medium cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setEditingNotes(false)}
              className="text-xs px-2 py-0.5 text-zinc-500 hover:text-zinc-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditingNotes(true)}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer w-full text-left"
        >
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
          </svg>
          {savedJob.notes ? (
            <span className="text-zinc-600 truncate">{savedJob.notes}</span>
          ) : (
            <span>Add notes</span>
          )}
        </button>
      )}

      <div className="flex items-center gap-2">
        <select
          value={savedJob.status}
          onChange={(e) => handleStatusChange(e.target.value as SavedJobStatus)}
          disabled={pending}
          className="flex-1 text-xs px-2 py-1 rounded border border-zinc-200 bg-white outline-none focus:border-blue-600 cursor-pointer"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={handleRemove}
          disabled={pending}
          className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
          title="Remove"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <a
        href={job.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline block"
      >
        View posting
      </a>
    </div>
  );
}
