from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai import AIProviderFactory
from app.embeddings import embedding_provider
from app.scrapers import ScraperFactory
from app.core.rate_limiter import rate_limiter

router = APIRouter()


class ScrapeRequest(BaseModel):
    sources: list[str] = ["linkedin"]
    keywords: list[str] = []
    location: str = ""


class AnalyzeRequest(BaseModel):
    resume_text: str
    job_description: str
    provider: str = "ollama"


class EmbedRequest(BaseModel):
    text: str


class MatchRequest(BaseModel):
    resume_embedding: list[float]
    limit: int = 20


@router.post("/scrape")
async def scrape_jobs(request: ScrapeRequest):
    if not rate_limiter.is_allowed("scrape", max_requests=4, window=60):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    results = {"jobs_found": 0, "jobs_new": 0, "errors": []}

    for source in request.sources:
        try:
            scraper = ScraperFactory.create(source)
            jobs = await scraper.scrape(request.keywords, request.location)
            results["jobs_found"] += len(jobs)
            # TODO: deduplicate and store in DB
        except ValueError as e:
            results["errors"].append(str(e))
        except Exception as e:
            results["errors"].append(f"{source}: {str(e)}")

    return results


@router.post("/analyze")
async def analyze_resume(request: AnalyzeRequest):
    if not rate_limiter.is_allowed("analyze", max_requests=10, window=60):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    try:
        provider = AIProviderFactory.create(request.provider)
        result = await provider.analyze_resume(
            request.resume_text, request.job_description
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/embed")
async def embed_text(request: EmbedRequest):
    embedding = embedding_provider.embed(request.text)
    return {"embedding": embedding}


@router.post("/match")
async def match_jobs(request: MatchRequest):
    # TODO: Query pgvector for similar job embeddings
    return {"jobs": []}
