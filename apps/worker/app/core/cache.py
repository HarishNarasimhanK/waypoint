import time
from typing import Optional
from app.core.interfaces import CacheProvider


class InMemoryCache(CacheProvider):
    """Simple in-memory cache. Swap to RedisCache later without changing callers."""

    def __init__(self):
        self._store: dict[str, tuple[str, float]] = {}

    def get(self, key: str) -> Optional[str]:
        if key not in self._store:
            return None
        value, expires_at = self._store[key]
        if time.time() > expires_at:
            del self._store[key]
            return None
        return value

    def set(self, key: str, value: str, ttl: int = 300) -> None:
        self._store[key] = (value, time.time() + ttl)

    def delete(self, key: str) -> None:
        self._store.pop(key, None)


cache = InMemoryCache()
