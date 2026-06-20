export interface JobCard {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  status: string;
  relevanceScore: number | null;
  postedAt: string | null;
  scrapedAt: string;
}

export interface JobDetail extends JobCard {
  description: string;
  qualifications: string | null;
  salary: string | null;
  sourcePlatform: string;
  sourceUrl: string;
}

export interface ResumeAnalysisResult {
  matchScore: number;
  missingKeywords: string[];
  suggestions: {
    reword: { original: string; suggested: string; reason: string }[];
    add: string[];
    strengths: string[];
  };
}

export interface ScrapeResult {
  jobsFound: number;
  jobsNew: number;
  errors: string[];
}
