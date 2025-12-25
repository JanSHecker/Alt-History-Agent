from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from config import settings

def get_llm():
    """Get configured LLM instance"""
    if settings.llm_provider == "openrouter" and settings.openrouter_api_key:
        return ChatOpenAI(
            model=settings.model_name,
            openai_api_key=settings.openrouter_api_key,
            openai_api_base="https://openrouter.ai/api/v1",
            temperature=settings.temperature,
            default_headers={
                "HTTP-Referer": "https://github.com/alt-history-agent",
                "X-Title": "Alt History Agent"
            }
        )
    elif settings.llm_provider == "anthropic" and settings.anthropic_api_key:
        return ChatAnthropic(
            model=settings.model_name,
            anthropic_api_key=settings.anthropic_api_key,
            temperature=settings.temperature
        )
    elif settings.llm_provider == "openai" and settings.openai_api_key:
        return ChatOpenAI(
            model=settings.model_name,
            openai_api_key=settings.openai_api_key,
            temperature=settings.temperature
        )
    else:
        raise ValueError(
            f"No valid LLM configuration found. Provider: {settings.llm_provider}. "
            "Please set the appropriate API key in .env file:\n"
            "- For OpenRouter: OPENROUTER_API_KEY\n"
            "- For OpenAI: OPENAI_API_KEY\n"
            "- For Anthropic: ANTHROPIC_API_KEY"
        )
