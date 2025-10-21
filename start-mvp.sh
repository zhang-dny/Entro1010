#!/bin/bash
# start both frontend and backend
# simple script to get everything running

echo "starting cavaliermarket mvp..."
echo ""

# start backend
echo "starting backend server..."
cd backend
python -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# wait a moment
sleep 2

# start frontend
echo "starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "backend and frontend are running..." -ForegroundColor Green
echo ""
echo "urls:"
echo "   backend: http://localhost:8000"
echo "   frontend: http://localhost:5173"
echo ""
echo "logs will show in this terminal"
echo "press ctrl+c to stop all servers"
echo ""

# function to cleanup on exit
cleanup() {
    echo ""
    echo "stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "cleanup complete"
    exit 0
}

# trap ctrl+c
trap cleanup SIGINT

# wait for processes
wait
