from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import uvicorn
import os
from datetime import datetime, timezone
from dotenv import load_dotenv
from sqlalchemy.orm import Session
import json
from database import get_db, init_db, seed_sample_data, ItemModel, ItemViewModel

load_dotenv()

# TODO: test backend locally with uvicorn

# init FastAPI
app = FastAPI(
    title="ENTP 1010 MVP Backend API",
    description="Uvicorn/FastAPI backend for ENTP 1010 MVP",
    version="0.0.1"
)

"""
CORS Middleware Config:

In prod:
   - harden allowed origins and other config
   - add URL to allowed origins
   - pentest for vulnerabilities like CSRF, XSS, etc...

In dev:
    - allow all origins

"""
app.add_middleware(  
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================== pydantic models =============================================== 
class Item(BaseModel):
    id: str
    title: str
    description: str
    price: float
    category: str
    condition: str
    seller_id: str
    seller_name: str
    images: Optional[List[str]] = []
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True

class ItemViewRequest(BaseModel):
    item_id: str
    user_id: Optional[str] = None

class ItemViewResponse(BaseModel):
    success: bool
    message: str
    item: Optional[Item] = None

class StorePageResponse(BaseModel):
    success: bool
    items: List[Item]
    total_items: int
    categories: List[str]

class HealthResponse(BaseModel):
    status: str
    message: str

# =============================================== database initialization =============================================== 
@app.on_event("startup")
async def startup_event():
    """Initialize database and seed sample data on startup"""
    init_db()
    seed_sample_data()

# =============================================== helper functions =============================================== 
def convert_db_item_to_pydantic(db_item: ItemModel) -> Item:
    """Convert database item to Pydantic model"""
    return Item(
        id=db_item.id,
        title=db_item.title,
        description=db_item.description,
        price=db_item.price,
        category=db_item.category,
        condition=db_item.condition,
        seller_id=db_item.seller_id,
        seller_name=db_item.seller_name,
        images=json.loads(db_item.images) if db_item.images else [],
        created_at=db_item.created_at.isoformat(),
        updated_at=db_item.updated_at.isoformat()
    )

# =============================================== routing ===============================================
@app.get("/", response_model=HealthResponse)
async def root():
    """health check"""
    return HealthResponse(status="healthy", message="backend healthy")

@app.get("/api/store", response_model=StorePageResponse)
async def get_store_page(db: Session = Depends(get_db)):
    """get store page with all items"""
    try:
        db_items = db.query(ItemModel).all()
        items = [convert_db_item_to_pydantic(item) for item in db_items]
        categories = list(set(item.category for item in db_items))
        
        return StorePageResponse(
            success=True,
            items=items,
            total_items=len(items),
            categories=categories
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/item/view", response_model=ItemViewResponse)
async def view_item(request: ItemViewRequest, db: Session = Depends(get_db)):
    """handle item click/view - navigate to item page"""
    try:
        # Find the item in database
        db_item = db.query(ItemModel).filter(ItemModel.id == request.item_id).first()
        
        if not db_item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        # Track the view in database
        view_record = ItemViewModel(
            item_id=request.item_id,
            user_id=request.user_id,
            timestamp=datetime.now(timezone.utc)
        )
        db.add(view_record)
        db.commit()
        
        item = convert_db_item_to_pydantic(db_item)
        
        return ItemViewResponse(
            success=True,
            message=f"Viewing item: {item.title}",
            item=item
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/item/{item_id}", response_model=ItemViewResponse)
async def get_item(item_id: str, db: Session = Depends(get_db)):
    """get specific item details"""
    try:
        db_item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
        
        if not db_item:
            raise HTTPException(status_code=404, detail="Item not found")
        
        item = convert_db_item_to_pydantic(db_item)
        
        return ItemViewResponse(
            success=True,
            message=f"Item details for: {item.title}",
            item=item
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/item-views")
async def get_item_views(db: Session = Depends(get_db)):
    """get all item view history"""
    views = db.query(ItemViewModel).all()
    view_data = [
        {
            "id": view.id,
            "item_id": view.item_id,
            "user_id": view.user_id,
            "timestamp": view.timestamp.isoformat()
        }
        for view in views
    ]
    return {"views": view_data, "total": len(view_data)}

@app.get("/api/categories")
async def get_categories(db: Session = Depends(get_db)):
    """get all available categories"""
    db_items = db.query(ItemModel).all()
    categories = list(set(item.category for item in db_items))
    return {"categories": categories}

@app.get("/api/items/category/{category}")
async def get_items_by_category(category: str, db: Session = Depends(get_db)):
    """get items filtered by category"""
    db_items = db.query(ItemModel).filter(ItemModel.category.ilike(f"%{category}%")).all()
    items = [convert_db_item_to_pydantic(item) for item in db_items]
    return {"items": items, "total": len(items)}

@app.delete("/api/reset")
async def reset_all_data(db: Session = Depends(get_db)):
    """reset all data (useful for testing)"""
    try:
        # Clear all data
        db.query(ItemViewModel).delete()
        db.query(ItemModel).delete()
        db.commit()
        
        # Re-seed sample data
        seed_sample_data()
        
        return {"message": "All data reset successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
