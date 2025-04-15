class TableBuilder {

    setHeaders(columns) {
        this.columns = columns;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    buildCell(text, clazz = '') {
        return Span.with({
            text,
            class: clazz
        })
    }

    build() {
        return Span.with({
            id: "table",
            class: "d-flex flex-column m-2 border rounded-3 shadow-sm",
            children: [
                Span.with({
                    id: "header",
                    class: "d-flex flex-column bg-body-tertiary",
                    children: Span.with({
                        id: "header-row",
                        class: "d-flex flex-row",
                        children: Object.keys(this.columns).map((key, x) => Span.with({
                            id: `header-${key}`,
                            class: [
                                "p-2 col text-truncate",
                                x !== 0 ? "border-start" : "",
                                this.columns[key].class ?? ""
                            ],
                            children: this.buildCell(this.columns[key].label, "fw-bold")
                        }))
                    })
                }),
                Span.with({
                    id: "body",
                    class: "d-flex flex-column",
                    children: this.data.map((row, y) => Span.with({
                        id: `row-${y}`,
                        class: "d-flex flex-row border-top",
                        children: Object.keys(columns).map((key, x) => {
                            const column = this.columns[key];
                            return Span.with({
                                id: `cell-${y}-${key}`,
                                class: [
                                    "p-2 col text-truncate",
                                    x !== 0 ? "border-start" : "",
                                    column.class ?? ""
                                ],
                                children: column.cellFn ? column.cellFn(row) : this.buildCell(row[key])
                            })
                        })
                    }))
                }),
            ]
        })
    }
}