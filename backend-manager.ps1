# ============================================
# BACKEND MANAGEMENT SCRIPT
# Sử dụng để quản lý Docker Compose
# ============================================

$BACKEND_PATH = "d:\My_documents\Workspace\ĐACN_251\backend\ecommerce"

function Show-Menu {
    Write-Host "
╔════════════════════════════════════════╗
║  BACKEND MANAGEMENT MENU               ║
╚════════════════════════════════════════╝
" -ForegroundColor Cyan
    Write-Host "1. Start                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Backend (Build + Run)"
    Write-Host "2. Start Backend (Without rebuild)"
    Write-Host "3. Stop Backend"
    Write-Host "4. Restart Backend"
    Write-Host "5. View Logs (Real-time)"
    Write-Host "6. Clean & Rebuild (Remove volumes)"
    Write-Host "7. Check Database"
    Write-Host "8. Check API Health"
    Write-Host "9. Exit"
    Write-Host ""
}

function Start-Backend {
    param([bool]$rebuild = $true)
    
    Write-Host "🚀 Starting Backend..." -ForegroundColor Green
    Set-Location $BACKEND_PATH
    
    if ($rebuild) {
        Write-Host "📦 Building Docker image..." -ForegroundColor Yellow
        docker-compose up --build
    } else {
        Write-Host "▶️  Running without rebuild..." -ForegroundColor Yellow
        docker-compose up
    }
}

function Stop-Backend {
    Write-Host "🛑 Stopping Backend..." -ForegroundColor Red
    Set-Location $BACKEND_PATH
    docker-compose down
    Write-Host "✅ Backend stopped" -ForegroundColor Green
}

function Restart-Backend {
    Write-Host "🔄 Restarting Backend..." -ForegroundColor Yellow
    Set-Location $BACKEND_PATH
    docker-compose restart ecommerce-app
    Write-Host "✅ Backend restarted" -ForegroundColor Green
}

function View-Logs {
    Write-Host "📋 Showing real-time logs (Press Ctrl+C to stop)..." -ForegroundColor Yellow
    Set-Location $BACKEND_PATH
    docker-compose logs -f ecommerce-app
}

function Clean-Rebuild {
    Write-Host "🧹 Cleaning up and rebuilding..." -ForegroundColor Red
    Set-Location $BACKEND_PATH
    
    $confirm = Read-Host "This will remove volumes. Continue? (y/n)"
    if ($confirm -eq "y") {
        docker-compose down -v
        Write-Host "✅ Volumes removed" -ForegroundColor Green
        Start-Backend -rebuild $true
    } else {
        Write-Host "❌ Cancelled" -ForegroundColor Yellow
    }
}

function Check-Database {
    Write-Host "📊 Connecting to Database..." -ForegroundColor Yellow
    Write-Host "Command: SELECT * FROM category;" -ForegroundColor Cyan
    
    Set-Location $BACKEND_PATH
    docker exec -it postgres-db psql -U admin -d ecommerce_db -c "SELECT * FROM category;"
}

function Check-Health {
    Write-Host "🏥 Checking API Health..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/api/categories" -Method GET -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ API is RUNNING on port 8080" -ForegroundColor Green
            Write-Host "📍 Database is CONNECTED" -ForegroundColor Green
        }
    } catch {
        Write-Host "❌ API is NOT RUNNING" -ForegroundColor Red
        Write-Host "💡 Start backend with: docker-compose up" -ForegroundColor Yellow
    }
}

# Main Loop
while ($true) {
    Show-Menu
    $choice = Read-Host "Select option"
    
    switch ($choice) {
        1 { Start-Backend -rebuild $true }
        2 { Start-Backend -rebuild $false }
        3 { Stop-Backend }
        4 { Restart-Backend }
        5 { View-Logs }
        6 { Clean-Rebuild }
        7 { Check-Database }
        8 { Check-Health }
        9 { 
            Write-Host "👋 Goodbye!" -ForegroundColor Green
            exit
        }
        default { Write-Host "❌ Invalid choice" -ForegroundColor Red }
    }
    
    Write-Host ""
    Read-Host "Press Enter to continue"
    Clear-Host
}
