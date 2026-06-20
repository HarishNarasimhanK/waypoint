# System Architecture

## Overview

Waypoint is a two-service architecture:

1. **Next.js App** — handles UI, API routes, database access
2. **Python Workers** — handles scraping and AI processing

They communicate via HTTP and share a PostgreSQL database.

## Service Diagram

```
                    ┌─────────────┐
                    │   Browser   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Next.js   │
                    │   (Vercel)  │
                    │             │
                    │ • Pages/UI  │
                    │ • API routes│
                    │ • Prisma    │
                    └──┬──────┬───┘
                       │      │
              DB read/ │      │ HTTP calls
              write    │      │ (scrape, analyze)
                       │      │
                 ┌─────▼──┐ ┌─▼──────────┐
                 │PostgreSQL│ │  FastAPI    │
                 │(Railway) │ │  (Railway)  │
                 │          │ │             │
                 │ • jobs   │ │ • /scrape   │
                 │ • users  │ │ • /analyze  │
                 │ • resume │ │ • /health   │
                 └──────────┘ └─────────────┘
```

## Data Flow

### Job Discovery (Scraping)
```
Vercel Cron (every 15 min)
  → calls Next.js API route /api/cron/scrape
    → calls Python worker POST /scrape
      → Python scrapes job boards
      → Python writes jobs to PostgreSQL
    → returns summary (jobs found, errors)
```

### Resume Analysis
```
User uploads resume on frontend
  → Next.js API route /api/resume/analyze
    → sends resume text + job description to Python POST /analyze
      → Python runs AI analysis (Ollama or paid API)
      → returns: match score, suggestions, strengths
    → Next.js stores result in DB
  → frontend displays analysis
```

### Job Browsing
```
User opens Radar tab
  → Next.js server component fetches jobs from DB via Prisma
  → renders job cards
User clicks a job
  → Next.js fetches full job details from DB
  → renders job detail page
```

## API Contract (Python Worker)

### POST /scrape
Triggers a scraping run.
```json
// Request
{ "sources": ["linkedin", "greenhouse"] }

// Response
{ "jobs_found": 12, "jobs_new": 5, "errors": [] }
```

### POST /analyze
Analyzes resume against a job description.
```json
// Request
{
  "resume_text": "...",
  "job_description": "...",
  "provider": "ollama"
}

// Response
{
  "match_score": 72,
  "missing_keywords": ["distributed systems", "kubernetes"],
  "suggestions": [
    { "type": "reword", "original": "...", "suggested": "...", "reason": "..." }
  ],
  "strengths": ["strong project section", "relevant internship"]
}
```

### GET /health
Health check.
```json
{ "status": "ok", "ai_provider": "ollama", "version": "0.1.0" }
```

## Scaling Path (future)

| Current | Future |
|---------|--------|
| HTTP calls to Python | Redis queue + workers |
| Vercel cron triggers | Dedicated scheduler |
| Single Python instance | Multiple workers |
| Polling for new jobs | WebSocket push notifications |
