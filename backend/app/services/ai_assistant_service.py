import os
import requests
from dotenv import load_dotenv

from app.services.farmer_service import get_farmer_profile
from app.services.history_service import get_disease_history

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


async def build_context(profile_id: str):

    profile = await get_farmer_profile(profile_id)

    history = await get_disease_history()

    latest_disease = history[0] if history else None

    return profile, latest_disease


async def ask_ai(
    question: str,
    profile_id: str,
):

    profile, disease = await build_context(
        profile_id
    )

    context = f"""
Farmer Profile:

Name: {profile.name}
Village: {profile.village}
District: {profile.district}
State: {profile.state}
Farm Size: {profile.farm_size} acres
Soil Type: {profile.soil_type}
Current Crop: {profile.current_crop}
Water Availability: {profile.water_availability}
"""

    if disease:

        context += f"""

Latest Disease Detection:

Disease: {disease['disease']}
Confidence: {disease['confidence']}
Recommendation:
{disease['recommendation']}
"""

    prompt = f"""
You are AgriMind AI.

You are an expert agricultural advisor helping Indian farmers.

Use the farmer information below while answering.

{context}

Question:
{question}

Provide:
1. Explanation
2. Causes
3. Recommendations
4. Precautions

Keep answers practical for Indian farmers.
"""

    response = requests.post(
        OPENROUTER_URL,
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "meta-llama/llama-3.1-8b-instruct",
            "messages": [
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        },
        timeout=60,
    )

    print("STATUS:", response.status_code)
    print("RESPONSE:", response.text)

    if response.status_code != 200:
        return f"AI Service Error: {response.text}"

    data = response.json()

    return data["choices"][0]["message"]["content"]