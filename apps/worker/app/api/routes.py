from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.scrapers import ScraperFactory
from app.core.rate_limiter import rate_limiter
from app.core.database import store_jobs

router = APIRouter()


class ScrapeRequest(BaseModel):
    sources: list[str] = ["remoteok", "arbeitnow", "linkedin"]
    keywords: list[str] = ["software engineer", "developer", "backend", "frontend"]
    location: str = "India"


@router.post("/scrape")
async def scrape_jobs(request: ScrapeRequest):
    if not rate_limiter.is_allowed("scrape", max_requests=4, window=60):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    results = {"jobs_found": 0, "jobs_new": 0, "sources": {}, "errors": []}

    for source in request.sources:
        try:
            scraper = ScraperFactory.create(source)
            jobs = await scraper.scrape(request.keywords, request.location)
            new_count = store_jobs(jobs)
            results["sources"][source] = {"found": len(jobs), "new": new_count}
            results["jobs_found"] += len(jobs)
            results["jobs_new"] += new_count
        except ValueError as e:
            results["errors"].append(str(e))
        except Exception as e:
            results["errors"].append(f"{source}: {str(e)}")

    return results


@router.get("/sources")
async def list_sources():
    return {"available": ScraperFactory.available()}
