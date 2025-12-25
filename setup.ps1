# Alt History Agent - Automated Setup Script
Write-Host "🚀 Setting up Alt History Agent..." -ForegroundColor Cyan

# Backend Setup
Write-Host "`n📦 Setting up Backend..." -ForegroundColor Yellow
Set-Location backend

# Create virtual environment
if (-not (Test-Path "venv")) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Gray
    python -m venv venv
} else {
    Write-Host "Virtual environment already exists." -ForegroundColor Gray
}

# Activate virtual environment and install dependencies
Write-Host "Activating virtual environment and installing dependencies..." -ForegroundColor Gray
& .\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Gray
    Copy-Item .env.example .env
    Write-Host "`n⚠️  IMPORTANT: Edit backend\.env and add your API key!" -ForegroundColor Red
    Write-Host "   - For OpenAI: Set OPENAI_API_KEY=your_key_here" -ForegroundColor Red
    Write-Host "   - For Anthropic: Set ANTHROPIC_API_KEY=your_key_here" -ForegroundColor Red
} else {
    Write-Host ".env file already exists." -ForegroundColor Gray
}

Set-Location ..

# Frontend Setup
Write-Host "`n📦 Setting up Frontend..." -ForegroundColor Yellow
Set-Location frontend

if (Test-Path "node_modules") {
    Write-Host "Frontend dependencies already installed." -ForegroundColor Gray
} else {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Gray
    npm install
}

Set-Location ..

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Edit backend\.env and add your API key (OPENAI_API_KEY or ANTHROPIC_API_KEY)" -ForegroundColor White
Write-Host "2. Run the backend: cd backend; npm run dev" -ForegroundColor White
Write-Host "3. Run the frontend (in a new terminal): cd frontend; npm run dev" -ForegroundColor White
Write-Host "4. Open http://localhost:5173 in your browser" -ForegroundColor White
