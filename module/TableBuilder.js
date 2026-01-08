import { Span } from "./Dom.js";

export default class TableBuilder {
    setColumns(columns) {
        this.columns = columns;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    /**
     * Set the classes for the table, header, header row, header cell, body, row, and cell.
     * `classes` is either a string or a function that returns a string.
     * ```javascript
     *  headerCell: "p-2 col text-truncate fw-bold",
     *  cell: (cell, x) => `p-2 col text-truncate test-${x}`,
     * ```
     * @param {Object} classes - An object containing the classes for each part of the table.
     */
    setClasses(classes) {
        this.classes = classes;
        return this;
    }

    #applyClass(classArg, section, index) {
        // if classArg is a function, call it with the section and index
        if (typeof classArg === "function") {
            return classArg(section, index);
        }
        // otherwise, return the classArg as is
        return classArg;
    }

    build() {
        return Span({
            id: "table",
            class: ["d-flex flex-column", this.classes?.table],
            children: [
                Span({
                    id: "header",
                    class: ["d-flex flex-column", this.classes?.header],
                    children: Span({
                        id: "header-row",
                        class: ["d-flex flex-row", this.classes?.headerRow],
                        children: Object.entries(this.columns).map(([key, column], x) =>
                            Span({
                                id: `header-${key}`,
                                attribute: {
                                    dataKey: key,
                                },
                                class: [
                                    this.#applyClass(this.classes?.headerCell, column, x),
                                    x !== 0 ? "border-start" : "",
                                    ...column.class,
                                ],
                                children: Span(column.label),
                            }),
                        ),
                    }),
                }),
                Span({
                    id: "body",
                    class: ["d-flex flex-column", this.classes?.body],
                    children: this.data.map((row, y) =>
                        Span({
                            id: `row-${y}`,
                            class: ["d-flex flex-row", this.#applyClass(this.classes?.row, row, y)],
                            children: Object.entries(this.columns).map(([key, column], x) =>
                                Span({
                                    id: `cell-${y}-${key}`,
                                    attribute: {
                                        dataKey: key,
                                    },
                                    class: [
                                        this.#applyClass(this.classes?.cell, column, x),
                                        x !== 0 ? "border-start" : "",
                                        ...column.class,
                                    ],
                                    children: column.cellFn ? column.cellFn(row) : Span(row[key]),
                                }),
                            ),
                        }),
                    ),
                }),
            ],
        });
    }
}
