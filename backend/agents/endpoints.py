from langchain_core.prompts import ChatPromptTemplate
from agents.llm import get_llm
import json

async def generate_endpoints(user_idea: str, time_horizon: int = None) -> list:
    print("[DEBUG] Generating endpoints for idea:", user_idea, "time_horizon:", time_horizon)
    """
    Generate possible desired endpoints for the alternative history scenario
    Returns: list of endpoint strings
    """
    llm = get_llm()

    system_prompt = """You are an expert historian specializing in alternative history scenarios.
Given a user's alternative history scenario, generate 5 endpoints for the timeline. These endpoints represent distinct outcomes and should be grounded but narratively interesting.
"""
    if time_horizon:
        system_prompt += "\nThe user wants to see outcomes within a time horizon of {time_horizon} years from the point of divergence. All endpoints and plausible within this time frame.".format(time_horizon=time_horizon)

    system_prompt += """
Return your response as valid JSON with this structure:
- endpoints: array of strings, each being a possible endpoint outcome

IMPORTANT: Return ONLY valid JSON, no markdown code blocks, no explanations."""

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{idea}")
    ])

    chain = prompt | llm
    response = await chain.ainvoke({"idea": user_idea})

    # Parse JSON from response
    content = response.content
    # Try to extract JSON if wrapped in markdown code blocks
    if "```json" in content:
        content = content.split("```json")[1].split("```", 1)[0].strip()
    elif "```" in content:
        content = content.split("```", 1)[1].split("```", 1)[0].strip()

    result = json.loads(content)
    return result["endpoints"]