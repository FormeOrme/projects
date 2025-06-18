import { Span } from "./Dom.js";
import { Utils } from "./Utils.js";

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

    buildCell(text, clazz = "") {
        return Span.with({
            text,
            class: clazz,
        });
    }

    manageClass(clazz, cell, index) {
        // if clazz is a function, call it with the cell and index
        if (typeof clazz === "function") {
            return clazz(cell, index);
        }
        // otherwise, return the clazz as is
        return clazz;
    }

    build() {
        return Span.with({
            id: "table",
            class: ["d-flex flex-column", this.classes?.table],
            children: [
                Span.with({
                    id: "header",
                    class: ["d-flex flex-column", this.classes?.header],
                    children: Span.with({
                        id: "header-row",
                        class: ["d-flex flex-row", this.classes?.headerRow],
                        children: Object.entries(this.columns).map(([key, column], x) =>
                            Span.with({
                                id: `header-${key}`,
                                attribute: {
                                    dataKey: key,
                                },
                                class: [
                                    this.manageClass(this.classes?.headerCell, column, x),
                                    x !== 0 ? "border-start" : "",
                                    ...Utils.compact(column.class),
                                ],
                                children: this.buildCell(column.label),
                            }),
                        ),
                    }),
                }),
                Span.with({
                    id: "body",
                    class: ["d-flex flex-column", this.classes?.body],
                    children: this.data.map((row, y) =>
                        Span.with({
                            id: `row-${y}`,
                            class: ["d-flex flex-row", this.classes?.row],
                            children: Object.entries(this.columns).map(([key, column], x) =>
                                Span.with({
                                    id: `cell-${y}-${key}`,
                                    attribute: {
                                        dataKey: key,
                                    },
                                    class: [
                                        this.manageClass(this.classes?.cell, column, x),
                                        x !== 0 ? "border-start" : "",
                                        ...Utils.compact(column.class),
                                    ],
                                    children: column.cellFn
                                        ? column.cellFn(row)
                                        : this.buildCell(row[key]),
                                }),
                            ),
                        }),
                    ),
                }),
            ],
        });
    }
}
