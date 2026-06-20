import httpx
from app.core.interfaces import AIProvider
from app.core.config import settings
from app.ai import AIProviderFactory


class OllamaProvider(AIProvider):
    """Free AI provider using local Ollama instance."""

    def __init__(self):
        self.base_url = settings.ollama_base_url

    async def analyze_resume(
        self, resume_text: str, job_description: str
    ) -> dict:
        prompt = f"""Analyze this resume against the job description.

Resume:
{resume_text}

Job Description:
{job_description}

Respond in this exact JSON format:
{{
  "match_score": <0-100>,
  "missing_keywords": ["keyword1", "keyword2"],
  "suggestions": {{
    "reword": [{{"original": "...", "suggested": "...", "reason": "..."}}],
    "add": ["suggestion1", "suggestion2"],
    "strengths": ["strength1", "strength2"]
  }}
}}"""

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/api/generate",
                json={"model": "mistral", "prompt": prompt, "stream": False},
                timeout=60.0,
            )
            response.raise_for_status()
            data = response.json()
            # TODO: Parse the response text into structured format
            return {"raw_response": data.get("response", "")}


AIProviderFactory.register("ollama", OllamaProvider)
