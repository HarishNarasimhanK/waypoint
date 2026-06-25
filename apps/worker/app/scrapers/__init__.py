from app.core.interfaces import ScraperAdapter


class ScraperFactory:
    _registry: dict[str, type[ScraperAdapter]] = {}

    @classmethod
    def register(cls, name: str, adapter_class: type[ScraperAdapter]):
        cls._registry[name] = adapter_class

    @classmethod
    def create(cls, name: str) -> ScraperAdapter:
        if name not in cls._registry:
            raise ValueError(f"Unknown scraper: {name}. Available: {list(cls._registry.keys())}")
        return cls._registry[name]()

    @classmethod
    def available(cls) -> list[str]:
        return list(cls._registry.keys())


# Import scrapers to trigger registration
import app.scrapers.linkedin  # noqa: E402, F401
import app.scrapers.remoteok  # noqa: E402, F401
import app.scrapers.arbeitnow  # noqa: E402, F401
