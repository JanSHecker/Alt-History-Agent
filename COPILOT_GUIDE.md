# Using GitHub Copilot with Alt-History-Agent

This guide explains how to use GitHub Copilot to generate alternative history scenarios with this repository.

## Quick Start

Simply open this repository in VS Code with GitHub Copilot enabled and ask natural language questions:

```
"Create an alternative history where the Apollo 11 mission failed"
"What if the Library of Alexandria never burned?"
"Generate a scenario where the Spanish Armada succeeded"
```

## How It Works

This repository includes specialized instruction files in `.github/instructions/` that automatically guide GitHub Copilot:

### 1. Divergence Point Generation (`divergence.instructions.md`)

When you ask about an alternative history, Copilot will:
- Identify the main historical event
- Provide brief historical context
- Generate 5 distinct, plausible divergence points
- Include plausibility scores (0.0-1.0)
- Explain potential consequences of each divergence

**Example output structure:**
```markdown
## {Historical Event Name}

{Historical context}

### {Divergence Point Title}
- **id**: {number}
- **title**: {brief title}
- **plausibility_score**: {0.0-1.0}
- **description**: {what changes}
```

### 2. Timeline Creation (`timeline.instructions.md`)

Once a divergence point is selected, Copilot creates a detailed timeline:
- 10-15 major events spanning years or decades
- Cascading effects across political, social, economic, and technological domains
- Realistic dates and timeframes
- Internal consistency and historical plausibility

**Example output structure:**
```markdown
## {Timeline Title}

- **date**: {date or date range}
- **event**: {event title}
- **description**: {what happens and why}
```

### 3. Chapter Writing (`chapters.instructions.md`)

Finally, Copilot transforms timeline events into narrative chapters:
- 400-600 words per chapter
- Vivid descriptions and specific details
- Key historical figures and their decisions
- Cause-and-effect relationships
- Literary, engaging style

**Example output structure:**
```markdown
# Chapter {number} - {Title}

{Narrative text with paragraphs}
```

## File Organization

Generated files are automatically created in the `workspace/` directory:
- `{scenario}_divergence.md`
- `{scenario}_timeline.md`
- `{scenario}_chapter_1.md`, `chapter_2.md`, etc.

## Sharing Your Work

To share your alternative history with the community:

1. Move your files from `workspace/` to `contributions/{scenario-name}/`
2. Rename files to standard format:
   - `divergence.md`
   - `timeline.md`
   - `chapter_1.md`, `chapter_2.md`, etc.
3. Create a `README.md` describing your scenario
4. Submit a pull request

See [contributions/apollo11-failure/](../contributions/apollo11-failure/) for a complete example.

## Tips for Best Results

### Be Specific
❌ "What if WWII was different?"
✅ "What if D-Day failed on June 6, 1944?"

### Choose Plausible Moments
Focus on pivotal decisions, close outcomes, or near-miss events where small changes could have large consequences.

### Iterate and Refine
- Generate divergence points first
- Select the most interesting one
- Create the timeline
- Then write chapters covering key periods

### Ask for Variations
"Give me 5 more divergence points for the fall of Rome"
"Extend this timeline another 20 years"
"Write a chapter focusing on the political consequences"

## Example Workflow

1. **Start with your idea:**
   ```
   "Create an alternative history where Julius Caesar survived the assassination"
   ```

2. **Review divergence points and select one:**
   ```
   "Create a timeline based on divergence point #3"
   ```

3. **Generate chapters:**
   ```
   "Write Chapter 1 covering the first 5 years of this timeline"
   "Write Chapter 2 covering the period 44-30 BCE"
   ```

4. **Refine and expand:**
   ```
   "Add more detail about the civil war in Chapter 2"
   "Extend the timeline to show consequences for the next century"
   ```

## Advanced Usage

### Combining Multiple Changes
```
"What if both Napoleon won at Waterloo AND the Industrial Revolution started 50 years earlier?"
```

### Focusing on Specific Domains
```
"Create a timeline focusing on technological consequences"
"Write a chapter about the cultural impact"
```

### Alternative Perspectives
```
"Rewrite Chapter 3 from the perspective of the Soviet leadership"
"Show how this timeline affected ordinary citizens"
```

## Troubleshooting

**Issue**: Copilot isn't following the format
**Solution**: Explicitly mention the type of output you want: "Generate divergence points following the repository instructions"

**Issue**: Outputs are too generic
**Solution**: Provide more historical context and specific details in your prompt

**Issue**: Want different style or depth
**Solution**: Add style instructions: "Write this chapter in a more dramatic style" or "Include more technical details"

## Additional Resources

- [Repository README](../README.md) - Full project documentation
- [Contribution Guidelines](../contributions/README.md) - How to share your work
- [Example Scenario](../contributions/apollo11-failure/) - Complete reference implementation

---

Happy alternative history creation! 🚀📚
