"""
LangGraph workflow orchestration
For Phase 1 MVP, we'll keep it simple and call agents directly
"""
from agents.divergence import generate_divergence_points
from agents.timeline import generate_timeline
from agents.chapters import generate_chapters

async def run_divergence_agent(user_idea: str):
    """Run the divergence point generation agent"""
    return await generate_divergence_points(user_idea)

async def run_timeline_agent(user_idea: str, selected_divergence: dict):
    """Run the timeline generation agent"""
    return await generate_timeline(user_idea, selected_divergence)

async def run_chapter_agent(user_idea: str, divergence_point: dict, timeline: list):
    """Run the chapter generation agent"""
    return await generate_chapters(user_idea, divergence_point, timeline)
