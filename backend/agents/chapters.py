from langchain_core.prompts import ChatPromptTemplate
from agents.llm import get_llm
import json

async def generate_chapters(user_idea: str, endpoint: str, divergence_point: dict, timeline: list) -> dict:
    """
    Generate narrative chapters based on the timeline
    Returns: dict with list of chapters
    """
    print(f"DEBUG: Starting chapter generation for idea: {user_idea[:50]}...")
    print(f"DEBUG: Timeline has {len(timeline)} entries")
    llm = get_llm()
    
    # For MVP, we'll generate 3 chapters covering different periods
    # Group timeline into 3 roughly equal periods
    timeline_len = len(timeline)
    chapter_boundaries = [
        (0, timeline_len // 3),
        (timeline_len // 3, 2 * timeline_len // 3),
        (2 * timeline_len // 3, timeline_len)
    ]
    
    chapters = []
    
    for chapter_num, (start_idx, end_idx) in enumerate(chapter_boundaries, 1):
        chapter_timeline = timeline[start_idx:end_idx]
        
        # Format timeline entries for the prompt
        timeline_text = "\n".join([
            f"- {entry['date']}: {entry['event']} - {entry['description']}"
            for entry in chapter_timeline
        ])
        
        # Determine time period
        first_date = chapter_timeline[0]['date'] if chapter_timeline else "Unknown"
        last_date = chapter_timeline[-1]['date'] if chapter_timeline else "Unknown"
        time_period = f"{first_date} to {last_date}"
        
        # Add endpoint guidance if provided
        endpoint_instruction = ""
        endpoint_text = ""
        if endpoint:
            endpoint_instruction = "\n- Guide the narrative toward the desired endpoint: {endpoint}".format(endpoint=endpoint)
            endpoint_text = "\n\nDesired endpoint: {endpoint}".format(endpoint=endpoint)
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are a talented historical fiction writer creating an alternative history narrative.
Write an engaging, detailed chapter that brings the timeline events to life.

Your chapter should:
- Be 400-600 words long
- Include vivid descriptions and specific details
- Feature key historical figures and their decisions
- Show cause and effect relationships
- Maintain a narrative flow
- Be historically plausible and engaging
- Use a literary, engaging style{endpoint_instruction}

Return your response as valid JSON:
- title: string, engaging chapter title
- content: string, full chapter text in markdown format""".format(endpoint_instruction=endpoint_instruction)),
            ("human", """Original alternative history idea: {idea}{endpoint_text}

Divergence point: {divergence_description}

Write Chapter {chapter_num} covering this period:
Time Period: {time_period}

Key events to cover:
{timeline_events}

Create an engaging narrative chapter.""".format(
                idea=user_idea,
                endpoint_text=endpoint_text,
                divergence_description=divergence_point["description"],
                chapter_num=chapter_num,
                time_period=time_period,
                timeline_events=timeline_text
            ))
        ])
        
        print(f"DEBUG: Generating chapter {chapter_num} for period: {time_period}")
        chain = prompt | llm
        response = await chain.ainvoke({})
        
        print(f"DEBUG: Chapter {chapter_num} LLM response received, length: {len(response.content)}")
        
        # Parse JSON from response
        content = response.content
        print(f"DEBUG: Raw content: {content[:200]}...")
        
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
        
        print(f"DEBUG: Cleaned content: {content[:200]}...")
        
        chapter_data = json.loads(content)
        print(f"DEBUG: Chapter {chapter_num} parsed successfully: {chapter_data.get('title', 'No title')[:50]}...")
        chapters.append({
            "number": chapter_num,
            "title": chapter_data["title"],
            "content": chapter_data["content"],
            "time_period": time_period
        })
    
    return {"chapters": chapters}
