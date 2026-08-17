const state = {
    data: null,
    query: new URLSearchParams(window.location.search),
};

const elements = {
    category: document.querySelector("#category"),
    ingredients: document.querySelector("#ingredient-filters"),
    clear: document.querySelector("#clear"),
    count: document.querySelector("#result-count"),
    status: document.querySelector("#status"),
    recipes: document.querySelector("#recipes"),
};

function updateUrl() {
    const params = new URLSearchParams();
    if (elements.category.value) params.set("category", elements.category.value);
    const selectedIngredients = [
        ...elements.ingredients.querySelectorAll('[aria-pressed="true"]'),
    ].map((button) => button.dataset.ingredient);
    if (selectedIngredients.length) params.set("ingredients", selectedIngredients.join(","));
    history.replaceState(null, "", params.size ? `?${params}` : window.location.pathname);
}

function setFiltersFromUrl() {
    elements.category.value = state.query.get("category") || "";
    const selectedIngredients = new Set(
        (state.query.get("ingredients") || "").split(",").filter(Boolean),
    );
    renderIngredientFilters(selectedIngredients);
}

function getSelectedIngredients() {
    return new Set(
        [...elements.ingredients.querySelectorAll('[aria-pressed="true"]')].map(
            (button) => button.dataset.ingredient,
        ),
    );
}

function renderIngredientFilters(selectedIngredients = getSelectedIngredients()) {
    const availableIngredients = new Set(
        state.data.recipes
            .filter(
                (recipe) => !elements.category.value || recipe.category === elements.category.value,
            )
            .flatMap((recipe) => recipe.ingredients.map(([key]) => key)),
    );
    const ingredientEntries = Object.entries(state.data.ingredients)
        .filter(([key]) => availableIngredients.has(key))
        .sort(([, left], [, right]) => left.title.localeCompare(right.title));

    elements.ingredients.replaceChildren();
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
        elements.ingredients.append(button);
    }
}

function populateFilters() {
    for (const [key, category] of Object.entries(state.data.categories)) {
        elements.category.add(new Option(`${category.emoji} ${category.title}`, key));
    }
    setFiltersFromUrl();
}

function recipeMatches(recipe) {
    const ingredientKeys = new Map(recipe.ingredients);
    const selectedIngredients = getSelectedIngredients();

    return (
        (!elements.category.value || recipe.category === elements.category.value) &&
        [...selectedIngredients].every((ingredient) => ingredientKeys.has(ingredient))
    );
}

function renderRecipe(recipe) {
    const category = state.data.categories[recipe.category];
    const card = document.createElement("article");
    card.className = "recipe-card";

    const header = document.createElement("header");
    const title = document.createElement("h2");
    title.textContent = recipe.title;
    const categoryLabel = document.createElement("span");
    categoryLabel.className = "category";
    categoryLabel.textContent = `${category.emoji} ${category.title}`;
    header.append(title, categoryLabel);

    const ingredientsHeading = document.createElement("h3");
    ingredientsHeading.textContent = "Ingredients";
    const list = document.createElement("ul");
    list.className = "ingredient-list";

    for (const [key, quantity] of recipe.ingredients) {
        const ingredient = state.data.ingredients[key];
        const item = document.createElement("li");
        item.textContent = `${ingredient?.emoji || "•"} ${quantity} ${ingredient?.title || key}`;
        list.append(item);
    }

    const preparationHeading = document.createElement("h3");
    preparationHeading.textContent = "Preparation";
    const preparation = document.createElement("p");
    preparation.className = "preparation";
    preparation.textContent = recipe.preparation;
    card.append(header, ingredientsHeading, list, preparationHeading, preparation);
    return card;
}

function render() {
    const matches = state.data.recipes.filter(recipeMatches);
    elements.recipes.replaceChildren(...matches.map(renderRecipe));
    elements.count.textContent = `${matches.length} recipe${matches.length === 1 ? "" : "s"}`;
    elements.status.textContent = matches.length ? "" : "No recipes match these filters.";
}

function handleFilterChange() {
    renderIngredientFilters(getSelectedIngredients());
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
    for (const button of elements.ingredients.querySelectorAll("button")) {
        button.setAttribute("aria-pressed", "false");
    }
    handleFilterChange();
});

init();
