class ControlPanel {
    constructor(args) {
        this.container = Div.with({
            ...args,
            class: "row"
        });
        this.callback = args.callback;
        this.values = {};
    }

    get() {
        return this.container;
    }

    addRange({ id, min = 0, max = 100, step, value, label }) {
        this.values[id] = value;

        const controlPanel = this;

        function updateValue(e) {
            const value = Number(e.value);
            text.node.value = value;
            slider.node.value = value;
            controlPanel.values[id] = value;
            controlPanel.callback();
        }

        const text = Input.with({
            id,
            value,
            type: "number",
            class: "col-2 input-group-text",
            event: { input: updateValue }
        })
        const slider = Input.with({
            id,
            value,
            type: "range",
            class: "form-control form-range",
            attribute: { min, max, step },
            style: { height: "auto" },
            event: { input: updateValue }
        })

        this.container.addChild(Div.with({
            class: "col-3 mb-1",
            children: [
                Label.with({
                    class: "form-label mb-0",
                    attribute: { for: id },
                    text: label
                }),
                Span.with({
                    class: "input-group input-group-sm",
                    children: [text, slider]
                }),
            ]
        }))
        return this;
    }

    addColorPicker({ id, value, label }) {
        this.values[id] = value;

        const colorPicker = Input.with({
            id,
            value,
            type: "color",
            class: "form-control",
            style: { height: "31px" },
            event: {
                change: (e) => {
                    this.values[id] = e.value;
                    this.callback();
                }
            }
        });

        this.container.addChild(Div.with({
            class: "col-3 mb-1",
            children: [
                Label.with({
                    class: "form-label mb-0",
                    attribute: { for: id },
                    text: label
                }),
                Span.with({
                    class: "input-group input-group-sm",
                    children: colorPicker
                }),
            ]
        }))

        return this;
    }

}