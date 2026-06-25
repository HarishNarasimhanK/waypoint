import psycopg2
from psycopg2.extras import execute_values
from app.core.config import settings


def get_connection():
    return psycopg2.connect(settings.database_url)


def store_jobs(jobs: list[dict]) -> int:
    if not jobs:
        return 0

    conn = get_connection()
    cur = conn.cursor()
    new_count = 0

    for job in jobs:
        try:
            cur.execute(
                """
                INSERT INTO "Job" (id, title, company, location, "jobType", description, qualifications, salary, "sourcePlatform", "sourceUrl", "postedAt", "scrapedAt", status, "relevanceScore", embedding)
                VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), 'NEW', NULL, '{}')
                ON CONFLICT ("sourceUrl") DO NOTHING
                """,
                (
                    job["title"],
                    job["company"],
                    job["location"],
                    job["job_type"],
                    job["description"],
                    job.get("qualifications"),
                    job.get("salary"),
                    job["source_platform"],
                    job["source_url"],
                    job.get("posted_at"),
                ),
            )
            if cur.rowcount > 0:
                new_count += 1
        except Exception:
            conn.rollback()
            continue

    conn.commit()
    cur.close()
    conn.close()
    return new_count
