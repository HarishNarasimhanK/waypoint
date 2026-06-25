import httpx
from datetime import datetime, timezone
from app.core.interfaces import ScraperAdapter
from app.core.config import settings
from app.scrapers import ScraperFactory


class RemoteOKScraper(ScraperAdapter):
    BASE_URL = "https://remoteok.com/api"

    async def scrape(self, keywords: list[str], location: str) -> list[dict]:
        headers = {"User-Agent": settings.scrape_user_agent}

        async with httpx.AsyncClient(headers=headers, timeout=15) as client:
            response = await client.get(self.BASE_URL)
            response.raise_for_status()

        data = response.json()

        # First item is metadata, skip it
        if data and isinstance(data[0], dict) and "legal" in data[0]:
            data = data[1:]

        jobs = []
        for item in data:
            if not item.get("position") or not item.get("company"):
                continue

            # Filter by keywords if provided
            if keywords:
                text = f"{item.get('position', '')} {item.get('description', '')} {' '.join(item.get('tags', []))}".lower()
                if not any(kw.lower() in text for kw in keywords):
                    continue

            posted_at = None
            if item.get("date"):
                try:
                    posted_at = datetime.fromisoformat(item["date"].replace("Z", "+00:00"))
                except (ValueError, AttributeError):
                    pass

            description = item.get("description", "")
            # Clean HTML tags from description
            if "<" in description:
                from bs4 import BeautifulSoup
                description = BeautifulSoup(description, "html.parser").get_text(separator="\n").strip()

            tags = item.get("tags", [])

            jobs.append({
                "title": item["position"],
                "company": item["company"],
                "location": item.get("location", "Remote"),
                "job_type": "Full-time",
                "description": description[:5000],
                "qualifications": ", ".join(tags) if tags else None,
                "salary": self._format_salary(item),
                "source_platform": "remoteok",
                "source_url": f"https://remoteok.com/remote-jobs/{item.get('slug', item.get('id', ''))}",
                "posted_at": posted_at,
            })

        return jobs

    def _format_salary(self, item: dict) -> str | None:
        min_sal = item.get("salary_min")
        max_sal = item.get("salary_max")
        if min_sal and max_sal:
            return f"${int(min_sal):,}-${int(max_sal):,}"
        if min_sal:
            return f"${int(min_sal):,}+"
        return None


ScraperFactory.register("remoteok", RemoteOKScraper)
