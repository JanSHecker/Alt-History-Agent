from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Keys
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    openrouter_api_key: Optional[str] = None
    
    # Server
    host: str = "localhost"
    port: int = 8000
    
    # LLM Settings
    llm_provider: str = "openrouter"  # "openai", "anthropic", or "openrouter"
    model_name: str = "google/gemini-2.0-flash-exp:free"  # Default free model
    temperature: float = 0.7
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
