import pandas as pd

def build_prompt(row):
    """
    Returns the prompt we'll send to the LLM in order to label the data as healthy or unhealthy.
    """
    return f"""
        Label this recipe as healthy or not.
        
        Title: {row.recipe_title}
        Ingredients: {row.ingredients}
        
        Return ONLY valid JSON.
        Do not use markdown.
        Do not include any text before or after the JSON.
        Reason must be at most 8 words.
        
        Format:
        {{"healthy":"yes"or"no","confidence":from0.0to1.0,"reason":"short explanation"}}
    """.strip()