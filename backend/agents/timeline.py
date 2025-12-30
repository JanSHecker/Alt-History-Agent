from langchain_core.prompts import ChatPromptTemplate
from agents.llm import get_llm
import json

async def generate_timeline(user_idea: str, endpoint: str, divergence_point: dict) -> dict:
    """
    Generate a high-level timeline based on the selected divergence point
    Returns: dict with list of timeline entries
    """
    print(f"DEBUG: Starting timeline generation for idea: {user_idea[:50]}...")
    print(f"DEBUG: Divergence point: {divergence_point['title']}")
    print(f"DEBUG: Endpoint: {endpoint}")
    llm = get_llm()
    
    # Add endpoint guidance if provided
    endpoint_instruction = ""
    endpoint_text = ""
    if endpoint:
        endpoint_instruction = "\n- Guide the timeline toward the desired endpoint: {endpoint}".format(endpoint=endpoint)
        endpoint_text = "\n\nDesired endpoint: {endpoint}".format(endpoint=endpoint)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert historian creating alternative history timelines.
Given a divergence point, create a plausible timeline of consequences spanning multiple years or decades.

The timeline should:
- Start with the divergence point
- Include 10-15 major events/milestones
- Show cascading effects across political, social, economic, and technological domains
- Use realistic dates and timeframes
- Maintain historical plausibility and internal consistency{endpoint_instruction}

Return your response as valid JSON with this structure:
- timeline: array of objects, each with:
  - date: string (format like "June 18, 1815" or "1815" or "1815-1820")
  - event: string, brief event title
  - description: string, 1-2 sentence description""".format(endpoint_instruction=endpoint_instruction)),
        ("human", """Original idea: {idea}{endpoint_text}

Divergence point:
Title: {divergence_title}
Description: {divergence_description}

Create a detailed timeline of consequences.""".format(idea=user_idea, endpoint_text=endpoint_text, divergence_title=divergence_point['title'], divergence_description=divergence_point['description']))
    ])
    
    chain = prompt | llm
    print("DEBUG: Invoking LLM for timeline generation...")
    response = await chain.ainvoke({
        "idea": user_idea,
        "divergence_title": divergence_point["title"],
        "divergence_description": divergence_point["description"]
    })
    print(f"DEBUG: LLM response received, length: {len(response.content)}")
    
    # Parse JSON from response
    content = response.content
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0].strip()
    elif "```" in content:
        content = content.split("```")[1].split("```")[0].strip()
    
    print(f"DEBUG: Parsed content: {content[:200]}...")
    result = json.loads(content)
    print(f"DEBUG: Timeline parsed successfully with {len(result['timeline'])} entries")
    return result
