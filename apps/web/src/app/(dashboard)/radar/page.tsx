import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Filters } from "@/components/radar/filters";
import { JobCard, type Job } from "@/components/radar/job-card";
import { RadarTabs } from "@/components/radar/radar-tabs";

export default async function RadarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; location?: string; tab?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboarded: true, interestedRoles: true, resumeText: true },
  });

  if (!user?.onboarded) redirect("/onboarding");

  const params = await searchParams;
  const query = params.q || "";
  const typeFilter = params.type || "All";
  const locationFilter = params.location || "All";
  const tab = params.tab || "all";

  const where: Record<string, unknown> = {};

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { company: { contains: query, mode: "insensitive" } },
    ];
  }
  if (typeFilter !== "All") {
    where.jobType = typeFilter;
  }
  if (locationFilter !== "All") {
    where.location = { contains: locationFilter, mode: "insensitive" };
  }

  // For "For You" tab, filter by user's interested roles
  if (tab === "foryou" && user.interestedRoles.length > 0) {
    where.OR = user.interestedRoles.map((role) => ({
      title: { contains: role, mode: "insensitive" },
    }));
  }

  const dbJobs = await prisma.job.findMany({
    where,
    orderBy: { scrapedAt: "desc" },
    take: 50,
  });

  // Score jobs for "For You" tab based on keyword matching
  let jobs: Job[] = dbJobs.map((j) => {
    let score: number | null = j.relevanceScore ? Math.round(j.relevanceScore) : null;

    if (tab === "foryou" && user.resumeText) {
      score = calculateMatchScore(j.title, j.description, user.resumeText, user.interestedRoles);
    }

    return {
      id: j.id,
      title: j.title,
      company: j.company,
      location: j.location,
      jobType: j.jobType,
      postedAt: (j.postedAt || j.scrapedAt).toISOString(),
      salary: j.salary,
      relevanceScore: score,
      sourcePlatform: j.sourcePlatform,
    };
  });

  // Sort "For You" by relevance score
  if (tab === "foryou") {
    jobs = jobs
      .filter((j) => j.relevanceScore !== null && j.relevanceScore > 0)
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Job Radar</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {jobs.length} {jobs.length === 1 ? "opportunity" : "opportunities"} found
          </p>
        </div>
      </div>

      <RadarTabs activeTab={tab} />
      <Filters />

      <div className="space-y-2">
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-zinc-500">
              {tab === "foryou"
                ? "No recommendations yet. Try updating your profile with more details."
                : "No jobs match your filters."}
            </p>
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}

function calculateMatchScore(
  title: string,
  description: string,
  resumeText: string,
  interestedRoles: string[]
): number {
  const resumeWords = new Set(
    resumeText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );

  const jobText = `${title} ${description}`.toLowerCase();
  const jobWords = jobText
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  let matches = 0;
  const uniqueJobWords = new Set(jobWords);
  for (const word of uniqueJobWords) {
    if (resumeWords.has(word)) matches++;
  }

  let score = Math.min(95, Math.round((matches / Math.max(uniqueJobWords.size, 1)) * 100 * 3));

  // Boost if title matches interested roles
  for (const role of interestedRoles) {
    if (title.toLowerCase().includes(role.toLowerCase())) {
      score = Math.min(99, score + 15);
      break;
    }
  }

  return score;
}
