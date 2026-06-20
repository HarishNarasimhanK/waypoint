import { prisma } from "@/lib/prisma";
import { JobStatus } from "@/generated/prisma/enums";

export class JobRepository {
  async findAll(filters?: {
    company?: string;
    location?: string;
    status?: JobStatus;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Record<string, unknown> = {};

    if (filters?.company) {
      where.company = { contains: filters.company, mode: "insensitive" };
    }
    if (filters?.location) {
      where.location = { contains: filters.location, mode: "insensitive" };
    }
    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { company: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    return prisma.job.findMany({
      where,
      orderBy: { scrapedAt: "desc" },
      take: filters?.limit || 20,
      skip: filters?.offset || 0,
    });
  }

  async findById(id: string) {
    return prisma.job.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: JobStatus) {
    return prisma.job.update({ where: { id }, data: { status } });
  }

  async count(filters?: { status?: JobStatus }) {
    return prisma.job.count({ where: filters });
  }
}

export const jobRepository = new JobRepository();
