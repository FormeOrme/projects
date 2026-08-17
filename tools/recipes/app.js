const state = {
    data: null,
    query: new URLSearchParams(window.location.search),
};

const elements = {
    category: document.querySelector("#category"),
    ownedIngredients: document.querySelector("#owned-ingredients"),
    ingredientFilters: document.querySelector("#ingredient-filters"),
    clear: document.querySelector("#clear"),
    recap: document.querySelector("#recap"),
    count: document.querySelector("#result-count"),
    status: document.querySelector("#status"),
    recipes: document.querySelector("#recipes"),
};

function updateUrl() {
    const params = new URLSearchParams();
    if (elements.category.value) params.set("category", elements.category.value);
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const filteredIngredients = getSelectedIngredients(elements.ingredientFilters);
    if (ownedIngredients.size) params.set("owned", [...ownedIngredients].join(","));
    if (filteredIngredients.size) params.set("ingredients", [...filteredIngredients].join(","));
    history.replaceState(null, "", params.size ? `?${params}` : window.location.pathname);
}

function setFiltersFromUrl() {
    elements.category.value = state.query.get("category") || "";
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
    return state.data.recipes.filter((recipe) => {
        const ingredientKeys = new Set(recipe.ingredients.map(([key]) => key));
        return (
            (!elements.category.value || recipe.category === elements.category.value) &&
            ![...excludedIngredients].some((ingredient) => ingredientKeys.has(ingredient))
        );
    });
}

function getAvailableIngredients() {
    const availableIngredients = new Set(
        state.data.recipes
            .filter(
                (recipe) => !elements.category.value || recipe.category === elements.category.value,
            )
            .flatMap((recipe) => recipe.ingredients.map(([key]) => key)),
    );
    return Object.entries(state.data.ingredients)
        .filter(([key]) => availableIngredients.has(key))
        .sort(([, left], [, right]) => left.title.localeCompare(right.title));
}

function getAvailableOwnedIngredients() {
    const excludedIngredients = getSelectedIngredients(elements.ingredientFilters);
    const visibleIngredients = new Set(
        getVisibleRecipes().flatMap((recipe) => recipe.ingredients.map(([key]) => key)),
    );
    return Object.entries(state.data.ingredients)
        .filter(([key]) => visibleIngredients.has(key) && !excludedIngredients.has(key))
        .sort(([, left], [, right]) => left.title.localeCompare(right.title));
}

function renderIngredientToggles(container, selectedIngredients, ingredientEntries) {
    container.replaceChildren();
    for (const [key, ingredient] of ingredientEntries) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ingredient-toggle";
        button.dataset.ingredient = key;
        button.setAttribute("aria-pressed", String(selectedIngredients.has(key)));
        button.textContent = `${ingredient.emoji} ${ingredient.title}`;
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
    for (const [key, category] of Object.entries(state.data.categories)) {
        elements.category.add(new Option(`${category.emoji} ${category.title}`, key));
    }
    setFiltersFromUrl();
}

function recipeMatches(recipe) {
    const ingredientKeys = new Map(recipe.ingredients);
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const selectedIngredients = getSelectedIngredients(elements.ingredientFilters);

    return (
        (!elements.category.value || recipe.category === elements.category.value) &&
        (!ownedIngredients.size ||
            [...ownedIngredients].some((ingredient) => ingredientKeys.has(ingredient))) &&
        ![...selectedIngredients].some((ingredient) => ingredientKeys.has(ingredient))
    );
}

function recipeIsReady(
    recipe,
    ownedIngredients = getSelectedIngredients(elements.ownedIngredients),
) {
    return recipe.ingredients.every(([key]) => ownedIngredients.has(key));
}

function renderRecipe(recipe) {
    const category = state.data.categories[recipe.category];
    const ownedIngredients = getSelectedIngredients(elements.ownedIngredients);
    const card = document.createElement("article");
    card.className = "recipe-card";

    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.textContent = recipe.title;
    const categoryLabel = document.createElement("span");
    categoryLabel.className = "category";
    categoryLabel.textContent = `${category.emoji} ${category.title}`;
    header.append(title, categoryLabel);

    const missingIngredients = recipe.ingredients
        .filter(([key]) => !ownedIngredients.has(key))
        .map(([key]) => state.data.ingredients[key]?.title.toLowerCase() || key);
    const alert = document.createElement("p");
    alert.className = `recipe-alert ${missingIngredients.length ? "missing" : "ready"}`;
    alert.textContent = missingIngredients.length
        ? `For this recipe you are missing ${formatIngredientList(missingIngredients)}.`
        : "You are set for this recipe.";

    const ingredientsHeading = document.createElement("h3");
    ingredientsHeading.textContent = "Ingredients";
    const list = document.createElement("ul");
    list.className = "ingredient-list";

    for (const [key, quantity] of recipe.ingredients) {
        const ingredient = state.data.ingredients[key];
        const item = document.createElement("li");
        item.className = ownedIngredients.has(key) ? "owned" : "missing";
        item.title = ownedIngredients.has(key)
            ? "You have this ingredient"
            : "You need this ingredient";
        item.textContent = `${ingredient?.emoji || "•"} ${quantity} ${ingredient?.title || key}`;
        list.append(item);
    }

    const preparationHeading = document.createElement("h3");
    preparationHeading.textContent = "Preparation";
    const preparation = document.createElement("p");
    preparation.className = "preparation";
    preparation.textContent = recipe.preparation;
    card.append(header, alert, ingredientsHeading, list, preparationHeading, preparation);
    return card;
}

function formatIngredientList(ingredients) {
    if (ingredients.length < 2) return ingredients[0];
    if (ingredients.length === 2) return `${ingredients[0]} and ${ingredients[1]}`;
    return `${ingredients.slice(0, -1).join(", ")} and ${ingredients.at(-1)}`;
}

function formatOrList(ingredients) {
    if (ingredients.length < 2) return ingredients[0];
    if (ingredients.length === 2) return `${ingredients[0]} or ${ingredients[1]}`;
    return `${ingredients.slice(0, -1).join(", ")} or ${ingredients.at(-1)}`;
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
    const category = state.data.categories[elements.category.value];
    const ownedIngredients = [...getSelectedIngredients(elements.ownedIngredients)].map(
        (key) => state.data.ingredients[key]?.title || key,
    );
    const categoryText = category?.title.toLowerCase() || "something";
    const recipeLabel = `${matches.length} recipe${matches.length === 1 ? "" : "s"}`;
    const ingredientText = ownedIngredients.length
        ? ` containing ${formatOrList(ownedIngredients)}`
        : "";
    elements.recap.textContent = `${recipeLabel} for ${categoryText} found${ingredientText}.`;
    elements.recipes.replaceChildren(...matches.map(renderRecipe));
    elements.count.textContent = `${matches.length} recipe${matches.length === 1 ? "" : "s"}`;
    elements.status.textContent = matches.length ? "" : "No recipes match these filters.";
}

function handleFilterChange() {
    renderIngredientFilters();
    updateUrl();
    render();
}

async function init() {
    try {
        const response = await fetch("./recipes.json");
        if (!response.ok) throw new Error(`Could not load recipes.json (${response.status})`);
        state.data = await response.json();
        populateFilters();
        render();
    } catch (error) {
        elements.count.textContent = "Recipes unavailable";
        elements.status.textContent = "Run this folder through a local web server, then reload.";
        console.error(error);
    }
}

elements.category.addEventListener("change", handleFilterChange);
elements.clear.addEventListener("click", () => {
    elements.category.value = "";
    for (const container of [elements.ownedIngredients, elements.ingredientFilters]) {
        for (const button of container.querySelectorAll("button")) {
            button.setAttribute("aria-pressed", "false");
        }
    }
    handleFilterChange();
});

init();
