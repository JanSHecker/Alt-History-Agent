from typing import TypedDict, List, Dict, Any, Optional

class AgentState(TypedDict):
    """State shared across all agents"""
    # User input
    user_idea: str
    
    # Stage 1: Divergence Points
    event_name: str
    event_context: str
    divergence_points: List[Dict[str, Any]]
    selected_divergence: Optional[Dict[str, Any]]
    
    # Stage 2: Timeline
    timeline: List[Dict[str, Any]]
    
    # Stage 3: Chapters
    chapters: List[Dict[str, Any]]
    
    # Metadata
    messages: List[str]
