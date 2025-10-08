from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="MVP Backend API",
    description="A simple backend for MVP functionality",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class ButtonClickRequest(BaseModel):
    button_id: str
    action: str
    data: Optional[Dict[str, Any]] = None

class ButtonClickResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None

class HealthResponse(BaseModel):
    status: str
    message: str

# In-memory storage for demo purposes
button_clicks = []
user_data = {}

# Routes
@app.get("/", response_model=HealthResponse)
async def root():
    """Health check endpoint"""
    return HealthResponse(status="healthy", message="MVP Backend is running!")

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(status="healthy", message="Backend is operational")

@app.post("/api/button-click", response_model=ButtonClickResponse)
async def handle_button_click(request: ButtonClickRequest):
    """Handle button click events from frontend"""
    try:
        # Store the click event
        click_data = {
            "button_id": request.button_id,
            "action": request.action,
            "data": request.data,
            "timestamp": "2024-01-01T00:00:00Z"  # You can add proper timestamp handling
        }
        button_clicks.append(click_data)
        
        # Example business logic based on button action
        if request.action == "increment":
            counter = user_data.get("counter", 0)
            user_data["counter"] = counter + 1
            return ButtonClickResponse(
                success=True,
                message=f"Counter incremented to {user_data['counter']}",
                data={"counter": user_data["counter"]}
            )
        elif request.action == "reset":
            user_data["counter"] = 0
            return ButtonClickResponse(
                success=True,
                message="Counter reset to 0",
                data={"counter": 0}
            )
        else:
            return ButtonClickResponse(
                success=True,
                message=f"Button {request.button_id} clicked with action: {request.action}",
                data=request.data
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/button-clicks")
async def get_button_clicks():
    """Get all button click history"""
    return {"clicks": button_clicks, "total": len(button_clicks)}

@app.get("/api/user-data")
async def get_user_data():
    """Get current user data"""
    return user_data

@app.post("/api/user-data")
async def update_user_data(data: Dict[str, Any]):
    """Update user data"""
    user_data.update(data)
    return {"message": "User data updated", "data": user_data}

@app.delete("/api/reset")
async def reset_all_data():
    """Reset all data (useful for testing)"""
    global button_clicks, user_data
    button_clicks = []
    user_data = {}
    return {"message": "All data reset successfully"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
