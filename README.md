# Alt History Agent

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-compose-blue)](docker-compose.yml)

A sophisticated multi-agent system built with LangGraph for generating creative and plausible alternative history scenarios. Explore "what if" moments in history through AI-powered narrative generation.

## 🌟 Features

- **Multi-Agent Architecture**: Specialized agents for divergence point analysis, timeline generation, and narrative writing
- **Interactive Web Interface**: Modern React frontend with real-time progress tracking
- **Historical Accuracy**: Research-backed scenarios with plausibility scoring
- **Flexible Generation Modes**: Manual review, custom inputs, or fully automated generation
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

## 🛠️ Technology Stack

- **Backend**: Python, FastAPI, LangGraph, LangChain
- **Frontend**: React, Tailwind CSS, Vite
- **AI/ML**: OpenAI GPT-4, Anthropic Claude
- **Deployment**: Docker, Docker Compose
- **Development**: Node.js, npm/pnpm

## 📁 Project Structure

```
alt-history-agent/
├── backend/                 # FastAPI backend with LangGraph agents
│   ├── agents/             # Agent implementations
│   ├── api.py              # API endpoints
│   ├── main.py             # Application entry point
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   └── App.jsx         # Main application
│   └── package.json        # Node dependencies
├── docker-compose.yml      # Container orchestration
└── setup.ps1              # Automated setup script
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [LangGraph](https://langchain-ai.github.io/langgraph/) for multi-agent orchestration
- Powered by advanced LLMs from OpenAI and Anthropic
- Inspired by alternative history literature and historical scholarship

## 📞 Support

If you encounter issues or have questions:

- Check the [Setup Guide](SETUP.md) for installation help
- Review [OpenRouter Configuration](OPENROUTER.md) for API setup
- Open an issue on GitHub for bugs or feature requests

---

_Explore the endless possibilities of "what if" in history._
