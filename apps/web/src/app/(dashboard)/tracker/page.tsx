import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TrackerBoard } from "@/components/tracker/board";

export default async function TrackerPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const savedJobs = await prisma.savedJob.findMany({
    where: { userId: session.user.id },
    include: { job: true },
    orderBy: { updatedAt: "desc" },
  });

  const columns = {
    SAVED: savedJobs.filter((sj) => sj.status === "SAVED"),
    APPLIED: savedJobs.filter((sj) => sj.status === "APPLIED"),
    INTERVIEWING: savedJobs.filter((sj) => sj.status === "INTERVIEWING"),
    OFFER: savedJobs.filter((sj) => sj.status === "OFFER"),
    REJECTED: savedJobs.filter((sj) => sj.status === "REJECTED"),
  };

  const totalCount = savedJobs.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Application Tracker</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          {totalCount} {totalCount === 1 ? "job" : "jobs"} tracked
        </p>
      </div>

      {totalCount === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-200 rounded-xl">
          <svg className="w-10 h-10 mx-auto text-zinc-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <p className="text-sm text-zinc-500 mb-1">No jobs tracked yet</p>
          <p className="text-xs text-zinc-400">Save jobs from the Radar to start tracking them here.</p>
        </div>
      ) : (
        <TrackerBoard columns={columns} />
      )}
    </div>
  );
}
