from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).parent
SOURCE = ROOT / "raw" / "LadyJuicing.md"
OUTPUT = ROOT / "sources"

INGREDIENTS = {
    "almonds": "almonds", "apple": "apple", "artichoke": "jerusalem-artichoke", "asparagus": "asparagus",
    "avocado": "avocado", "basil": "basil", "beetroot": "beetroot", "bell pepper": "bell-pepper", "apples": "apple",
    "broccoli": "broccoli", "buckwheat sprouts": "buckwheat-sprouts", "cabbage": "cabbage", "carrot": "carrot", "carrots": "carrot",
    "cauliflower": "cauliflower", "celery": "celery", "cherries": "cherries", "cilantro": "cilantro",
    "clover sprouts": "clover-sprouts", "coconut milk": "coconut-milk", "cranberries": "cranberries",
    "cucumber": "cucumber", "cumin": "cumin", "dandelion greens": "dandelion-greens", "daikon radish": "daikon-radish",
    "fennel": "fennel", "garlic": "garlic", "gingerroot": "gingerroot", "green apple": "apple",
    "green cabbage": "cabbage", "green powder": "green-powder", "grapefruit": "grapefruit", "hot sauce": "hot-sauce",
    "jicama": "jicama", "kale": "kale", "lemon": "lemon", "licorice tea": "licorice-tea", "lime": "lime",
    "lettuce": "lettuce", "mint": "mint", "nutmeg": "nutmeg", "onion": "onion", "parsley": "parsley", "parsnip": "parsnip",
    "pear": "pear", "radishes": "radishes", "radish": "radishes", "spinach": "spinach", "sprouts": "sprouts",
    "strawberries": "strawberries", "string beans": "string-beans", "sunflower sprouts": "sunflower-sprouts",
    "tomato": "tomato", "tomatoes": "tomato", "turnip": "turnip", "water": "water", "watercress": "watercress",
    "wheatgrass": "wheatgrass", "cinnamon": "cinnamon", "cloves": "cloves",
}

ITALIAN_INGREDIENTS = {
    "almonds": "mandorle", "apple": "mela", "jerusalem-artichoke": "topinambur", "asparagus": "asparagi",
    "avocado": "avocado", "basil": "basilico", "beetroot": "barbabietola", "bell-pepper": "peperone",
    "broccoli": "broccoli", "buckwheat-sprouts": "germogli di grano saraceno", "cabbage": "cavolo", "carrot": "carota",
    "cauliflower": "cavolfiore", "celery": "sedano", "cherries": "ciliegie", "cilantro": "coriandolo",
    "clover-sprouts": "germogli di trifoglio", "coconut-milk": "latte di cocco", "cranberries": "mirtilli rossi",
    "cucumber": "cetriolo", "cumin": "cumino", "dandelion-greens": "foglie di tarassaco", "daikon-radish": "ravanello daikon",
    "fennel": "finocchio", "garlic": "aglio", "gingerroot": "radice di zenzero", "green-powder": "polvere verde",
    "grapefruit": "pompelmo", "hot-sauce": "salsa piccante", "jicama": "jicama", "kale": "cavolo riccio", "lemon": "limone",
    "licorice-tea": "tisana alla liquirizia", "lime": "lime", "lettuce": "lattuga", "mint": "menta", "nutmeg": "noce moscata",
    "onion": "cipolla", "parsley": "prezzemolo", "parsnip": "pastinaca", "pear": "pera", "radishes": "ravanelli", "spinach": "spinaci",
    "sprouts": "germogli", "strawberries": "fragole", "string-beans": "fagiolini", "sunflower-sprouts": "germogli di girasole",
    "tomato": "pomodoro", "turnip": "rapa", "water": "acqua", "watercress": "crescione", "wheatgrass": "erba di grano",
    "cinnamon": "cannella", "cloves": "chiodi di garofano",
}

TITLE_IT = {
    "Afternoon Refresher": "Rinfrescante pomeridiano", "Allergy Relief": "Sollievo dalle allergie", "Antiulcer Cabbage Cocktail": "Cocktail di cavolo antiulcera",
    "Antiviral Cocktail": "Cocktail antivirale", "Awesome Green Smoothie": "Fantastico frullato verde", "Beautiful-Bone Solution": "Soluzione per ossa belle",
    "Beautiful-Skin Cocktail": "Cocktail per una pelle bella", "Beet-Cucumber Cleansing Cocktail": "Cocktail depurativo di barbabietola e cetriolo",
    "Bladder Tonic": "Tonico per la vescica", "Cabbage Patch Cocktail": "Cocktail di cavolo", "Calcium-Rich Cocktail": "Cocktail ricco di calcio",
    "Cherie’s Green Smoothie": "Frullato verde di Cherie", "Cherie’s Quick Energy Soup": "Vellutata energetica veloce di Cherie", "Colon Cleanser": "Depurativo del colon",
    "Cranberry-Apple Cocktail": "Cocktail di mirtilli rossi e mela", "Gallbladder-Liver Cleansing Cocktail": "Cocktail depurativo per cistifellea e fegato",
    "Gallbladder Rejuvenator": "Rinvigorente della cistifellea", "Garlic Surprise": "Sorpresa all’aglio", "The Ginger Hopper": "Il salto dello zenzero",
    "Ginger Twist": "Tocco di zenzero", "Gout-Fighting Tonic": "Tonico contro la gotta", "Happy Morning": "Buongiorno felice", "Healthy Lungs": "Polmoni sani",
    "Healthy-Sinus Solution": "Soluzione per seni nasali sani", "Hot Ginger-Lemon Tea": "Tè caldo allo zenzero e limone", "Icy Spicy Tomato": "Pomodoro fresco e speziato",
    "Immune Builder": "Rinforzo immunitario", "Jack & the Bean": "Jack e il fagiolo", "Liver Life Tonic": "Tonico per il fegato",
    "Magnesium-Rich Cocktail": "Cocktail ricco di magnesio", "Memory Mender": "Rinvigorente della memoria", "Mint Refresher": "Rinfrescante alla menta",
    "Mood Mender": "Rinvigorente dell’umore", "Morning Energizer": "Energizzante del mattino", "Natural Diuretic Cocktail": "Cocktail diuretico naturale",
    "Orient Express": "Orient Express", "Pancreas Helper": "Aiuto per il pancreas", "Peppy Parsley": "Prezzemolo vivace", "The Pink Onion": "La cipolla rosa",
    "Pure Green Sprout Drink": "Bevanda pura di germogli verdi", "Radish Care": "Cura del ravanello", "The Revitalizer": "Il rivitalizzante", "Salsa in a Glass": "Salsa nel bicchiere",
    "Sinus Solution": "Soluzione per i seni nasali", "Sleep Mender": "Rimedio per il sonno", "Spinach Power": "Potere degli spinaci", "Spring Tonic": "Tonico primaverile",
    "Sweet Dreams Nightcap": "Digestivo della buonanotte", "Super Green Sprout Drink": "Super bevanda di germogli verdi", "Sweet & Regular": "Dolce e semplice",
    "Thyroid Tonic": "Tonico per la tiroide", "Tomato Florentine": "Pomodoro alla fiorentina", "Triple C": "Tripla C", "Turnip Time": "È tempo di rape",
    "Veggie Delight": "Delizia vegetale", "Waldorf Twist": "Tocco Waldorf", "Weight-Loss Buddy": "Alleato per perdere peso", "Wheatgrass Light": "Leggerezza all’erba di grano",
}

TAG_IT = {"morning": "mattino", "afternoon": "pomeriggio", "sinus": "seni nasali", "liver": "fegato", "gallbladder": "cistifellea", "bladder": "vescica", "colon": "colon", "pancreas": "pancreas", "thyroid": "tiroide", "sleep": "sonno", "mood": "umore", "memory": "memoria", "bones": "ossa", "skin": "pelle", "immune": "immunità", "lungs": "polmoni", "weight": "peso", "gout": "gotta", "allergy": "allergie", "ulcer": "ulcera", "cleansing": "depurazione", "energy": "energia", "diuretic": "diuretico", "smoothie": "frullato", "tea": "tè", "soup": "zuppa", "sprouts": "germogli", "tomato": "pomodoro", "ginger": "zenzero", "green": "verde"}
TAG_WORDS = {key: key for key in TAG_IT}

CATEGORY_EMOJI = {"juice": "🧃", "smoothie": "🥤", "soup": "🍲", "tea": "🍵"}
INGREDIENT_EMOJI = {
    "almonds": "🥜", "apple": "🍎", "asparagus": "🌱", "avocado": "🥑", "basil": "🌿", "beetroot": "🥕",
    "bell-pepper": "🌶️", "broccoli": "🥦", "buckwheat-sprouts": "🌱", "cabbage": "🥬", "carrot": "🥕",
    "cauliflower": "🥦", "celery": "🥬", "cilantro": "🌿", "cinnamon": "🌿", "clover-sprouts": "🌱",
    "cloves": "🌿", "coconut-milk": "🥥", "cranberries": "🍒", "cucumber": "🥒", "cumin": "🌿",
    "daikon-radish": "🥕", "dandelion-greens": "🌿", "fennel": "🌿", "garlic": "🧄", "gingerroot": "🌿",
    "grapefruit": "🍊", "green-powder": "🌿", "hot-sauce": "🌶️", "jerusalem-artichoke": "🥕", "jicama": "🥕",
    "kale": "🥬", "lemon": "🍋", "lettuce": "🥬", "licorice-tea": "🍵", "lime": "🍋", "mint": "🌿",
    "nutmeg": "🌰", "onion": "🧅", "parsley": "🌿", "parsnip": "🥕", "pear": "🍐", "radishes": "🥕",
    "spinach": "🌿", "sprouts": "🌱", "strawberries": "🍓", "string-beans": "🌱", "sunflower-sprouts": "🌱",
    "tomato": "🍅", "turnip": "🥕", "water": "💧", "watercress": "🌿", "wheatgrass": "🌿",
}

UI_EN = {
    "pageTitle": "Recipes", "languageLabel": "Language", "categoryPrompt": "I want to make a", "allCategories": "All categories",
    "haveIngredients": "I want to cook with", "clearFilters": "Clear filters", "missingIngredients": "Ingredients I don't have", "loading": "Loading recipes...",
    "ingredients": "Ingredients", "preparation": "Preparation", "tags": "Tags", "missing": "For this recipe you are missing",
    "ready": "You are set for this recipe.", "noMatch": "No recipes match these filters.", "recipe": "recipe", "recipes": "recipes",
    "found": "found", "containing": "containing", "and": "and", "or": "or", "own": "You have this ingredient", "need": "You need this ingredient", "markMissing": "Mark ingredient as missing", "unmarkMissing": "Mark ingredient as available", "favourite": "Add to favourites", "unfavourite": "Remove from favourites", "showFavourites": "Show only favourites", "showAll": "Show all recipes",
}
UI_IT = {
    "pageTitle": "Ricette", "languageLabel": "Lingua", "categoryPrompt": "Voglio preparare un", "allCategories": "Tutte le categorie",
    "haveIngredients": "Voglio cucinare con", "clearFilters": "Azzera filtri", "missingIngredients": "Ingredienti che non ho", "loading": "Caricamento ricette...",
    "ingredients": "Ingredienti", "preparation": "Preparazione", "tags": "Tag", "missing": "Per questa ricetta mancano",
    "ready": "Hai tutti gli ingredienti per questa ricetta.", "noMatch": "Nessuna ricetta corrisponde ai filtri.", "recipe": "ricetta", "recipes": "ricette",
    "found": "trovate", "containing": "con", "and": "e", "or": "o", "own": "Ingrediente disponibile", "need": "Ingrediente mancante", "markMissing": "Segna ingrediente come mancante", "unmarkMissing": "Segna ingrediente come disponibile", "favourite": "Aggiungi ai preferiti", "unfavourite": "Rimuovi dai preferiti", "showFavourites": "Mostra solo preferiti", "showAll": "Mostra tutte le ricette",
}


def slug(value: str) -> str:
    value = value.lower().replace("’", "").replace("&", "and")
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


def ingredient_record(line: str) -> dict:
    cleaned = line.lstrip("- ").strip()
    lowered = cleaned.lower()
    matches = [(phrase, key) for phrase, key in INGREDIENTS.items() if phrase in lowered]
    if not matches:
        raise ValueError(f"Unmapped ingredient: {cleaned}")
    phrase, key = max(matches, key=lambda item: len(item[0]))
    position = lowered.rfind(phrase)
    details = cleaned[position + len(phrase):].strip(" ,")
    result = {"ingredient": key, "quantity": cleaned[:position].strip()}
    if details:
        result["details"] = details
    return result


def join_lines(lines: list[str]) -> str:
    return " ".join(line.strip() for line in lines).replace("  ", " ")


def italian_text(text: str | None) -> str | None:
    if text is None:
        return None
    replacements = [
        ("Cut the produce to fit your juicer’s feed tube.", "Taglia gli ingredienti per adattarli al tubo di alimentazione dell’estrattore."),
        ("Juice the ingredients and stir.", "Estrarre il succo dagli ingredienti e mescolare."),
        ("Pour into a glass and drink as soon as possible.", "Versare in un bicchiere e bere al più presto."),
        ("Pour into a glass.", "Versare in un bicchiere."),
        ("Serve at room temperature or chilled, as desired.", "Servire a temperatura ambiente o freddo, a piacere."),
        ("Bunch up the ", "Raggruppare "),
        (" and push through the feed tube with the ", " e spingere nel tubo di alimentazione insieme a "),
        ("Juice the remaining ingredients", "Estrarre il succo dagli ingredienti rimanenti"),
        ("Serves ", "Porzioni: "),
        ("Combine all ingredients except almonds in a blender and blend well.", "Frullare tutti gli ingredienti tranne le mandorle."),
        ("Sprinkle ground almonds on top, as desired.", "Cospargere con le mandorle tritate, a piacere."),
        ("Place all ingredients in a saucepan and simmer for 10 minutes.", "Mettere tutti gli ingredienti in una pentola e cuocere a fuoco lento per 10 minuti."),
        ("Strain and drink immediately.", "Filtrare e bere subito."),
        ("Juice the carrots and pour the juice into a blender.", "Estrarre il succo delle carote e versarlo in un frullatore."),
        ("Add the avocado and cumin and blend until smooth.", "Aggiungere l’avocado e il cumino e frullare fino a ottenere una consistenza cremosa."),
        ("Serve chilled.", "Servire freddo."),
    ]
    for english, italian in replacements:
        text = text.replace(english, italian)
    return text


raw_lines = SOURCE.read_text(encoding="utf-8").splitlines()
recipes = []
current = None
mode = None
for raw_line in raw_lines:
    line = raw_line.strip()
    if line.startswith("## "):
        if current:
            recipes.append(current)
        title = line[3:].replace("â€™", "’")
        current = {"id": slug(title), "title": title, "ingredients": [], "preparation": [], "note": None, "serves": None}
        mode = "ingredients"
    elif not current or not line or line.startswith("<!--"):
        continue
    elif line.startswith("- ") and mode == "ingredients":
        inline_preparation = re.search(
            r"\s+(?=(?:Juice one|Cut the|Combine all|Place all|Bunch up|Roll the|Starting with)\b)",
            line[2:],
        )
        if inline_preparation:
            ingredient_line = "- " + line[2: 2 + inline_preparation.start()].strip()
            preparation_line = line[2 + inline_preparation.end():].strip()
            current["ingredients"].append(ingredient_record(ingredient_line))
            current["preparation"].append(preparation_line)
            mode = "post"
            continue
        try:
            current["ingredients"].append(ingredient_record(line))
        except ValueError:
            if current["ingredients"]:
                details = current["ingredients"][-1].get("details", "")
                current["ingredients"][-1]["details"] = (details + " " + line[2:].strip()).strip()
            else:
                raise
    elif line.startswith("**Serves "):
        current["serves"] = line[9:-2]
        mode = "post"
    elif line.startswith("> NOTE: "):
        current["note"] = line[8:]
        mode = "note"
    elif mode == "ingredients" and line.startswith(("Cut ", "Combine ", "Place ", "Bunch ", "Roll ", "Starting ", "Juice ")):
        current["preparation"].append(line)
        mode = "post"
    elif mode == "ingredients" and current["ingredients"]:
        current["ingredients"][-1]["details"] += " " + line
    elif mode == "note" and current["note"]:
        current["note"] += " " + line
    elif mode == "post":
        current["preparation"].append(line)
if current:
    recipes.append(current)

for recipe in recipes:
    recipe["preparation"] = join_lines(recipe["preparation"])
    lower_title = recipe["title"].lower()
    recipe["category"] = "smoothie" if "smoothie" in lower_title else "tea" if "tea" in lower_title else "soup" if "soup" in lower_title else "juice"
    words = set(re.findall(r"[a-z]+", lower_title + " " + (recipe["note"] or "").lower()))
    recipe["tags"] = sorted(TAG_WORDS[word] for word in words if word in TAG_WORDS)

ingredient_keys = sorted({item["ingredient"] for recipe in recipes for item in recipe["ingredients"]})
tag_keys = sorted({tag for recipe in recipes for tag in recipe["tags"]})
dictionary = {
    "ingredients": {key: {"emoji": INGREDIENT_EMOJI.get(key, "🌿")} for key in ingredient_keys},
    "tags": tag_keys,
    "categories": {key: {"emoji": CATEGORY_EMOJI[key]} for key in ("juice", "smoothie", "soup", "tea")},
}
records = []
for recipe in recipes:
    record = {key: recipe[key] for key in ("id", "category", "serves", "ingredients", "note", "tags")}
    records.append({key: value for key, value in record.items() if value is not None and value != [] and value != ""})
english = {"ui": UI_EN, "categories": {key: key.title() for key in dictionary["categories"]}, "ingredients": {key: key.replace("-", " ").title() for key in ingredient_keys}, "tags": {key: key.title() for key in tag_keys}, "recipes": {}}
italian = {"ui": UI_IT, "categories": {"juice": "Succo", "smoothie": "Frullato", "soup": "Zuppa", "tea": "Tè"}, "ingredients": {key: ITALIAN_INGREDIENTS.get(key, key.replace("-", " ")) for key in ingredient_keys}, "tags": {key: TAG_IT.get(key, key) for key in tag_keys}, "recipes": {}}
for recipe in recipes:
    rid = recipe["id"]
    english["recipes"][rid] = {"title": recipe["title"], "preparation": recipe["preparation"], "note": recipe["note"]}
    italian["recipes"][rid] = {"title": TITLE_IT.get(recipe["title"], recipe["title"]), "preparation": italian_text(recipe["preparation"]), "note": italian_text(recipe["note"])}

OUTPUT.mkdir(exist_ok=True)
(OUTPUT / "dictionary.json").write_text(json.dumps(dictionary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(OUTPUT / "recipes.json").write_text(json.dumps({"source": "The Juice Lady's Guide to Juicing for Health", "recipes": records}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(OUTPUT / "en.json").write_text(json.dumps(english, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(OUTPUT / "it.json").write_text(json.dumps(italian, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Generated {len(recipes)} recipes, {len(ingredient_keys)} ingredients, {len(tag_keys)} tags")