/**
 * Query String Manager
 *
 * Utilities for managing query string parameters in the browser's URL.
 */

/**
 * Retrieves the value of a query string parameter.
 *
 * @param {string} key - The name of the query string parameter to retrieve.
 * @param {string} [orElse] - The default value to return if the parameter is not found.
 * @returns {string|null} The value of the query string parameter, or the default value if not found.
 */
export function get(key, orElse) {
    return new URLSearchParams(window.location.search).get(key) ?? orElse;
}

/**
 * Updates or adds a query string parameter in the URL without reloading the page.
 *
 * @param {string} key - The name of the query string parameter to set.
 * @param {string} value - The value to set for the query string parameter.
 */
export function set(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    if (window.location.href !== url.href) {
        window.history.replaceState({}, document.title, url.toString());
    }
}
