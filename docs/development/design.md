# Increment 1 — Design

## High-Level Architecture

See `docs/architecture/system-design.md` for full details.

```
Next.js (TypeScript) ←── HTTP ──→ FastAPI (Python)
        │                                │
        └────────── PostgreSQL ──────────┘
```

## Data Model (draft)

```
Job
├── id
├── title
├── company
├── location
├── job_type (full-time, intern, contract)
├── description (full text)
├── qualifications
├── salary_range (nullable)
├── source_platform (linkedin, greenhouse, lever, etc.)
├── source_url (original job portal link)
├── posted_at
├── scraped_at
├── status (new, viewed, applied, interviewing, offer, rejected)
└── relevance_score (nullable)

User
├── id
├── email
├── name
├── resume_url (stored file reference)
└── preferences (target roles, locations, keywords)

ResumeAnalysis
├── id
├── user_id
├── job_id
├── match_score
├── suggestions (JSON: keywords_to_add, bullets_to_reword, strengths)
├── ai_provider_used
└── created_at
```

## API Routes (draft)

```
GET    /api/jobs              — list jobs (with filters)
GET    /api/jobs/:id          — full job details
PATCH  /api/jobs/:id/status   — update application status
POST   /api/resume/analyze    — upload resume + job_id → analysis
```

## AI Provider Interface (draft)

```
interface AIProvider {
  analyzeResume(resume: string, jobDescription: string): AnalysisResult
}
```

Implementations:
- FreeProvider (Ollama + Llama/Mistral — local or free hosted)
- PremiumProvider (Claude API / OpenAI — paid)
