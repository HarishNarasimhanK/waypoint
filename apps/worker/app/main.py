from fastapi import FastAPI
from app.api.routes import router
from app.core.config import settings

app = FastAPI(
    title="Waypoint Worker",
    description="Scraping and AI service for Waypoint",
    version="0.1.0",
)

app.include_router(router)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "ai_provider": settings.ai_provider,
        "version": "0.1.0",
    }
