/**
 * Helper to initialize a p5 sketch with full module support
 * Returns a chainable builder for setup and draw functions
 *
 * @returns {Object} - Builder with setup() and draw() methods
 *
 * @example
 * createP5()
 *   .setup(({createCanvas, background}) => {
 *     createCanvas(400, 400);
 *     background(220);
 *   })
 *   .draw(({circle, frameCount}) => {
 *     circle(200, 200, 50);
 *   });
 */
export const createP5 = () => {
    let setupFn, drawFn;

    return {
        setup(fn) {
            setupFn = fn;
            return this;
        },
        draw(fn) {
            drawFn = fn;
            new p5((p) => {
                const bound = new Proxy(p, {
                    get: (target, prop) => {
                        const value = target[prop];
                        return typeof value === "function" ? value.bind(target) : value;
                    },
                });
                if (setupFn) p.setup = () => setupFn(bound);
                if (drawFn) p.draw = () => drawFn(bound);
            });
            return this;
        },
    };
};
