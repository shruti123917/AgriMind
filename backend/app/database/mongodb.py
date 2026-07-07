"""
MongoDB connection using Motor (async driver for FastAPI).
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.config import settings

# Global client instance — created on startup, closed on shutdown
client: AsyncIOMotorClient | None = None


async def connect_to_mongo() -> None:
    """Connect to MongoDB when the FastAPI app starts."""
    global client
    client = AsyncIOMotorClient(settings.mongodb_url)
    # Ping to verify connection
    await client.admin.command("ping")
    print(f"Connected to MongoDB: {settings.database_name}")


async def close_mongo_connection() -> None:
    """Close MongoDB connection when the app shuts down."""
    global client
    if client:
        client.close()
        client = None
        print("MongoDB connection closed.")


def get_database() -> AsyncIOMotorDatabase:
    """Return the active database instance for route handlers."""
    if client is None:
        raise RuntimeError("MongoDB is not connected. Call connect_to_mongo() first.")
    return client[settings.database_name]
