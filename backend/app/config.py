"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "agrimind"
    frontend_url: str = "http://localhost:5173"
    api_prefix: str = "/api"
    ml_model_path: str = "ml/model.pkl"


settings = Settings()
