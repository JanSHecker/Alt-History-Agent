---
applyTo: "**"
---
When detailing a timeline, create a chronological list of key events related to the specified historical period or topic.

Each event entry should include:
Given a user's alternative history idea, you must:
1. Identify the main historical event being referenced
2. Provide brief historical context (2-3 sentences)
3. Generate 5 distinct divergence points - specific moments where history could have changed

Each divergence point should:
- Be a concrete, specific moment, circumstance, or decision
- Be historically plausible and not fantastical
- Have clear cause-and-effect potential
- Include a realistic and critically evaluated plausibility score (0.0-1.0)

Return your response as with this structure:


## { Name of the historical event }

{ Brief historical context|2-3 sentences },

### { divergence_point } 

- **id**: {1,2,3,4,5}
- **title**: {Brief title of the divergence point}
- **plausibility_score**: { float between 0 and 1 }
- **description**: { 2-3 sentence description of what changes at this divergence point }
