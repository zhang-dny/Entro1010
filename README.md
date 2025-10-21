## ENTP 1010 MVP

- Utilizes TypeScript frontend built on Lovable and a FastAPI/Uvicorn backend for an MVP

### Frontend Documentation
**Tech Stack:** TypeScript, React, Vite, Tailwind CSS, Radix UI, React Query

### Backend Documentation

**Tech Stack:** FastAPI, Uvicorn, SQLite, SQLAlchemy

### Features
- Browse marketplace items with images and details
- View individual item detail pages
- Track item views in database
- Responsive design for mobile and desktop
- Real-time data from backend API

### API Endpoints
- `GET /api/store` - Get all items and categories
- `GET /api/item/{id}` - Get specific item details
- `POST /api/item/view` - Track item view
- `GET /api/categories` - Get all categories
- `DELETE /api/reset` - Reset database (for testing)

### Running the Application

**Option 1: Launcher Scripts**

Windows:
- PowerShell: Right-click `start-mvp.ps1` → "Run with PowerShell"
- Batch file: Double-click `start-mvp.bat`
- Advanced logging: Right-click `start-mvp-advanced.ps1` → "Run with PowerShell"

Mac/Linux:
- Make scripts executable: `chmod +x start-mvp.sh start-mvp-advanced.sh`
- Run simple version: `./start-mvp.sh`
- Run advanced version: `./start-mvp-advanced.sh`

**Option 2: Manual**
1. Backend: `cd backend && python -m uvicorn main:app --reload --port 8000`
2. Frontend: `cd frontend && npm run dev`
3. Visit: http://localhost:5173

### Project Structure
```
backend/
├── main.py          # FastAPI app and routes
├── database.py      # Database models and setup
└── requirements.txt # Python dependencies

frontend/
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom hooks
│   ├── services/    # API client
│   └── types/       # TypeScript interfaces
├── public/          # Static assets
└── package.json     # Node dependencies
``` 