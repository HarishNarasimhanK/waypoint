import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SaveButton } from "@/components/radar/save-button";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) notFound();

  const qualifications = job.qualifications
    ? job.qualifications.split("\n").filter(Boolean)
    : [];

  return (
    <div className="max-w-3xl">
      <Link
        href="/radar"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Radar
      </Link>

      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500 flex-wrap">
              <span className="font-medium text-zinc-700">{job.company}</span>
              <span>·</span>
              <span>{job.location}</span>
              <span>·</span>
              <span>{job.jobType}</span>
              {job.salary && (
                <>
                  <span>·</span>
                  <span>{job.salary}</span>
                </>
              )}
            </div>
          </div>

          {job.relevanceScore !== null && (
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-blue-600">{Math.round(job.relevanceScore)}%</div>
              <div className="text-xs text-zinc-500">match</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={job.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Apply on {job.sourcePlatform}
          </a>
          <SaveButton
            jobData={{
              title: job.title,
              company: job.company,
              location: job.location,
              jobType: job.jobType,
              description: job.description,
              qualifications: job.qualifications,
              salary: job.salary,
              sourcePlatform: job.sourcePlatform,
              sourceUrl: job.sourceUrl,
              postedAt: job.postedAt?.toISOString() || null,
              relevanceScore: job.relevanceScore,
            }}
          />
        </div>

        <hr className="border-zinc-100" />

        <div>
          <h2 className="text-base font-semibold mb-3">About the role</h2>
          <div className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {qualifications.length > 0 && (
          <div>
            <h2 className="text-base font-semibold mb-3">Qualifications</h2>
            <ul className="space-y-2">
              {qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-zinc-600">
                  <svg className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 pt-4 text-xs text-zinc-400">
          <span>Source: {job.sourcePlatform}</span>
          <span>·</span>
          <span>Scraped {job.scrapedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </div>
  );
}
