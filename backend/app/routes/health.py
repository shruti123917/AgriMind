"""
Health check endpoint — useful for verifying backend is running.
"""

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "AgriMind AI API",
        "version": "1.0.0",
    }
