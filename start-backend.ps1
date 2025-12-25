# Start Backend Server
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Cyan
Set-Location backend
& .\venv\Scripts\Activate.ps1
python main.py
