import { WORKER_BASE_URL } from "@/config/worker";
import type { ResumeAnalysisResult, ScrapeResult } from "@/types";

export class WorkerService {
  private baseUrl: string;

  constructor(baseUrl: string = WORKER_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async scrape(sources: string[]): Promise<ScrapeResult> {
    const res = await fetch(`${this.baseUrl}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sources }),
    });

    if (!res.ok) throw new Error(`Scrape failed: ${res.statusText}`);
    return res.json();
  }

  async analyzeResume(
    resumeText: string,
    jobDescription: string,
    provider: string = "ollama"
  ): Promise<ResumeAnalysisResult> {
    const res = await fetch(`${this.baseUrl}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume_text: resumeText,
        job_description: jobDescription,
        provider,
      }),
    });

    if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`);
    return res.json();
  }

  async embed(text: string): Promise<number[]> {
    const res = await fetch(`${this.baseUrl}/embed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error(`Embedding failed: ${res.statusText}`);
    const data = await res.json();
    return data.embedding;
  }

  async matchJobs(
    resumeEmbedding: number[],
    limit: number = 20
  ): Promise<{ id: string; score: number }[]> {
    const res = await fetch(`${this.baseUrl}/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_embedding: resumeEmbedding, limit }),
    });

    if (!res.ok) throw new Error(`Match failed: ${res.statusText}`);
    const data = await res.json();
    return data.jobs;
  }

  async health(): Promise<{ status: string; ai_provider: string }> {
    const res = await fetch(`${this.baseUrl}/health`);
    return res.json();
  }
}

export const workerService = new WorkerService();
