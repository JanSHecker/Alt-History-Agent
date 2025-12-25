# Alt History Agent - Setup Instructions

## Quick Setup (Automated)

Run the setup script from the project root:

```powershell
.\setup.ps1
```

This will:

- Create Python virtual environment
- Install backend dependencies
- Install frontend dependencies
- Create `.env` file

Then:

1. Edit `backend\.env` and add your API key (OPENAI_API_KEY or ANTHROPIC_API_KEY)
2. Start backend: `.\start-backend.ps1` (or `cd backend; npm run dev`)
3. Start frontend in new terminal: `.\start-frontend.ps1` (or `cd frontend; npm run dev`)
4. Open `http://localhost:5173` in your browser

## Manual Setup

### Backend Setup

1. Navigate to the backend directory:

```powershell
cd backend
```

2. Create a virtual environment:

```powershell
python -m venv venv
```

3. Activate the virtual environment:

```powershell
venv\Scripts\Activate.ps1
```

4. Install dependencies:

```powershell
pip install -r requirements.txt
```

5. Create a `.env` file from the example:

```powershell
Copy-Item .env.example .env
```

6. Edit `.env` and add your API key:

   - For OpenAI: Add your `OPENAI_API_KEY`
   - For Anthropic: Add your `ANTHROPIC_API_KEY`

7. Run the backend server:

```powershell
npm run dev
# or: python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```powershell
cd frontend
```

2. Install dependencies:

```powershell
npm install
```

3. Run the development server:

```powershell
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. Make sure both backend and frontend are running
2. Open `http://localhost:5173` in your browser
3. Enter an alternative history idea (e.g., "What if Napoleon won at Waterloo?")
4. Select a divergence point from the generated options
5. Review the generated timeline
6. Read the narrative chapters

## API Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `POST /api/divergence-points` - Generate divergence points
- `POST /api/timeline` - Generate timeline
- `POST /api/chapters` - Generate narrative chapters

## Technologies Used

- **Backend**: FastAPI, LangGraph, LangChain
- **Frontend**: React, Tailwind CSS, Vite
- **LLM**: OpenAI GPT-4 or Anthropic Claude
