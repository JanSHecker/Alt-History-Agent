# Alt History Agent

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-compose-blue)](docker-compose.yml)
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-Enabled-purple)](/.github/instructions/)

A sophisticated multi-agent system built with LangGraph for generating creative and plausible alternative history scenarios. Explore "what if" moments in history through AI-powered narrative generation.

> **✨ GitHub Copilot Integration**: This project includes specialized agent instructions in `.github/instructions/` for enhanced alternative history generation directly in your editor.

## 🌟 Features

- **Multi-Agent Architecture**: Specialized agents for divergence point analysis, timeline generation, and narrative writing
- **GitHub Copilot Integration**: Pre-configured agent instructions for generating alternative histories directly in VS Code
- **Interactive Web Interface**: Modern React frontend with real-time progress tracking
- **Historical Accuracy**: Research-backed scenarios with plausibility scoring
- **Flexible Generation Modes**: Manual review, custom inputs, or fully automated generation
- **Community Contributions**: Share and explore alternative histories in the `contributions/` directory
- **Docker Deployment**: Easy setup with containerized backend and frontend

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- API key for OpenAI or Anthropic

### Automated Setup

```bash
# Clone the repository
git clone <repository-url>
cd alt-history-agent

# Run setup script
.\setup.ps1

# Add your API key to backend\.env
# OPENAI_API_KEY=your_key_here
# or
# ANTHROPIC_API_KEY=your_key_here

# Start the application
docker-compose up
```

### Manual Setup

```bash
# Backend setup
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Add API key to .env file

# Frontend setup
cd ../frontend
npm install

# Start services
# Backend: cd backend && npm run dev
# Frontend: cd frontend && npm run dev
```

Visit `http://localhost:5173` to access the application.

## 📖 Usage

### Using GitHub Copilot Agent

The fastest way to generate alternative histories! Simply ask GitHub Copilot in VS Code:

```
"Create an alternative history where the Apollo 11 mission failed"
"What if Napoleon won at Waterloo?"
"Generate a timeline where the Roman Empire never fell"
```

The agent uses specialized instructions in `.github/instructions/` to:
- Generate historically plausible divergence points
- Create detailed timelines of consequences
- Write engaging narrative chapters

Your generated scenarios are automatically saved in the `workspace/` directory.

📘 **See the [Copilot Usage Guide](COPILOT_GUIDE.md) for detailed instructions and examples.**

### Using the Web Interface

1. **Enter Your Idea**: Input an alternative history scenario (e.g., "What if Napoleon won at Waterloo?")
2. **Select Divergence Point**: Choose from AI-generated plausible turning points or create your own
3. **Review Timeline**: Examine the generated chronological sequence of events
4. **Read Narrative**: Enjoy detailed chapters telling the alternative history story

### API Usage

The backend provides REST endpoints for programmatic access:

```bash
# Generate divergence points
curl -X POST http://localhost:8000/api/divergence-points \
  -H "Content-Type: application/json" \
  -d '{"idea": "What if the Roman Empire never fell?"}'

# Generate timeline
curl -X POST http://localhost:8000/api/timeline \
  -H "Content-Type: application/json" \
  -d '{"divergence_point": "Constantine moves capital to Rome instead of Byzantium"}'

# Generate chapters
curl -X POST http://localhost:8000/api/chapters \
  -H "Content-Type: application/json" \
  -d '{"timeline": [...]}'
```

## 🏗️ Architecture

The system uses a multi-agent LangGraph workflow:

1. **Divergence Point Agent**: Analyzes historical events and generates plausible "what if" scenarios
2. **Timeline Generator Agent**: Creates chronological sequences of consequences
3. **Chapter Writer Agent**: Transforms timelines into engaging narrative chapters
4. **Research Agent**: Provides historical context and fact-checking

### GitHub Copilot Agent Instructions

The `.github/instructions/` directory contains specialized prompts that guide GitHub Copilot in generating high-quality alternative histories:

- **divergence.instructions.md**: Guidelines for identifying and detailing plausible divergence points with historical context and plausibility scoring
- **timeline.instructions.md**: Instructions for creating chronological timelines showing cascading consequences across multiple domains
- **chapters.instructions.md**: Narrative writing guidelines for creating engaging 400-600 word chapters that bring timelines to life

These instructions are automatically applied when using GitHub Copilot in this repository, ensuring consistent, historically-grounded outputs.

## 🛠️ Technology Stack

- **Backend**: Python, FastAPI, LangGraph, LangChain
- **Frontend**: React, Tailwind CSS, Vite
- **AI/ML**: OpenAI GPT-4, Anthropic Claude
- **Deployment**: Docker, Docker Compose
- **Development**: Node.js, npm/pnpm

## 📁 Project Structure

```
alt-history-agent/
├── .github/
│   ├── agents/             # GitHub Copilot agent configurations
│   └── instructions/       # Agent instruction files
│       ├── chapters.instructions.md
│       ├── divergence.instructions.md
│       └── timeline.instructions.md
├── backend/                # FastAPI backend with LangGraph agents
│   ├── agents/             # Agent implementations
│   ├── api.py              # API endpoints
│   ├── main.py             # Application entry point
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   └── App.jsx         # Main application
│   └── package.json        # Node dependencies
├── contributions/          # Community-shared alternative histories
│   ├── README.md           # Contribution guidelines
│   └── apollo11-failure/   # Example scenario
├── workspace/              # Generated scenarios (local)
├── docker-compose.yml      # Container orchestration
└── setup.ps1              # Automated setup script
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Contributing Code

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Contributing Alternative Histories

Share your creative scenarios with the community! See [contributions/README.md](contributions/README.md) for guidelines.

1. Generate your alternative history using the agent
2. Create a subdirectory in `contributions/` with your scenario name
3. Include divergence points, timeline, and narrative chapters
4. Add a README describing your scenario
5. Submit a pull request

**Featured Example**: Check out [contributions/apollo11-failure/](contributions/apollo11-failure/) for a complete example of a well-structured alternative history contribution.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [LangGraph](https://langchain-ai.github.io/langgraph/) for multi-agent orchestration
- Powered by advanced LLMs from OpenAI and Anthropic
- Inspired by alternative history literature and historical scholarship

## 📞 Support

If you encounter issues or have questions:

- Check the [Setup Guide](SETUP.md) for installation help
- Read the [Copilot Usage Guide](COPILOT_GUIDE.md) for GitHub Copilot integration
- Review [OpenRouter Configuration](OPENROUTER.md) for API setup
- Explore the [Contributions Directory](contributions/) for example scenarios
- Open an issue on GitHub for bugs or feature requests

---

_Explore the endless possibilities of "what if" in history._
