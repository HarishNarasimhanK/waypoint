import Link from "next/link";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  postedAt: string;
  salary: string | null;
  relevanceScore: number | null;
  sourcePlatform: string;
};

export function JobCard({ job }: { job: Job }) {
  const initial = job.company[0].toUpperCase();
  const timeAgo = getTimeAgo(job.postedAt);

  return (
    <Link
      href={`/radar/${job.id}`}
      className="flex items-center justify-between p-4 rounded-lg border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-all group"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-sm font-semibold text-zinc-600 shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate group-hover:text-blue-600 transition-colors">
            {job.title}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5 truncate">
            {job.company} · {job.location} · {timeAgo}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0 ml-4">
        {job.salary && (
          <span className="text-xs text-zinc-500 hidden md:block">{job.salary}</span>
        )}
        <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
          {job.jobType}
        </span>
        {job.relevanceScore !== null && (
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${job.relevanceScore}%` }}
              />
            </div>
            <span className="text-xs font-medium text-zinc-500 tabular-nums w-7">
              {job.relevanceScore}%
            </span>
          </div>
        )}
        <svg
          className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
