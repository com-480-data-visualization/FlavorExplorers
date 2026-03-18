import time
import random
import pandas as pd
from litellm import completion

from .config  import MISTRAL_API_KEY, MAX_RETRIES, SLEEP_BETWEEN_CALLS
from .prompts import build_prompt
from .parsing import parse_model_response

def get_healthy_status(row):
    """
    From the json given by the LLM, returns the healthy label, 
    the confidence and the reason.
    """
    for i in range(MAX_RETRIES):
        try:
            prompt = build_prompt(row)

            response = completion(
                model="mistral/mistral-small-latest",
                messages=[{"role": "user", "content": prompt}],
                api_key=MISTRAL_API_KEY,
                temperature=0,
                max_tokens=60,
                response_format={"type": "json_object"}
            )
            raw_text = response.choices[0].message.content
            healthy, confidence, reason = parse_model_response(raw_text)

            time.sleep(SLEEP_BETWEEN_CALLS)
            return healthy, confidence, reason, raw_text

        except Exception as e:
            wait_time = min((2 ** i) + random.random(), 20)
            print(f"Attempt {i+1} failed: {e}")
            time.sleep(wait_time)

    return "error", None, None, None
