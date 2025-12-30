from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from agents.llm import get_llm
import logging

logger = logging.getLogger(__name__)

# Define structured output schema
class DivergencePoint(BaseModel):
    id: int
    title: str
    description: str
    plausibility_score: float = Field(ge=0.0, le=1.0)

class DivergenceResponse(BaseModel):
    event_name: str
    context: str
    divergence_points: list[DivergencePoint]

async def generate_divergence_points(user_idea: str, endpoint: str = None) -> dict:
    logger.debug(f"Generating divergence points for idea: {user_idea}, endpoint: {endpoint}")
    
    llm = get_llm()
    parser = JsonOutputParser(pydantic_object=DivergenceResponse)
    
    # Build prompt with conditional endpoint instruction
    endpoint_text = (
        f"\n\nThe user has specified a desired endpoint: '{endpoint}'. "
        "Generate divergence points that could realistically lead toward this outcome."
        if endpoint else ""
    )
    
    system_template = """You are an expert historian specializing in alternative history scenarios.

Given a user's alternative history idea, you must:
1. Identify the main historical event being referenced
2. Provide brief historical context (2-3 sentences)
3. Generate 5 distinct divergence points - specific moments where history could have changed

Each divergence point should:
- Be a concrete, specific moment, circumstance, or decision
- Be historically plausible and not fantastical
- Have clear cause-and-effect potential
- Include a realistic plausibility score (0.0-1.0){endpoint_instruction}

{format_instructions}"""
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_template),
        ("human", "{idea}")
    ])
    
    # Create chain with parser
    chain = prompt | llm | parser
    
    try:
        result = await chain.ainvoke({
            "idea": user_idea,
            "endpoint_instruction": endpoint_text,
            "format_instructions": parser.get_format_instructions()
        })
        return result
    except Exception as e:
        logger.error(f"Failed to generate divergence points: {e}")
        raise