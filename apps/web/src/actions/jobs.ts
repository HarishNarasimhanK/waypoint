"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SavedJobStatus } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

type JobData = {
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

export async function saveJob(jobData: JobData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  const job = await prisma.job.upsert({
    where: { sourceUrl: jobData.sourceUrl },
    create: {
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      jobType: jobData.jobType,
      description: jobData.description,
      qualifications: jobData.qualifications,
      salary: jobData.salary,
      sourcePlatform: jobData.sourcePlatform,
      sourceUrl: jobData.sourceUrl,
      postedAt: jobData.postedAt ? new Date(jobData.postedAt) : null,
      relevanceScore: jobData.relevanceScore,
    },
    update: {},
  });

  await prisma.savedJob.upsert({
    where: { userId_jobId: { userId: session.user.id, jobId: job.id } },
    create: { userId: session.user.id, jobId: job.id, status: "SAVED" },
    update: {},
  });

  revalidatePath("/tracker");
  revalidatePath("/radar");
  return { success: true };
}

export async function unsaveJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  await prisma.savedJob.deleteMany({
    where: { userId: session.user.id, jobId },
  });

  revalidatePath("/tracker");
  return { success: true };
}

export async function updateJobStatus(jobId: string, status: SavedJobStatus) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  await prisma.savedJob.update({
    where: { userId_jobId: { userId: session.user.id, jobId } },
    data: { status },
  });

  revalidatePath("/tracker");
  return { success: true };
}

export async function updateJobNotes(jobId: string, notes: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  await prisma.savedJob.update({
    where: { userId_jobId: { userId: session.user.id, jobId } },
    data: { notes },
  });

  revalidatePath("/tracker");
  return { success: true };
}
