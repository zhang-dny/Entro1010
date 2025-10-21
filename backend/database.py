# database configuration and models
from sqlalchemy import create_engine, Column, String, Float, DateTime, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime, timezone
import os

# database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./swap_platform.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# database models
class ItemModel(Base):
    __tablename__ = "items"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    seller_id = Column(String, nullable=False)
    seller_name = Column(String, nullable=False)
    images = Column(Text)  # JSON string for simplicity
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class ItemViewModel(Base):
    __tablename__ = "item_views"
    
    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(String, nullable=False)
    user_id = Column(String, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

# database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# database initialization
def init_db():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)

def seed_sample_data():
    """seed database with sample data"""

    # TODO: replace with MVP data
    
    db = SessionLocal()
    try:
        # check if data already exists
        if db.query(ItemModel).count() > 0:
            print("Sample data already exists, skipping seed")
            return
        
        sample_items = [
            ItemModel(
                id="item_1",
                title="MacBook Pro 13-inch",
                description="2020 MacBook Pro in excellent condition. Used for coding projects.",
                price=1200.00,
                category="Electronics",
                condition="good",
                seller_id="user_1",
                seller_name="Alex Chen",
                images='["/macbooksampleimage.jpg"]'
            )
        ]
        
        for item in sample_items:
            db.add(item)
        
        db.commit()
        print("Sample data seeded successfully")
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()
