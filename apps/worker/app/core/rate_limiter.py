import time
from app.core.interfaces import RateLimiter


class InMemoryRateLimiter(RateLimiter):
    """Sliding window rate limiter. Swap to Redis-backed later."""

    def __init__(self):
        self._requests: dict[str, list[float]] = {}

    def is_allowed(self, key: str, max_requests: int, window: int) -> bool:
        now = time.time()
        if key not in self._requests:
            self._requests[key] = []

        # Remove expired timestamps
        self._requests[key] = [
            t for t in self._requests[key] if now - t < window
        ]

        if len(self._requests[key]) >= max_requests:
            return False

        self._requests[key].append(now)
        return True


rate_limiter = InMemoryRateLimiter()
