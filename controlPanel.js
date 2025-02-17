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
        const code = Span.with({ class: "mx-1 badge bg-secondary", innerText: value });
        this.values[id] = value;
        this.container.addChild(Div.with({
            class: "col-3",
            children: [
                Label.with({
                    class: "form-label",
                    attribute: {
                        for: id
                    },
                    children: [
                        code,
                        Span.with({
                            innerText: label
                        })
                    ]
                }),
                Input.with({
                    id,
                    value,
                    type: "range",
                    class: "form-range ",
                    attribute: {
                        min,
                        max,
                        step
                    },
                    event: {
                        input: (e) => {
                            code.node.innerText = e.value;
                            this.values[id] = e.value;
                            this.callback();
                        }
                    }
                })
            ]
        }))
        return this;
    }

}