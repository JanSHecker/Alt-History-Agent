from langchain_core.prompts import ChatPromptTemplate
from agents.llm import get_llm
import json

async def generate_divergence_points(user_idea: str) -> dict:
    """
    Generate divergence points from user's alternative history idea
    Returns: dict with event_name, context, and list of divergence_points
    """
    llm = get_llm()
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert historian specializing in alternative history scenarios.
Given a user's alternative history idea, you must:
1. Identify the main historical event being referenced
2. Provide brief historical context (2-3 sentences)
3. Generate 5 distinct divergence points - specific moments where history could have changed

Each divergence point should:
- Be a concrete, specific moment, circumstance, or decision
- Be historically plausible and not fantastical
- Have clear cause-and-effect potential
- Include a realistic and critically evaluated plausibility score (0.0-1.0)

Return your response as valid JSON with this structure:
{{
    "event_name": "Name of the historical event",
    "context": "Brief historical context",
    "divergence_points": [
        {{
            "id": 1,
            "title": "Brief title of the divergence point",
            "description": "2-3 sentence description of what changes",
            "plausibility_score": 0.5
        }}
    ]
}}"""),
        ("human", "{idea}")
    ])
    
    chain = prompt | llm
    response = await chain.ainvoke({"idea": user_idea})
    
    # Parse JSON from response
    content = response.content
    # Try to extract JSON if wrapped in markdown code blocks
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0].strip()
    elif "```" in content:
        content = content.split("```")[1].split("```")[0].strip()
    
    result = json.loads(content)
    return result
