from abc import ABC, abstractmethod
from typing import Optional


class ScraperAdapter(ABC):
    """Strategy pattern — each job board implements this interface."""

    @abstractmethod
    async def scrape(self, keywords: list[str], location: str) -> list[dict]:
        """Returns list of raw job dicts from this source."""
        ...


class AIProvider(ABC):
    """Strategy pattern — swap AI models without touching business logic."""

    @abstractmethod
    async def analyze_resume(
        self, resume_text: str, job_description: str
    ) -> dict:
        """Returns analysis: match_score, missing_keywords, suggestions."""
        ...


class EmbeddingProvider(ABC):
    """Generates vector embeddings for text."""

    @abstractmethod
    def embed(self, text: str) -> list[float]:
        """Returns embedding vector for the given text."""
        ...


class CacheProvider(ABC):
    """Abstract cache — in-memory now, Redis later."""

    @abstractmethod
    def get(self, key: str) -> Optional[str]:
        ...

    @abstractmethod
    def set(self, key: str, value: str, ttl: int = 300) -> None:
        ...

    @abstractmethod
    def delete(self, key: str) -> None:
        ...


class RateLimiter(ABC):
    """Abstract rate limiter — in-memory now, Redis later."""

    @abstractmethod
    def is_allowed(self, key: str, max_requests: int, window: int) -> bool:
        """Check if request is allowed within the rate limit window."""
        ...
