# Database configuration and models
from sqlalchemy import create_engine, Column, String, Float, DateTime, Integer, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime, timezone
import os

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./swap_platform.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Database Models
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

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Database initialization
def init_db():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)

def seed_sample_data():
    """Seed database with sample data"""
    db = SessionLocal()
    try:
        # Check if data already exists
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
                images='["https://example.com/macbook1.jpg"]'
            ),
            ItemModel(
                id="item_2", 
                title="Calculus Textbook",
                description="Stewart Calculus 8th Edition, barely used",
                price=45.00,
                category="Textbooks",
                condition="like_new",
                seller_id="user_2",
                seller_name="Sarah Johnson",
                images='["https://example.com/calc_book.jpg"]'
            ),
            ItemModel(
                id="item_3",
                title="Coffee Maker",
                description="Keurig K-Elite, works perfectly",
                price=80.00,
                category="Appliances",
                condition="good",
                seller_id="user_3",
                seller_name="Mike Rodriguez",
                images='["https://example.com/coffee_maker.jpg"]'
            ),
            ItemModel(
                id="item_4",
                title="Bike Lock",
                description="Heavy duty U-lock, never used",
                price=25.00,
                category="Accessories",
                condition="new",
                seller_id="user_1",
                seller_name="Alex Chen",
                images='["https://example.com/bike_lock.jpg"]'
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
