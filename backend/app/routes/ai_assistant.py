from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_assistant_service import ask_ai

router = APIRouter(
    prefix="/api/ai-assistant",
    tags=["AI Assistant"]
)


class ChatRequest(BaseModel):
    question: str
    profile_id: str


@router.post("/chat")
async def chat(req: ChatRequest):

    answer = await ask_ai(
        req.question,
        req.profile_id
    )

    return {
        "answer": answer
    }