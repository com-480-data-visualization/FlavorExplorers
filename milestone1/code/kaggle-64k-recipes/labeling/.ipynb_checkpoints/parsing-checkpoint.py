import json

def parse_model_response(text):
    """
    Parse and validate the raw JSON string returned by the LLM.
    Expected format: 
    {"healthy": "yes"|"no", "confidence": 0.0–1.0, "reason": "..."}
    Returns: (healthy, confidence, reason)
    """
    text = text.strip()

    if not text.endswith("}"):
        raise ValueError(f"Truncated JSON response: {text}")

    data = json.loads(text)

    healthy = str(data["healthy"]).strip().lower()
    confidence = float(data["confidence"])
    reason = str(data["reason"]).strip()

    confidence = max(0.0, min(1.0, confidence))

    if healthy not in {"yes", "no"}:
        raise ValueError(f"Invalid healthy value: {healthy}")

    return healthy, confidence, reason