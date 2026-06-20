from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = Field(default="postgresql://localhost:5432/waypoint")
    ai_provider: str = Field(default="ollama")
    ollama_base_url: str = Field(default="http://localhost:11434")
    embedding_model: str = Field(default="all-MiniLM-L6-v2")

    class Config:
        env_file = ".env"


settings = Settings()
