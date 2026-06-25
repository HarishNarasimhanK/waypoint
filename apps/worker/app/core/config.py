from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = Field(default="postgresql://localhost:5432/waypoint")
    ai_provider: str = Field(default="ollama")
    ollama_base_url: str = Field(default="http://localhost:11434")
    embedding_model: str = Field(default="all-MiniLM-L6-v2")
    scrape_user_agent: str = Field(
        default="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )

    class Config:
        env_file = ".env"


settings = Settings()
