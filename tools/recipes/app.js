const state = {
    data: null,
    query: new URLSearchParams(window.location.search),
    language: "en",
    missingIngredients: new Set(),
    favourites: new Set(),
    favouritesOnly: false,
};

const storageKeys = {
    missingIngredients: "juice-recipes.missing-ingredients",
    favourites: "juice-recipes.favourites",
    favouritesOnly: "juice-recipes.favourites-only",
};

function readStoredSet(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return new Set(Array.isArray(value) ? value : []);
    } catch {
        return new Set();
    }
}

function writeStoredSet(key, values) {
    localStorage.setItem(key, JSON.stringify([...values].sort()));
}

const elements = {
    ownedIngredients: document.querySelector("#owned-ingredients"),
    ingredientFilters: document.querySelector("#ingredient-filters"),
    favouritesOnly: document.querySelector("#favourites-only"),
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
    updateFavouritesButton();
}

function updateFavouritesButton() {
    const label = elements.favouritesOnly.querySelector("span:last-child");
    label.textContent = text(state.favouritesOnly ? "showAll" : "showFavourites");
    elements.favouritesOnly.querySelector("span:first-child").textContent = state.favouritesOnly
        ? "♥"
        : "♡";
    elements.favouritesOnly.setAttribute("aria-pressed", String(state.favouritesOnly));
}

function updateUrl() {
    const params = new URLSearchParams();
    if (state.language !== "en") params.set("lang", state.language);
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    if (ownedIngredients.size) params.set("owned", [...ownedIngredients].join(","));
    history.replaceState(null, "", params.size ? `?${params}` : window.location.pathname);
}

function setFiltersFromUrl() {
    const ownedIngredients = new Set((state.query.get("owned") || "").split(",").filter(Boolean));
    renderIngredientToggles(
        elements.ownedIngredients,
        ownedIngredients,
        getAvailableOwnedIngredients(),
    );
    renderIngredientToggles(
        elements.ingredientFilters,
        state.missingIngredients,
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

function getMissingIngredients() {
    return state.missingIngredients;
}

function getVisibleRecipes() {
    const excludedIngredients = getMissingIngredients();
    return getCategoryRecipes().filter((recipe) => {
        const ingredientKeys = new Set(recipe.ingredients.map(({ ingredient }) => ingredient));
        return (
            recipe.category === "juice" &&
            (!state.favouritesOnly || state.favourites.has(recipe.id)) &&
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
    const excludedIngredients = getMissingIngredients();
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
            const selected = button.getAttribute("aria-pressed") !== "true";
            button.setAttribute("aria-pressed", String(selected));
            if (container === elements.ingredientFilters) {
                if (selected) state.missingIngredients.add(key);
                else state.missingIngredients.delete(key);
                writeStoredSet(storageKeys.missingIngredients, state.missingIngredients);
            }
            handleFilterChange();
        });
        container.append(button);
    }
}

function renderIngredientFilters() {
    const selectedOwnedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const selectedExcludedIngredients = getMissingIngredients();
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
    const selectedIngredients = getMissingIngredients();

    return (
        recipe.category === "juice" &&
        (!state.favouritesOnly || state.favourites.has(recipe.id)) &&
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

function recipeMatchCount(recipe, ownedIngredients) {
    const selected = new Set(ownedIngredients);
    return recipe.ingredients.reduce(
        (count, { ingredient }) => count + Number(selected.has(ingredient)),
        0,
    );
}

function renderRecipe(recipe) {
    const localized = localizedRecipe(recipe);
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const card = document.createElement("article");
    card.className = "recipe-card";

    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.textContent = localized.title;
    const favourite = document.createElement("button");
    favourite.type = "button";
    favourite.className = `favourite-button${state.favourites.has(recipe.id) ? " active" : ""}`;
    favourite.textContent = state.favourites.has(recipe.id) ? "🤍" : "💚";
    favourite.setAttribute(
        "aria-label",
        text(state.favourites.has(recipe.id) ? "unfavourite" : "favourite"),
    );
    favourite.setAttribute("aria-pressed", String(state.favourites.has(recipe.id)));
    favourite.addEventListener("click", () => {
        if (state.favourites.has(recipe.id)) state.favourites.delete(recipe.id);
        else state.favourites.add(recipe.id);
        writeStoredSet(storageKeys.favourites, state.favourites);
        render();
    });
    header.append(title, favourite);

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

    const sortedIngredients = [...recipe.ingredients].sort(
        (left, right) =>
            Number(ownedIngredients.has(right.ingredient)) -
            Number(ownedIngredients.has(left.ingredient)),
    );
    for (const { ingredient: key, quantity, details } of sortedIngredients) {
        const item = document.createElement("li");
        item.className = ownedIngredients.has(key) ? "owned" : "missing";
        item.title = ownedIngredients.has(key) ? text("own") : text("need");
        const label = document.createElement("span");
        label.className = "recipe-ingredient-label";
        const icon = document.createElement("span");
        icon.className = "recipe-ingredient-icon";
        icon.textContent = state.data.dictionary.ingredients[key]?.emoji || "•";
        icon.setAttribute("aria-hidden", "true");
        const ingredientText = document.createElement("span");
        ingredientText.className = "recipe-ingredient-text";
        ingredientText.textContent = `${quantity} ${state.data.ingredients[key] || key}${details ? `, ${details}` : ""}`;
        label.append(icon, ingredientText);
        item.append(label);
        if (!ownedIngredients.has(key)) {
            item.setAttribute("role", "button");
            item.tabIndex = 0;
            const markMissing = () => {
                state.missingIngredients.has(key)
                    ? state.missingIngredients.delete(key)
                    : state.missingIngredients.add(key);
                writeStoredSet(storageKeys.missingIngredients, state.missingIngredients);
                renderIngredientFilters();
                render();
            };
            const remove = document.createElement("span");
            remove.className = "recipe-ingredient-remove";
            remove.textContent = "×";
            remove.setAttribute("aria-hidden", "true");
            item.append(remove);
            item.addEventListener("click", markMissing);
            item.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    markMissing();
                }
            });
        }
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
                recipeMatchCount(right, ownedIngredientKeys) -
                    recipeMatchCount(left, ownedIngredientKeys) ||
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
        state.missingIngredients = readStoredSet(storageKeys.missingIngredients);
        state.favourites = readStoredSet(storageKeys.favourites);
        state.favouritesOnly = localStorage.getItem(storageKeys.favouritesOnly) === "true";
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
    state.missingIngredients.clear();
    state.favouritesOnly = false;
    writeStoredSet(storageKeys.missingIngredients, state.missingIngredients);
    localStorage.setItem(storageKeys.favouritesOnly, "false");
    for (const container of [elements.ownedIngredients, elements.ingredientFilters]) {
        for (const button of container.querySelectorAll("button")) {
            button.setAttribute("aria-pressed", "false");
        }
    }
    handleFilterChange();
});

elements.favouritesOnly.addEventListener("click", () => {
    state.favouritesOnly = !state.favouritesOnly;
    localStorage.setItem(storageKeys.favouritesOnly, String(state.favouritesOnly));
    updateFavouritesButton();
    renderIngredientFilters();
    render();
});

init();
