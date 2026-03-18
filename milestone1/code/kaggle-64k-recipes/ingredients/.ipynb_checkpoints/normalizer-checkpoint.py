import re
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from .constants import SYNONYMS, NOISE_PHRASES, UNITS, PREP_DESCRIPTORS, TO_DISCARD

try:
    nltk.data.find("corpora/wordnet")
except LookupError:
    nltk.download("wordnet", quiet=True)

try:
    nltk.data.find("taggers/averaged_perceptron_tagger")
except LookupError:
    nltk.download("averaged_perceptron_tagger", quiet=True)

try:
    nltk.data.find("taggers/averaged_perceptron_tagger_eng")
except LookupError:
    nltk.download("averaged_perceptron_tagger_eng", quiet=True)

_lemmatizer = WordNetLemmatizer()

def _treebank_pos_to_wordnet(treebank_tag):
    """
    Convert a Penn Treebank POS tag to a WordNet POS constant.
    """
    if treebank_tag.startswith("J"):
        return wordnet.ADJ
    if treebank_tag.startswith("V"):
        return wordnet.VERB
    if treebank_tag.startswith("R"):
        return wordnet.ADV
    return wordnet.NOUN 

def _lemmatize_phrase(phrase):
    """
    Lemmatize each token in a phrase using its POS tag for accuracy.
    For example 'eggs' becomes 'egg'
    """
    tokens = phrase.split()
    tagged = nltk.pos_tag(tokens)
    lemmatized = [
        _lemmatizer.lemmatize(word, pos=_treebank_pos_to_wordnet(tag))
        for word, tag in tagged
    ]
    return " ".join(lemmatized)

def _split_on_and(ingredient):
    """
    Split entries like 'salt and black pepper' into ['salt', 'black pepper']. 
    """
    parts = re.split(r"\band\b", ingredient)
    return [p.strip() for p in parts if p.strip()]


def normalize_ingredient(raw):
    """
    Normalize a single raw ingredient string to a clean, canonical form
    suitable for nutritional analysis.
    """
    ingredient = raw.lower().strip()

    # Remove parenthetical notes
    ingredient = re.sub(r"\(.*?\)", " ", ingredient)

    # Normalize apostrophes
    ingredient = ingredient.replace("\u2019", "'").replace("`", "'").replace("'", " ")

    # Remove noise phrases
    for phrase in sorted(NOISE_PHRASES, key=len, reverse=True):
        ingredient = re.sub(rf"\b{re.escape(phrase)}\b", " ", ingredient)

    # Remove quantities
    ingredient = re.sub(r"\b\d+\s*/\s*\d+\b", " ", ingredient)  
    ingredient = re.sub(r"\b\d+(\.\d+)?\b", " ", ingredient)    

    # Replace remaining punctuation with spaces
    ingredient = re.sub(r"[^a-zA-Z\s]", " ", ingredient)

    # Normalize whitespace
    ingredient = re.sub(r"\s+", " ", ingredient).strip()

    if ingredient in SYNONYMS:
        return SYNONYMS[ingredient]

    # Remove units and preparation descriptors tokens
    tokens = [t for t in ingredient.split() if t not in UNITS and t not in PREP_DESCRIPTORS]
    ingredient = " ".join(tokens).strip()

    # Remove left "or"
    ingredient = re.sub(r"\bor\b$", "", ingredient).strip()

    # Safety check
    if ingredient in TO_DISCARD:
        return ""

    # Synonym lookup 
    ingredient = SYNONYMS.get(ingredient, ingredient)

    # Lemmatization ("black beans" to "black bean", "tomatoes" to "tomato")
    ingredient = _lemmatize_phrase(ingredient)

    # Whitespace cleanup
    ingredient = re.sub(r"\s+", " ", ingredient).strip()

    # Safety check
    if ingredient in TO_DISCARD:
        return ""

    return ingredient
