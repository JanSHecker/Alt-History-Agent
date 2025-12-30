from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from agents.graph import run_divergence_agent, run_timeline_agent, run_chapter_agent, run_endpoints_agent

router = APIRouter()

# Request/Response models
class UserIdeaRequest(BaseModel):
    idea: str
    endpoint: Optional[str] = None
    time_horizon: Optional[int] = None

class DivergencePoint(BaseModel):
    id: int
    title: str
    description: str
    plausibility_score: float

class DivergencePointsResponse(BaseModel):
    event_name: str
    context: str
    divergence_points: List[DivergencePoint]

class TimelineRequest(BaseModel):
    idea: str
    endpoint: str = None
    selected_divergence: DivergencePoint

class TimelineEntry(BaseModel):
    date: str
    event: str
    description: str

class TimelineResponse(BaseModel):
    timeline: List[TimelineEntry]

class ChaptersRequest(BaseModel):
    idea: str
    endpoint: str = None
    divergence_point: DivergencePoint
    timeline: List[TimelineEntry]

class Chapter(BaseModel):
    number: int
    title: str
    content: str
    time_period: str

class ChaptersResponse(BaseModel):
    chapters: List[Chapter]

class EndpointsResponse(BaseModel):
    endpoints: List[str]

@router.post("/divergence-points", response_model=DivergencePointsResponse)
async def generate_divergence_points(request: UserIdeaRequest):
    """Generate divergence points from user's alternative history idea"""
    try:
        print("[DEBUG] /divergence-points called with idea:", request.idea, "endpoint:", request.endpoint)
        result = await run_divergence_agent(request.idea, request.endpoint)
        print("[DEBUG] /divergence-points result:", result)
        return result
    except Exception as e:
        import traceback
        print("[ERROR] Exception in /divergence-points:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error generating divergence points: {str(e)}")

@router.post("/endpoints", response_model=EndpointsResponse)
async def generate_endpoints(request: UserIdeaRequest):
    """Generate possible desired endpoints for the alternative history scenario"""
    try:
        print("[DEBUG] /endpoints called with idea:", request.idea, "time_horizon:", request.time_horizon)
        endpoints = await run_endpoints_agent(request.idea, request.time_horizon)
        print("[DEBUG] /endpoints result:", endpoints)
        return {"endpoints": endpoints}
    except Exception as e:
        import traceback
        print("[ERROR] Exception in /endpoints:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error generating endpoints: {str(e)}")

@router.post("/timeline", response_model=TimelineResponse)
async def generate_timeline(request: TimelineRequest):
    """Generate timeline from selected divergence point"""
    try:
        print(f"DEBUG: Received timeline request for idea: {request.idea[:50]}...")
        print(f"DEBUG: Selected divergence: {request.selected_divergence.title}")
        print(f"DEBUG: Endpoint: {request.endpoint}")
        result = await run_timeline_agent(
            request.idea,
            request.endpoint,
            request.selected_divergence.model_dump()
        )
        print(f"DEBUG: Timeline generated successfully with {len(result['timeline'])} entries")
        return result
    except Exception as e:
        print(f"DEBUG: Error generating timeline: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating timeline: {str(e)}")

@router.post("/chapters", response_model=ChaptersResponse)
async def generate_chapters(request: ChaptersRequest):
    """Generate narrative chapters from timeline"""
    try:
        result = await run_chapter_agent(
            request.idea,
            request.endpoint,
            request.divergence_point.model_dump(),
            [entry.model_dump() for entry in request.timeline]
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating chapters: {str(e)}")
