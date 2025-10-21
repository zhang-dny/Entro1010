# combined logging launcher
# starts both servers and shows logs in one window

Write-Host "starting cavaliermarket mvp with combined logging..." -ForegroundColor Green
Write-Host ""

# create temp files for logs
$backendLog = "backend.log"
$frontendLog = "frontend.log"

# start backend with logging
function Start-BackendWithLogging {
    Write-Host "starting backend server..." -ForegroundColor Cyan
    Set-Location backend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn main:app --reload --port 8000 2>&1 | Tee-Object -FilePath '../$backendLog'" -WindowStyle Hidden
    Set-Location ..
}

# start frontend with logging
function Start-FrontendWithLogging {
    Write-Host "starting frontend server..." -ForegroundColor Magenta
    Set-Location frontend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev 2>&1 | Tee-Object -FilePath '../$frontendLog'" -WindowStyle Hidden
    Set-Location ..
}

# run both
Start-BackendWithLogging
Start-Sleep -Seconds 3
Start-FrontendWithLogging

Write-Host ""
Write-Host "both servers are starting up" -ForegroundColor Green
Write-Host ""
Write-Host "urls:" -ForegroundColor Yellow
Write-Host "   backend: http://localhost:8000" -ForegroundColor White
Write-Host "   frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "monitoring logs..." -ForegroundColor Gray
Write-Host "press ctrl+c to stop all servers" -ForegroundColor Gray
Write-Host ""

# Monitor logs
try {
    while ($true) {
        if (Test-Path $backendLog) {
            $backendContent = Get-Content $backendLog -Tail 5 -ErrorAction SilentlyContinue
            if ($backendContent) {
                Write-Host "[backend] " -ForegroundColor Cyan -NoNewline
                Write-Host $backendContent[-1] -ForegroundColor White
            }
        }
        
        if (Test-Path $frontendLog) {
            $frontendContent = Get-Content $frontendLog -Tail 5 -ErrorAction SilentlyContinue
            if ($frontendContent) {
                Write-Host "[frontend] " -ForegroundColor Magenta -NoNewline
                Write-Host $frontendContent[-1] -ForegroundColor White
            }
        }
        
        Start-Sleep -Seconds 2
    }
} catch {
    Write-Host ""
    Write-Host "stopping servers..." -ForegroundColor Red
    
    # clean up log files
    if (Test-Path $backendLog) { Remove-Item $backendLog }
    if (Test-Path $frontendLog) { Remove-Item $frontendLog }
    
    Write-Host "cleanup complete" -ForegroundColor Green
}
