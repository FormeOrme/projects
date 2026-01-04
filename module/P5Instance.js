/**
 * Creates a p5 sketch instance with bound methods and destructurable functions
 * Simplifies p5 instance mode setup for module contexts
 *
 * @param {Function} setupFn - Function that receives bound proxy and returns { setup, draw }
 * @returns {Function} - p5 sketch function
 */
export const createP5Sketch = (setupFn) => {
    return (p) => {
        // Proxy that binds all methods to preserve 'this' context
        const bound = new Proxy(p, {
            get: (target, prop) => {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
        });

        // Call the user's setup function and expect { setup, draw } return value
        const { setup, draw } = setupFn(bound) || {};

        // Automatically assign setup and draw to p5 instance
        if (setup) bound.setup = setup;
        if (draw) bound.draw = draw;
    };
};

/**
 * Helper to initialize a p5 sketch with full module support
 */
export const initP5 = (setupFn) => {
    new p5(createP5Sketch(setupFn));
};
