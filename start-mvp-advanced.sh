#!/bin/bash
# combined logging launcher for mac
# starts both servers and shows logs in one terminal

echo "starting cavaliermarket mvp with combined logging..."
echo ""

# create temp files for logs
BACKEND_LOG="backend.log"
FRONTEND_LOG="frontend.log"

# start backend with logging
echo "starting backend server..."
cd backend
python -m uvicorn main:app --reload --port 8000 > ../$BACKEND_LOG 2>&1 &
BACKEND_PID=$!
cd ..

# wait a moment
sleep 3

# start frontend with logging
echo "starting frontend server..."
cd frontend
npm run dev > ../$FRONTEND_LOG 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "both servers are starting up"
echo ""
echo "urls:"
echo "   backend: http://localhost:8000"
echo "   frontend: http://localhost:5173"
echo ""
echo "monitoring logs..."
echo "press ctrl+c to stop all servers"
echo ""

# function to cleanup on exit
cleanup() {
    echo ""
    echo "stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    
    # clean up log files
    rm -f $BACKEND_LOG
    rm -f $FRONTEND_LOG
    
    echo "cleanup complete"
    exit 0
}

# trap ctrl+c
trap cleanup SIGINT

# monitor logs
while true; do
    if [ -f "$BACKEND_LOG" ]; then
        BACKEND_LINE=$(tail -n 1 "$BACKEND_LOG" 2>/dev/null)
        if [ ! -z "$BACKEND_LINE" ]; then
            echo "[backend] $BACKEND_LINE"
        fi
    fi
    
    if [ -f "$FRONTEND_LOG" ]; then
        FRONTEND_LINE=$(tail -n 1 "$FRONTEND_LOG" 2>/dev/null)
        if [ ! -z "$FRONTEND_LINE" ]; then
            echo "[frontend] $FRONTEND_LINE"
        fi
    fi
    
    sleep 2
done
