"""MongoDB connection helpers for the FastAPI app."""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.config import settings

client: AsyncIOMotorClient | None = None


async def connect_to_mongo() -> None:
    """Connect to MongoDB when the FastAPI app starts."""
    global client
    client = AsyncIOMotorClient(settings.mongodb_url)
    await client.admin.command("ping")


async def close_mongo_connection() -> None:
    """Close MongoDB connection when the app shuts down."""
    global client
    if client is not None:
        client.close()
        client = None


def get_database() -> AsyncIOMotorDatabase:
    """Return the active database instance for route handlers."""
    if client is None:
        raise RuntimeError("MongoDB is not connected. Call connect_to_mongo() first.")
    return client[settings.database_name]
