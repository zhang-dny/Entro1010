@echo off
REM Start script for the MVP backend (Windows)

echo Starting MVP Backend...
echo Installing dependencies...
pip install -r requirements.txt

echo Starting server on http://localhost:8000
echo API documentation available at http://localhost:8000/docs
python main.py
