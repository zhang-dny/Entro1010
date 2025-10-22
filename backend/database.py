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
    tags = Column(Text)  # JSON string for tags
    distance = Column(Float, nullable=False, default=0.0)  # Distance in miles
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
                images='["/macbooksampleimage.jpg"]',
                tags='["💻 Electronics", "💻 Laptop", "💻 Apple"]',
                distance=0.3
            ),
            ItemModel(
                id="item_2",
                title="Comfortable 3-Seat Couch",
                description="Perfect for dorm room or apartment! This cozy couch is great for studying, watching movies, or relaxing. Light gray fabric with removable cushions. Some minor wear but very comfortable.",
                price=150.00,
                category="Furniture",
                condition="good",
                seller_id="user_2",
                seller_name="Sarah Johnson",
                images='["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"]',
                tags='["🪑 Furniture", "🪑 Couch", "🪑 Living Room"]',
                distance=1.2
            ),
            ItemModel(
                id="item_3",
                title="Calculus: Early Transcendentals (8th Edition)",
                description="Used textbook for MATH 1310. Book is in good condition with some highlighting and notes in pencil. Perfect for students taking calculus courses. No missing pages or major damage.",
                price=85.00,
                category="Textbooks",
                condition="good",
                seller_id="user_3",
                seller_name="Michael Rodriguez",
                images='["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"]',
                tags='["📚 Textbooks", "📚 Math", "📚 Calculus"]',
                distance=0.8
            ),
            ItemModel(
                id="item_4",
                title="UVA Cavaliers Hoodie (Large)",
                description="Official UVA hoodie in navy blue. Size Large, worn only a few times. Perfect condition with no stains or tears. Great for game days or just staying warm around campus. Still has tags!",
                price=45.00,
                category="Clothing",
                condition="like-new",
                seller_id="user_4",
                seller_name="Emma Thompson",
                images='["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop"]',
                tags='["👕 Clothing", "👕 UVA", "👕 Hoodie"]',
                distance=2.1
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
