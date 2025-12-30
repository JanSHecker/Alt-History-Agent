"""
LangGraph workflow orchestration
For Phase 1 MVP, we'll keep it simple and call agents directly
"""
from agents.divergence import generate_divergence_points
from agents.timeline import generate_timeline
from agents.chapters import generate_chapters
from agents.endpoints import generate_endpoints

async def run_divergence_agent(user_idea: str, endpoint: str = None):
    """Run the divergence point generation agent"""
    return await generate_divergence_points(user_idea, endpoint)

async def run_timeline_agent(user_idea: str, endpoint: str, selected_divergence: dict):
    """Run the timeline generation agent"""
    return await generate_timeline(user_idea, endpoint, selected_divergence)

async def run_chapter_agent(user_idea: str, endpoint: str, divergence_point: dict, timeline: list):
    """Run the chapter generation agent"""
    return await generate_chapters(user_idea, endpoint, divergence_point, timeline)

async def run_endpoints_agent(user_idea: str, time_horizon: int = None):
    """Run the endpoints generation agent"""
    return await generate_endpoints(user_idea, time_horizon)
