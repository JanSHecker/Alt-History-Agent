# Alt History Agent - Multi-Agent System

A LangGraph-based multi-agent system for generating creative and plausible alternative history scenarios.

## 🎯 Project Overview

This system uses multiple specialized agents working together to create detailed alternative history scenarios by analyzing historical events, identifying divergence points, and exploring potential alternative outcomes.

## 🏗️ System Architecture

### Proposed Agent Flow

```
User Input (Idea)
       ↓
Divergence Point Agent → [Presents 3-5 divergence points]
       ↓
User Selection/Custom/Auto
       ↓
Timeline Generator → [Creates high-level timeline]
       ↓
User Review/Edit/Auto-Accept
       ↓
Chapter Writer → [Generates detailed chapters based on timeline]
       ↓
Final Narrative Output
```

### Detailed Flow Steps

1. **User Input**: "What if Napoleon won at Waterloo?"

2. **Divergence Point Generation** (Agent 1)

   - Analyzes the historical event
   - Generates 3-5 plausible divergence points
   - Example output:
     - Option A: Napoleon's cavalry charges succeed in breaking Wellington's center
     - Option B: Prussian reinforcements are delayed by 6 hours
     - Option C: Weather conditions favor French artillery
     - Option D: Key British commanders are killed early in battle
     - Custom: [User writes their own]
     - Auto: [System selects most plausible]

3. **Timeline Generation** (Agent 2)

   - Takes selected divergence point
   - Creates high-level timeline of consequences
   - Example output:
     - June 1815: Napoleon wins at Waterloo
     - July 1815: British-Prussian alliance regroups
     - 1816: Treaty negotiations begin
     - 1817-1820: Napoleonic Europe consolidates
     - etc.
   - User can: Accept / Edit dates or events / Add milestones

4. **Chapter Writing** (Agent 3)
   - Takes each timeline milestone
   - Generates detailed narrative chapters
   - Each chapter covers a period/event from timeline
   - Maintains consistency across chapters

### Agent Roles (Refined)

1. **Divergence Point Agent**

   - Purpose: Analyze historical event and generate plausible divergence points
   - Tasks:
     - Research the historical event context
     - Identify 3-5 key moments where outcomes could have changed
     - Present options with brief explanations
     - Support custom user input
   - Tools: Web search, LLM reasoning, historical knowledge base
   - Human-in-the-loop: User selects option, writes custom, or chooses auto

2. **Timeline Generator Agent**

   - Purpose: Create high-level chronological timeline from divergence point
   - Tasks:
     - Map out major consequences over time
     - Identify key dates and milestones
     - Consider cascading effects (political, economic, social, technological)
     - Generate 10-20 timeline entries
   - Tools: LLM reasoning, causal chain analysis
   - Human-in-the-loop: User can review, edit dates/events, add/remove milestones, or auto-accept

3. **Chapter Writer Agent**

   - Purpose: Transform timeline into detailed narrative chapters
   - Tasks:
     - Take each timeline milestone/period
     - Generate engaging narrative prose
     - Maintain historical plausibility and consistency
     - Include relevant details (people, places, decisions)
     - Link chapters for narrative flow
   - Tools: LLM generation, context management
   - Output: Complete alternative history narrative

4. **Research/Context Agent** (Supporting)

   - Purpose: Provide historical context to other agents
   - Tasks:
     - Fetch historical facts on demand
     - Verify dates and events
     - Provide background information
   - Tools: Web search, vector DB, Wikipedia API

5. **Validation Agent** (Optional)
   - Purpose: Ensure consistency and plausibility throughout
   - Tasks:
     - Check for logical contradictions
     - Verify timeline coherence
     - Rate plausibility of divergence points
   - Tools: Logic checking, fact verification

## 🔄 LangGraph Flow Design

### State Schema (Draft)

```python
{
    "user_idea": str,  # Original user input
    "historical_event": str,  # Extracted event name
    "event_context": dict,  # Historical background

    # Stage 1: Divergence Points
    "divergence_points": list[dict],  # Generated options
    "selected_divergence": dict,  # User's choice or auto-selected
    "user_mode": str,  # "manual", "custom", or "auto"

    # Stage 2: Timeline
    "timeline": list[dict],  # Generated timeline entries
    "timeline_approved": bool,
    "timeline_edits": list,  # User modifications

    # Stage 3: Chapters
    "chapters": list[dict],  # Generated chapter content
    "final_narrative": str,  # Complete assembled story

    # Metadata
    "plausibility_scores": dict,
    "sources": list
}
```

### User Interaction Modes

- **Manual Mode**: User reviews and approves each step (divergence point, timeline, chapters)
- **Custom Mode**: User provides their own divergence point or timeline edits
- **Auto Mode**: System auto-selects best options and generates complete narrative

### Key Decision Points

- ✅ **Human-in-the-loop**: Yes, with auto-override option at each stage
- ✅ **Conditional routing**: Based on user_mode (manual/custom/auto)
- [ ] **Parallel processing**: Could generate multiple divergence point options simultaneously
- [ ] **Chapter generation**: Sequential (for consistency) or parallel (for speed)?

## 🛠️ Technology Stack

- **Backend Framework**: LangGraph
- **Frontend**: React + Tailwind CSS
- **Backend API**: FastAPI (to connect frontend to LangGraph)
- **LLM**: (To be decided - OpenAI, Anthropic, local models?)
- **Vector Store**: (Optional for Phase 1 - Pinecone, Chroma, FAISS?)
- **Tools**:
  - Wikipedia API / historical databases
  - Web search (Tavily, SerpAPI?)
  - Document loaders (if using local historical texts)

## 📋 Planning Questions

### Flow Design

1. Should the system generate a single detailed scenario or multiple alternative branches?
2. How many iterations of validation/refinement should we allow?
3. Should users be able to guide the divergence point selection?
4. Do we want parallel scenario generation for efficiency?

### Data & Sources

5. What historical data sources should we integrate?
6. Should we use a vector database for historical facts?
7. Do we need a custom knowledge base or rely on LLM knowledge + search?

### Output Format

8. What should the final output look like? (Narrative, timeline, both?)
9. Should we include confidence scores or plausibility ratings?
10. Do we want to generate visual aids (maps, charts, timelines)?

### Technical Decisions

11. Which LLM provider(s) should we use?
12. How do we handle rate limits and costs?
13. Should we implement caching for common historical queries?

## 🚀 Development Phases

### Phase 1: MVP - Basic Flow with Web UI

- [ ] Set up project structure
  - [ ] Backend: LangGraph + FastAPI
  - [ ] Frontend: React + Tailwind CSS + Vite
- [ ] Backend Implementation
  - [ ] Implement Divergence Point Agent
    - [ ] Generate 3-5 divergence points
    - [ ] Auto-select option
  - [ ] Implement Timeline Generator Agent
    - [ ] Generate high-level timeline (10-15 entries)
    - [ ] Auto-accept for MVP
  - [ ] Implement Chapter Writer Agent
    - [ ] Generate 2-3 chapters for MVP
  - [ ] Create FastAPI endpoints
    - [ ] POST /generate-divergence-points
    - [ ] POST /generate-timeline
    - [ ] POST /generate-chapters
- [ ] Frontend Implementation
  - [ ] Basic layout with Tailwind
  - [ ] Input form for user idea
  - [ ] Divergence point selection UI
  - [ ] Timeline display component
  - [ ] Chapter display with formatting
  - [ ] Loading states and progress indicators
- [ ] Test end-to-end with one historical event

### Phase 2: Enhanced User Interaction

- [ ] Add custom divergence point input
- [ ] Implement timeline editing in UI
  - [ ] Add/remove timeline entries
  - [ ] Edit dates and events
  - [ ] Approve/regenerate timeline
- [ ] Add manual/custom/auto mode toggle
- [ ] Session state management (save/load scenarios)
- [ ] Improved output formatting (Markdown rendering)
- [ ] Progress indicators for generation steps

### Phase 3: Enhanced Generation

- [ ] Generate multiple chapters from timeline
- [ ] Add Research/Context Agent for better accuracy
- [ ] Implement Validation Agent for consistency checking
- [ ] Add plausibility scoring
- [ ] Improve narrative flow between chapters

### Phase 4: Polish & Advanced Features

- [ ] Enhanced UI with animations and transitions
- [ ] Dark mode toggle
- [ ] Vector database for historical facts
- [ ] Export options (PDF, Markdown, HTML)
- [ ] Interactive timeline visualization (D3.js or similar)
- [ ] Chapter regeneration/editing capabilities
- [ ] Save and browse multiple scenarios
- [ ] User feedback and rating system
- [ ] Plausibility score visualization
- [ ] Responsive mobile design

## 💡 Example User Journey

**Input**: "What if Napoleon won at Waterloo?"

**Step 1 - Divergence Points Presented**:

```
Please select a divergence point:
1. Napoleon's cavalry successfully breaks Wellington's center line
2. Prussian reinforcements delayed by severe weather
3. Marshal Ney captures La Haye Sainte earlier in battle
4. British ammunition supplies run critically low
5. [Write your own custom divergence point]
6. [Auto-select most plausible option]
```

**User selects**: Option 2

**Step 2 - Timeline Generated**:

```
Generated Timeline (Review & Edit):
- June 18, 1815: Napoleon wins decisive victory at Waterloo
- June-July 1815: British forces retreat to channel ports
- August 1815: Peace negotiations begin in Vienna
- 1816: Treaty of Paris establishes new European order
- 1817-1820: Napoleonic Code spreads across Europe
- 1821-1825: Napoleon consolidates French empire
...
[Accept] [Edit] [Add Entry] [Remove Entry]
```

**User**: Accepts timeline

**Step 3 - Chapters Generated**:

```
Generating chapters:
✓ Chapter 1: The Triumph at Waterloo (June 18, 1815)
✓ Chapter 2: The British Retreat (June-July 1815)
✓ Chapter 3: A New European Order (August 1815 - 1816)
✓ Chapter 4: The Second French Empire (1817-1825)
...
```

**Output**: Complete alternative history narrative with detailed chapters

## 💡 Additional Example Use Cases

1. "What if the Roman Empire never fell?"
2. "What if the Library of Alexandria was never destroyed?"
3. "What if the Cuban Missile Crisis escalated?"
4. "What if the Spanish Armada succeeded?"

## 🤔 Open Questions for Discussion

- How do we balance creativity with historical plausibility?
- Should we focus on specific time periods or be open-ended?
- How granular should the scenarios be (days, years, centuries)?
- Do we want to track cascading effects across multiple domains (political, technological, cultural)?

---

**Next Steps**: Review this plan and decide on the initial flow architecture and agent responsibilities.
