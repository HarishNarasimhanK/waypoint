from pydantic import BaseModel


class JobSchema(BaseModel):
    title: str
    company: str
    location: str
    job_type: str
    description: str
    qualifications: str | None = None
    salary: str | None = None
    source_platform: str
    source_url: str
    posted_at: str | None = None


class AnalysisResponse(BaseModel):
    match_score: float
    missing_keywords: list[str]
    suggestions: dict


class ScrapeResponse(BaseModel):
    jobs_found: int
    jobs_new: int
    errors: list[str]
