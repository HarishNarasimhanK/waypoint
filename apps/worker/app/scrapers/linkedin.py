import httpx
from datetime import datetime, timezone, timedelta
from bs4 import BeautifulSoup
from urllib.parse import quote_plus
from app.core.interfaces import ScraperAdapter
from app.core.config import settings
from app.scrapers import ScraperFactory


class LinkedInScraper(ScraperAdapter):
    BASE_URL = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search"

    async def scrape(self, keywords: list[str], location: str) -> list[dict]:
        query = " ".join(keywords) if keywords else "software engineer"
        loc = location or "India"

        params = {
            "keywords": query,
            "location": loc,
            "f_TPR": "r86400",  # past 24 hours
            "f_E": "2",  # entry level
            "start": 0,
        }

        headers = {
            "User-Agent": settings.scrape_user_agent,
            "Accept": "text/html",
        }

        jobs = []
        async with httpx.AsyncClient(headers=headers, timeout=15, follow_redirects=True) as client:
            response = await client.get(self.BASE_URL, params=params)
            if response.status_code != 200:
                return []

        soup = BeautifulSoup(response.text, "html.parser")
        cards = soup.find_all("div", class_="base-card")

        for card in cards:
            try:
                title_el = card.find("h3", class_="base-search-card__title")
                company_el = card.find("h4", class_="base-search-card__subtitle")
                location_el = card.find("span", class_="job-search-card__location")
                link_el = card.find("a", class_="base-card__full-link")
                time_el = card.find("time")

                if not title_el or not company_el or not link_el:
                    continue

                title = title_el.get_text(strip=True)
                company = company_el.get_text(strip=True)
                job_location = location_el.get_text(strip=True) if location_el else loc
                url = link_el.get("href", "").split("?")[0]

                posted_at = None
                if time_el and time_el.get("datetime"):
                    try:
                        posted_at = datetime.fromisoformat(time_el["datetime"])
                    except (ValueError, AttributeError):
                        pass

                if not url:
                    continue

                jobs.append({
                    "title": title,
                    "company": company,
                    "location": job_location,
                    "job_type": "Full-time",
                    "description": f"{title} at {company}. Location: {job_location}.",
                    "qualifications": None,
                    "salary": None,
                    "source_platform": "linkedin",
                    "source_url": url,
                    "posted_at": posted_at,
                })
            except Exception:
                continue

        return jobs


ScraperFactory.register("linkedin", LinkedInScraper)
