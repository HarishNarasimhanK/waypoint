from app.core.interfaces import AIProvider
from app.core.config import settings


class AIProviderFactory:
    """Factory pattern — create AI providers from config."""

    _registry: dict[str, type[AIProvider]] = {}

    @classmethod
    def register(cls, name: str, provider_class: type[AIProvider]):
        cls._registry[name] = provider_class

    @classmethod
    def create(cls, name: str | None = None) -> AIProvider:
        provider_name = name or settings.ai_provider
        if provider_name not in cls._registry:
            raise ValueError(f"Unknown AI provider: {provider_name}. Available: {list(cls._registry.keys())}")
        return cls._registry[provider_name]()

    @classmethod
    def available(cls) -> list[str]:
        return list(cls._registry.keys())
