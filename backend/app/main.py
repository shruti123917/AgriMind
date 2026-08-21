"""
AgriMind AI — FastAPI Application Entry Point

Run with:
    uvicorn app.main:app --reload --port 8000
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.mongodb import connect_to_mongo, close_mongo_connection
from app.routes import (
    health,
    farmer,
    dashboard,
    recommendation,
    yield_prediction,
    weather,
)
from app.routes.disease_detection import router as disease_router
from app.routes import history
from app.routes import analytics
from app.routes import ai_assistant

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: connect MongoDB. Shutdown: close connection."""
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title="AgriMind AI",
    description="AI-based Smart Farming Assistant API",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow React frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(health.router)
app.include_router(farmer.router)
app.include_router(dashboard.router)
app.include_router(recommendation.router)
app.include_router(yield_prediction.router)
app.include_router(weather.router)
app.include_router(
    disease_router,
    prefix="/api",
    tags=["Disease Detection"]
)
app.include_router(history.router)
app.include_router(analytics.router)
app.include_router(ai_assistant.router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to AgriMind AI API",
        "docs": "/docs",
        "health": "/health",
    }
