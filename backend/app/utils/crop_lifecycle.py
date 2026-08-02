"""Crop lifecycle computation utilities."""

from datetime import date, datetime


# Generic crop growth stages (days after sowing)
STAGES = [
    (15, "Germination", "Monitor soil moisture daily"),
    (45, "Vegetative Growth", "Apply nitrogen fertilizer"),
    (75, "Flowering", "Check for pest activity"),
    (100, "Fruiting / Grain Filling", "Ensure adequate irrigation"),
    (9999, "Harvest Ready", "Plan harvest and storage"),
]


def _as_date(value: date | datetime | str) -> date:
    if isinstance(value, date) and not isinstance(value, datetime):
        return value
    if isinstance(value, datetime):
        return value.date()
    return date.fromisoformat(value)


def days_since_sowing(sowing_date: date | datetime | str) -> int:
    """Return number of days elapsed since sowing."""
    sowing_date = _as_date(sowing_date)
    today = date.today()
    delta = today - sowing_date
    return max(delta.days, 0)


def get_crop_stage(days: int) -> dict:
    """
    Determine current growth stage and next upcoming task.
    Returns stage name, next task, and days until next task.
    """
    current_stage = STAGES[-1][1]
    next_task = "Prepare for harvest"
    days_until_task = 0

    for threshold, stage_name, task in STAGES:
        if days < threshold:
            current_stage = stage_name
            days_until_task = threshold - days
            next_task = task
            break

    return {
        "current_stage": current_stage,
        "days_since_sowing": days,
        "next_task": next_task,
        "days_until_task": days_until_task,
    }


def get_lifecycle_timeline(sowing_date: date | datetime | str) -> list[dict]:
    """Build a calendar timeline of crop stages from sowing date."""
    from datetime import timedelta

    sowing_date = _as_date(sowing_date)
    timeline = []
    prev_day = 0

    for threshold, stage_name, task in STAGES:
        stage_start = sowing_date + timedelta(days=prev_day)
        stage_end = sowing_date + timedelta(days=min(threshold - 1, 120))
        days = days_since_sowing(sowing_date)
        is_current = prev_day <= days < threshold

        timeline.append({
            "stage": stage_name,
            "task": task,
            "start_date": stage_start.isoformat(),
            "end_date": stage_end.isoformat(),
            "is_current": is_current,
            "is_completed": days >= threshold,
        })
        prev_day = threshold

    return timeline


def derive_insights(profile: dict) -> dict:
    """
    Derive simple insight indicators from farmer profile fields.
    ML-based scores return null until models are connected.
    """
    water = profile.get("water_availability", "").lower()

    # Weather risk derived from water availability (real profile data)
    weather_risk_map = {"low": "High", "medium": "Medium", "high": "Low"}
    weather_risk = weather_risk_map.get(water, None)

    return {
        "crop_health_score": None,       # Requires ML / sensor data
        "weather_risk": weather_risk,
        "disease_risk": None,            # Requires disease detection module
        "expected_yield": None,          # Requires yield prediction module
        "estimated_profit": None,        # Requires profit module
    }
