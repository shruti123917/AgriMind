# AgriMind AI

**AI-based Smart Farming Assistant** — A final-year Computer Engineering project that helps farmers make better crop decisions using machine learning and data analysis.

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js, Tailwind CSS, Recharts    |
| Backend    | Python FastAPI                      |
| Database   | MongoDB (Motor async driver)        |
| ML         | Python, Pandas, Scikit-learn        |

## Project Structure

```
AgriMind/
├── frontend/                 # React dashboard (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI & layout
│   │   ├── pages/            # Dashboard pages (one per feature)
│   │   └── services/         # API calls to backend
│   └── package.json
├── backend/                  # FastAPI server
│   ├── app/
│   │   ├── main.py           # App entry point
│   │   ├── config.py         # Environment settings
│   │   ├── database/         # MongoDB connection
│   │   ├── models/           # Pydantic data models
│   │   └── routes/           # API endpoints
│   ├── ml/                   # ML models & training scripts
│   └── requirements.txt
└── README.md
```

## Features (Build Phases)

| Phase | Feature                  | Status        |
|-------|--------------------------|---------------|
| 1     | Foundation + Dashboard   | ✅ Done       |
| 2     | Crop Recommendation (ML) | 🔜 Next       |
| 3     | Yield + Profit Modules   | Planned       |
| 4     | Risk Analysis            | Planned       |
| 5     | What-If Simulator        | Planned       |
| 6     | AI Farming Assistant     | Planned       |

## Getting Started

### Prerequisites

- **Node.js** 20+ and npm
- **Python** 3.10+
- **MongoDB** running locally (or MongoDB Atlas connection string)

### 1. Start MongoDB

```bash
# If installed locally, MongoDB usually runs on port 27017
mongod
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env        # Edit MONGODB_URL if needed
uvicorn app.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Dashboard available at: http://localhost:5173

## API Endpoints (Phase 1)

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | `/health`                   | Health check             |
| POST   | `/api/farmer/profile`       | Create farmer profile    |
| GET    | `/api/farmer/profile/{id}`  | Get profile by ID        |
| GET    | `/api/farmer/profiles`      | List all profiles        |
| PUT    | `/api/farmer/profile/{id}`  | Update profile           |

## Next Steps (Phase 2)

1. Download the **Crop Recommendation Dataset** (N, P, K, temp, humidity, pH, rainfall → crop)
2. Train a Scikit-learn classifier in `backend/ml/`
3. Save the model as a `.pkl` file
4. Create `/api/recommend` endpoint
5. Build the recommendation form UI with results display

## License

MIT
