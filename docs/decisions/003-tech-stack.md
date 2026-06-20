# ADR-003: Tech Stack — TypeScript App + Python Workers

## Status

Accepted

## Context

The developer is strong in Python/AI, new to full-stack web development. Goal is to learn TypeScript/React properly while shipping a quality product in 4 weeks. Need a clear separation between web app and AI/scraping logic.

## Decision

### Web App (TypeScript)
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL + Prisma ORM
- **Testing:** Vitest
- **Deployment:** Vercel

### Workers (Python)
- **Framework:** FastAPI
- **Scraping:** httpx + BeautifulSoup
- **AI (free):** Ollama (Llama/Mistral)
- **AI (paid):** Claude API / OpenAI (pluggable, future)
- **Testing:** pytest
- **Deployment:** Railway

### Communication
- Next.js ↔ Python: HTTP (REST) — Next.js calls FastAPI endpoints
- Both services share the same PostgreSQL database
- No message queue for MVP (add Redis/BullMQ later for scaling)

## Architecture

```
┌────────────────────────┐       HTTP        ┌─────────────────────────┐
│  Next.js App           │ ──────────────▶   │  Python (FastAPI)       │
│  ├── Frontend (React)  │    /scrape        │  ├── Scraper service    │
│  ├── API routes        │    /analyze       │  └── AI engine          │
│  └── Prisma (DB)       │ ◀──────────────   │                         │
└────────────┬───────────┘    JSON response   └───────────┬─────────────┘
             │                                            │
             └──────────── PostgreSQL ────────────────────┘
```

## Consequences

- Developer learns full-stack TypeScript (primary learning goal)
- Python handles familiar territory (scraping, AI) — no friction
- Two deployments to manage, but both have free tiers
- Communication is simple HTTP — can upgrade to queue later without rewriting business logic
- Shared database means both services stay in sync without complex orchestration

## Future Scaling Path

1. Add Redis for job queuing (Python workers consume from queue)
2. Add WebSocket for real-time notifications
3. Add BullMQ dashboard for monitoring worker health
