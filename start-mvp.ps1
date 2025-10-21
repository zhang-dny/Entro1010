# start both frontend and backend
# simple script to get everything running

Write-Host "starting cavaliermarket mvp..." -ForegroundColor Green
Write-Host ""

# start backend
function Start-Backend {
    Write-Host "starting backend server..." -ForegroundColor Cyan
    Set-Location backend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn main:app --reload --port 8000" -WindowStyle Normal
    Set-Location ..
}

# start frontend
function Start-Frontend {
    Write-Host "starting frontend server..." -ForegroundColor Magenta
    Set-Location frontend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
    Set-Location ..
}

# run both
Start-Backend
Start-Sleep -Seconds 2
Start-Frontend

Write-Host ""
Write-Host "backend and frontend are running..." -ForegroundColor Green
Write-Host ""
Write-Host "urls:" -ForegroundColor Yellow
Write-Host "   backend: http://localhost:8000" -ForegroundColor White
Write-Host "   frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "logs will show in separate windows" -ForegroundColor Gray
Write-Host "close the windows to stop the servers" -ForegroundColor Gray
Write-Host ""
Write-Host "press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
