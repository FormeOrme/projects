# Recipe Rules

Use these rules when adding or migrating recipes.

## Files

- Add recipe records to `sources/recipes.json`. The app loads recipes from this file.
- Add emoji metadata for every new ingredient key in `sources/dictionary.json`.
- Add the ingredient's English label to `sources/en.json`.
- Add the ingredient's Italian label to `sources/it.json`.
- Add a localized recipe record with the same ID to both `sources/en.json` and `sources/it.json`.
- Do not add recipes to the old root `recipes.json`.

## Recipe Record

Use this shape in `sources/recipes.json`:

```json
{
    "id": "kebab-case-id",
    "category": "juice",
    "serves": "1",
    "ingredients": [
        {
            "ingredient": "canonical-ingredient-key",
            "quantity": "250 g",
            "details": "optional preparation detail"
        }
    ],
    "note": "optional note",
    "tags": ["optional", "tags"],
    "source": "source name or URL"
}
```

Rules:

- Use a unique lowercase kebab-case `id`.
- Use existing category keys where possible: `juice`, `smoothie`, `soup`, `tea`, or `frozen`.
- Use canonical ingredient keys from `sources/dictionary.json`; do not create spelling variants.
- Keep `quantity` and `details` separate.
- Include `source` on every newly added recipe. Preserve the exact source name or URL provided for that recipe.
- Include `serves` when the source provides a serving count.
- Keep source-specific preparation instructions in the localized recipe records' `preparation` field.
- Use `note` and `tags` only when supported by the source.

## Localizations

Add the same recipe ID to `sources/en.json` and `sources/it.json`:

```json
"kebab-case-id": {
  "title": "English title",
  "preparation": "English preparation instructions.",
  "note": null
}
```

Translate `title`, `preparation`, and non-null `note`; do not leave English fragments in the Italian record. Ingredient labels belong under each locale's `ingredients` object. Category labels belong under `categories`.

## Units

Store all measurements in metric European units. Convert American units before writing JSON.

| American unit  | Store as    | Conversion               |
| -------------- | ----------- | ------------------------ |
| ounce (weight) | grams       | `1 oz` = `28 g`          |
| fluid ounce    | millilitres | `1 fl oz` = `30 ml`      |
| pound          | grams       | `1 lb` = `454 g`         |
| cup            | millilitres | `1 cup` = `240 ml`       |
| tablespoon     | millilitres | `1 tbsp` = `15 ml`       |
| teaspoon       | millilitres | `1 tsp` = `5 ml`         |
| inch           | centimetres | `1 inch` = `2.5 cm`      |
| Fahrenheit     | Celsius     | `C` = `(F - 32) * 5 / 9` |

Use practical rounded values. Convert fractions too: `1/2 cup` becomes `120 ml`, `8 oz spinach` becomes `225 g`, and `1 inch ginger` becomes `2.5 cm`. Keep ingredient counts such as `1 apple` unchanged. Do not write `oz`, `lb`, `cup`, `tbsp`, `tsp`, or `inch` in new recipe quantities.

## Validation

After adding a recipe:

1. Parse all four JSON files.
2. Check every recipe ingredient exists in `sources/dictionary.json`.
3. Check every recipe ID has English and Italian localization.
4. Check every new recipe has a `source` and uses metric quantities.
5. Run the app and verify the recipe appears in each language.

PowerShell JSON syntax check:

```powershell
foreach ($file in @('sources/recipes.json', 'sources/dictionary.json', 'sources/en.json', 'sources/it.json')) {
    Get-Content -Raw $file | ConvertFrom-Json | Out-Null
}
```
