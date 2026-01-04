import { Div, Input, Label, Span } from "/module/Dom.js";

export default class ControlPanel {
    constructor(args) {
        this.container = Div.with({
            ...args,
            class: "row",
        });
        this.callback = args?.callback;
        this.values = {};
        this.classes = {
            input: "col-3 mb-1",
        };
    }

    setClass({ target, classes }) {
        this.classes[target] = classes;
        return this;
    }

    get() {
        return this.container;
    }

    addRange({ id, min = 0, max = 100, step, value, label }) {
        this.values[id] = value;

        const controlPanel = this;

        function updateValue(e) {
            const value = Number(e.value);
            number.node.value = value;
            range.node.value = value;
            controlPanel.values[id] = value;
            controlPanel.callback?.();
        }

        const title = `${label} (min: ${min}, max: ${max})`;

        const number = Input.with({
            id: `${id}-number`,
            attribute: { title },
            value,
            type: "number",
            class: "col-4 input-group-text",
            event: { input: updateValue },
        });
        const range = Input.with({
            id: `${id}-range`,
            value,
            type: "range",
            class: "form-control form-range",
            attribute: { min, max, step, title },
            style: { height: "auto" },
            event: { input: updateValue },
        });

        this.container.addChild(
            Div.with({
                class: this.classes.input,
                children: [
                    Label.with({
                        class: "form-label mb-0",
                        attribute: { for: `${id}-number` },
                        text: label,
                    }),
                    Span.with({
                        class: "input-group input-group-sm",
                        children: [number, range],
                    }),
                ],
            }),
        );
        return this;
    }

    addColorPicker({ id, value, label }) {
        this.values[id] = value;

        const display = Div.with({
            class: "col-2 input-group-text",
            style: { background: value },
        });

        const colorPicker = Input.with({
            id,
            value,
            type: "text",
            class: "form-control font-monospace",
            event: {
                change: (e) => {
                    this.values[id] = e.value;
                    display.node.style.background = e.value;
                    this.callback?.();
                },
            },
        });

        this.container.addChild(
            Div.with({
                class: this.classes.input,
                children: [
                    Label.with({
                        class: "form-label mb-0",
                        attribute: { for: id },
                        text: label,
                    }),
                    Span.with({
                        class: "input-group input-group-sm",
                        children: [colorPicker, display],
                    }),
                ],
            }),
        );

        return this;
    }
}
