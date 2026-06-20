from app.core.interfaces import ScraperAdapter
from app.scrapers import ScraperFactory


class LinkedInScraper(ScraperAdapter):
    """LinkedIn job scraper adapter. TODO: implement actual scraping logic."""

    async def scrape(self, keywords: list[str], location: str) -> list[dict]:
        # TODO: Implement LinkedIn scraping
        # Will use httpx + BeautifulSoup to parse job listings
        return []


ScraperFactory.register("linkedin", LinkedInScraper)
