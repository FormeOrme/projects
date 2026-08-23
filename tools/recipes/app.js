const state = {
    data: null,
    query: new URLSearchParams(window.location.search),
    language: "en",
};

const elements = {
    ownedIngredients: document.querySelector("#owned-ingredients"),
    ingredientFilters: document.querySelector("#ingredient-filters"),
    clear: document.querySelector("#clear"),
    recap: document.querySelector("#recap"),
    count: document.querySelector("#result-count"),
    status: document.querySelector("#status"),
    recipes: document.querySelector("#recipes"),
};

function text(key) {
    return state.data.locale.ui[key];
}

function localizedRecipe(recipe) {
    return state.data.locale.recipes[recipe.id] || {};
}

function updatePageText() {
    document.documentElement.lang = state.language;
    for (const element of document.querySelectorAll("[data-i18n]"))
        element.textContent = text(element.dataset.i18n);
    elements.ownedIngredients.setAttribute("aria-label", text("haveIngredients"));
    elements.ingredientFilters.setAttribute("aria-label", text("missingIngredients"));
}

function updateUrl() {
    const params = new URLSearchParams();
    if (state.language !== "en") params.set("lang", state.language);
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const filteredIngredients = getSelectedIngredients(elements.ingredientFilters);
    if (ownedIngredients.size) params.set("owned", [...ownedIngredients].join(","));
    if (filteredIngredients.size) params.set("ingredients", [...filteredIngredients].join(","));
    history.replaceState(null, "", params.size ? `?${params}` : window.location.pathname);
}

function setFiltersFromUrl() {
    const ownedIngredients = new Set((state.query.get("owned") || "").split(",").filter(Boolean));
    const filteredIngredients = new Set(
        (state.query.get("ingredients") || "").split(",").filter(Boolean),
    );
    renderIngredientToggles(
        elements.ownedIngredients,
        ownedIngredients,
        getAvailableOwnedIngredients(),
    );
    renderIngredientToggles(
        elements.ingredientFilters,
        filteredIngredients,
        getAvailableIngredients(),
    );
}

function getSelectedIngredients(container) {
    return new Set(
        [...container.querySelectorAll('[aria-pressed="true"]')].map(
            (button) => button.dataset.ingredient,
        ),
    );
}

function getVisibleRecipes() {
    const excludedIngredients = getSelectedIngredients(elements.ingredientFilters);
    return getCategoryRecipes().filter((recipe) => {
        const ingredientKeys = new Set(recipe.ingredients.map(({ ingredient }) => ingredient));
        return (
            recipe.category === "juice" &&
            ![...excludedIngredients].some((ingredient) => ingredientKeys.has(ingredient))
        );
    });
}

function getCategoryRecipes() {
    return state.data.recipes.filter((recipe) => recipe.category === "juice");
}

function getAvailableIngredients() {
    const ingredientFrequency = new Map();
    for (const recipe of getVisibleRecipes()) {
        for (const { ingredient } of recipe.ingredients) {
            ingredientFrequency.set(ingredient, (ingredientFrequency.get(ingredient) || 0) + 1);
        }
    }
    return Object.entries(state.data.ingredients)
        .filter(([key]) =>
            getCategoryRecipes().some((recipe) =>
                recipe.ingredients.some((item) => item.ingredient === key),
            ),
        )
        .sort(
            ([leftKey, left], [rightKey, right]) =>
                (ingredientFrequency.get(rightKey) || 0) -
                    (ingredientFrequency.get(leftKey) || 0) || left.localeCompare(right),
        );
}

function getAvailableOwnedIngredients() {
    const excludedIngredients = getSelectedIngredients(elements.ingredientFilters);
    const ingredientFrequency = new Map();
    for (const recipe of getVisibleRecipes()) {
        for (const { ingredient } of recipe.ingredients) {
            ingredientFrequency.set(ingredient, (ingredientFrequency.get(ingredient) || 0) + 1);
        }
    }
    const visibleIngredients = new Set(ingredientFrequency.keys());
    return Object.entries(state.data.ingredients)
        .filter(([key]) => visibleIngredients.has(key) && !excludedIngredients.has(key))
        .sort(
            ([leftKey, left], [rightKey, right]) =>
                ingredientFrequency.get(rightKey) - ingredientFrequency.get(leftKey) ||
                left.localeCompare(right),
        );
}

function renderIngredientToggles(container, selectedIngredients, ingredientEntries) {
    container.replaceChildren();
    const recipeCounts = new Map();
    for (const recipe of getVisibleRecipes()) {
        for (const { ingredient } of recipe.ingredients) {
            recipeCounts.set(ingredient, (recipeCounts.get(ingredient) || 0) + 1);
        }
    }
    for (const [key, ingredient] of ingredientEntries) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ingredient-toggle";
        button.dataset.ingredient = key;
        button.setAttribute("aria-pressed", String(selectedIngredients.has(key)));
        const icon = document.createElement("span");
        icon.className = "ingredient-icon";
        icon.textContent = state.data.dictionary.ingredients[key]?.emoji || "•";
        icon.setAttribute("aria-hidden", "true");
        const label = document.createElement("span");
        label.className = "ingredient-name";
        label.textContent = ingredient;
        button.append(icon, label);
        const count = document.createElement("span");
        count.className = "ingredient-count";
        count.textContent = recipeCounts.get(key) || 0;
        count.setAttribute("aria-label", `${recipeCounts.get(key) || 0} recipes`);
        button.append(count);
        button.addEventListener("click", () => {
            button.setAttribute(
                "aria-pressed",
                String(button.getAttribute("aria-pressed") !== "true"),
            );
            handleFilterChange();
        });
        container.append(button);
    }
}

function renderIngredientFilters() {
    const selectedOwnedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const selectedExcludedIngredients = getSelectedIngredients(elements.ingredientFilters);
    renderIngredientToggles(
        elements.ownedIngredients,
        selectedOwnedIngredients,
        getAvailableOwnedIngredients(),
    );
    renderIngredientToggles(
        elements.ingredientFilters,
        selectedExcludedIngredients,
        getAvailableIngredients(),
    );
}

function populateFilters() {
    setFiltersFromUrl();
}

function recipeMatches(recipe) {
    const ingredientKeys = new Set(recipe.ingredients.map(({ ingredient }) => ingredient));
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const selectedIngredients = getSelectedIngredients(elements.ingredientFilters);

    return (
        recipe.category === "juice" &&
        (!ownedIngredients.size ||
            [...ownedIngredients].some((ingredient) => ingredientKeys.has(ingredient))) &&
        ![...selectedIngredients].some((ingredient) => ingredientKeys.has(ingredient))
    );
}

function recipeIsReady(
    recipe,
    ownedIngredients = getSelectedIngredients(elements.ownedIngredients),
) {
    return recipe.ingredients.every(({ ingredient }) => ownedIngredients.has(ingredient));
}

function renderRecipe(recipe) {
    const localized = localizedRecipe(recipe);
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const card = document.createElement("article");
    card.className = "recipe-card";

    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.textContent = localized.title;
    const categoryLabel = document.createElement("span");
    categoryLabel.className = "category";
    categoryLabel.textContent = `${state.data.dictionary.categories[recipe.category]?.emoji || "•"} ${state.data.categories[recipe.category]}`;
    header.append(title, categoryLabel);

    const missingIngredients = recipe.ingredients
        .filter(({ ingredient }) => !ownedIngredients.has(ingredient))
        .map(({ ingredient }) => state.data.ingredients[ingredient]?.toLowerCase() || ingredient);
    const alert = document.createElement("p");
    alert.className = `recipe-alert ${missingIngredients.length ? "missing" : "ready"}`;
    alert.textContent = missingIngredients.length
        ? `${text("missing")} ${formatIngredientList(missingIngredients)}.`
        : text("ready");

    const ingredientsHeading = document.createElement("h3");
    ingredientsHeading.textContent = text("ingredients");
    const list = document.createElement("ul");
    list.className = "ingredient-list";

    for (const { ingredient: key, quantity, details } of recipe.ingredients) {
        const item = document.createElement("li");
        item.className = ownedIngredients.has(key) ? "owned" : "missing";
        item.title = ownedIngredients.has(key) ? text("own") : text("need");
        item.textContent = `${state.data.dictionary.ingredients[key]?.emoji || "•"} ${quantity} ${state.data.ingredients[key] || key}${details ? `, ${details}` : ""}`;
        list.append(item);
    }

    const preparationHeading = document.createElement("h3");
    preparationHeading.textContent = text("preparation");
    const preparation = document.createElement("p");
    preparation.className = "preparation";
    preparation.textContent = localized.preparation || "";
    card.append(header, alert, ingredientsHeading, list, preparationHeading, preparation);
    if (recipe.tags?.length) {
        const tags = document.createElement("p");
        tags.className = "recipe-tags";
        const tagsLabel = document.createElement("span");
        tagsLabel.className = "recipe-tags-label";
        tagsLabel.textContent = `${text("tags")}:`;
        tags.append(tagsLabel);
        for (const tag of recipe.tags) {
            const tagBadge = document.createElement("span");
            tagBadge.className = "recipe-tag";
            tagBadge.textContent = state.data.locale.tags[tag] || tag;
            tags.append(tagBadge);
        }
        card.append(tags);
    }
    if (localized.note) {
        const note = document.createElement("p");
        note.className = "recipe-note";
        note.setAttribute("role", "note");
        note.textContent = localized.note;
        card.append(note);
    }
    return card;
}

function formatIngredientList(ingredients) {
    if (ingredients.length < 2) return ingredients[0];
    if (ingredients.length === 2) return `${ingredients[0]} ${text("and")} ${ingredients[1]}`;
    return `${ingredients.slice(0, -1).join(", ")} ${text("and")} ${ingredients.at(-1)}`;
}

function formatOrList(ingredients) {
    if (ingredients.length < 2) return ingredients[0];
    if (ingredients.length === 2) return `${ingredients[0]} ${text("or")} ${ingredients[1]}`;
    return `${ingredients.slice(0, -1).join(", ")} ${text("or")} ${ingredients.at(-1)}`;
}

function render() {
    const ownedIngredientKeys = getSelectedIngredients(elements.ownedIngredients);
    const matches = state.data.recipes
        .filter(recipeMatches)
        .sort(
            (left, right) =>
                Number(recipeIsReady(right, ownedIngredientKeys)) -
                Number(recipeIsReady(left, ownedIngredientKeys)),
        );
    const category = state.data.categories.juice;
    const ownedIngredients = [...getSelectedIngredients(elements.ownedIngredients)].map(
        (key) => state.data.ingredients[key] || key,
    );
    const categoryText = category.toLowerCase();
    const recipeLabel = `${matches.length} ${matches.length === 1 ? text("recipe") : text("recipes")}`;
    const ingredientText = ownedIngredients.length
        ? ` ${text("containing")} ${formatOrList(ownedIngredients)}`
        : "";
    elements.recap.textContent = `${recipeLabel} ${categoryText} ${text("found")}${ingredientText}.`;
    elements.recipes.replaceChildren(...matches.map(renderRecipe));
    elements.count.textContent = recipeLabel;
    elements.status.textContent = matches.length ? "" : text("noMatch");
}

function handleFilterChange() {
    renderIngredientFilters();
    updateUrl();
    render();
}

async function init() {
    try {
        state.language = state.query.get("lang") === "it" ? "it" : "en";
        const responses = await Promise.all([
            fetch("./sources/dictionary.json"),
            fetch("./sources/recipes.json"),
            fetch(`./sources/${state.language}.json`),
        ]);
        if (responses.some((response) => !response.ok))
            throw new Error("Could not load localized recipe data");
        const [dictionary, recipeData, locale] = await Promise.all(
            responses.map((response) => response.json()),
        );
        state.data = {
            dictionary,
            categories: Object.fromEntries(
                Object.keys(dictionary.categories).map((key) => [key, locale.categories[key]]),
            ),
            ingredients: Object.fromEntries(
                Object.keys(dictionary.ingredients).map((key) => [key, locale.ingredients[key]]),
            ),
            recipes: recipeData.recipes,
            locale,
        };
        updatePageText();
        populateFilters();
        render();
    } catch (error) {
        elements.count.textContent = "Recipes unavailable";
        elements.status.textContent = "Run this folder through a local web server, then reload.";
        console.error(error);
    }
}

elements.clear.addEventListener("click", () => {
    for (const container of [elements.ownedIngredients, elements.ingredientFilters]) {
        for (const button of container.querySelectorAll("button")) {
            button.setAttribute("aria-pressed", "false");
        }
    }
    handleFilterChange();
});

init();
