from app.core.interfaces import EmbeddingProvider
from app.core.config import settings


class SentenceTransformerEmbedding(EmbeddingProvider):
    """Free embedding using sentence-transformers (local, no API cost)."""

    def __init__(self):
        self._model = None

    @property
    def model(self):
        if self._model is None:
            from sentence_transformers import SentenceTransformer
            self._model = SentenceTransformer(settings.embedding_model)
        return self._model

    def embed(self, text: str) -> list[float]:
        embedding = self.model.encode(text)
        return embedding.tolist()


embedding_provider = SentenceTransformerEmbedding()
