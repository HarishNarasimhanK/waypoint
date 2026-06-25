import httpx
from datetime import datetime, timezone
from bs4 import BeautifulSoup
from app.core.interfaces import ScraperAdapter
from app.core.config import settings
from app.scrapers import ScraperFactory


class ArbeitnowScraper(ScraperAdapter):
    BASE_URL = "https://www.arbeitnow.com/api/job-board-api"

    async def scrape(self, keywords: list[str], location: str) -> list[dict]:
        headers = {"User-Agent": settings.scrape_user_agent}

        async with httpx.AsyncClient(headers=headers, timeout=15) as client:
            response = await client.get(self.BASE_URL)
            response.raise_for_status()

        data = response.json()
        listings = data.get("data", [])

        jobs = []
        for item in listings:
            if not item.get("title") or not item.get("company_name"):
                continue

            # Filter by keywords if provided
            if keywords:
                text = f"{item.get('title', '')} {item.get('description', '')} {' '.join(item.get('tags', []))}".lower()
                if not any(kw.lower() in text for kw in keywords):
                    continue

            # Filter by location if provided
            if location:
                item_location = item.get("location", "").lower()
                if location.lower() not in item_location and item_location != "remote":
                    if not item.get("remote", False):
                        continue

            posted_at = None
            if item.get("created_at"):
                try:
                    posted_at = datetime.fromtimestamp(item["created_at"], tz=timezone.utc)
                except (ValueError, TypeError):
                    pass

            description = item.get("description", "")
            if "<" in description:
                description = BeautifulSoup(description, "html.parser").get_text(separator="\n").strip()

            job_location = item.get("location", "Remote")
            if item.get("remote"):
                job_location = f"{job_location} (Remote)" if job_location else "Remote"

            tags = item.get("tags", [])
            job_type = "Full-time"
            for tag in tags:
                if "intern" in tag.lower():
                    job_type = "Internship"
                    break
                if "contract" in tag.lower():
                    job_type = "Contract"
                    break

            jobs.append({
                "title": item["title"],
                "company": item["company_name"],
                "location": job_location,
                "job_type": job_type,
                "description": description[:5000],
                "qualifications": ", ".join(tags) if tags else None,
                "salary": None,
                "source_platform": "arbeitnow",
                "source_url": item.get("url", f"https://www.arbeitnow.com/view/{item.get('slug', '')}"),
                "posted_at": posted_at,
            })

        return jobs


ScraperFactory.register("arbeitnow", ArbeitnowScraper)
