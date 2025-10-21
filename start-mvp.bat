@echo off
echo 🚀 Starting CavalierMarket MVP...
echo.

echo 📡 Starting Backend (FastAPI)...
start "Backend Server" cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

echo 🎨 Starting Frontend (React + Vite)...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting up!
echo.
echo 🌐 URLs:
echo    Backend API: http://localhost:8000
echo    Frontend:    http://localhost:5173
echo.
echo 📝 Logs will appear in separate windows
echo 🛑 Close the windows to stop the servers
echo.
pause
