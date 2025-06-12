import { Span } from "./Dom.js";
import { Utils } from "./Utils.js";

export class TableBuilder {

    setColumns(columns) {
        this.columns = columns;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setClasses(classes) {
        this.classes = classes;
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
            class: [
                "d-flex flex-column",
                this.classes?.table
            ],
            children: [
                Span.with({
                    id: "header",
                    class: [
                        "d-flex flex-column",
                        this.classes?.header
                    ],
                    children: Span.with({
                        id: "header-row",
                        class: [
                            "d-flex flex-row",
                            this.classes?.headerRow
                        ],
                        children: Object.keys(this.columns).map((key, x) => Span.with({
                            id: `header-${key}`,
                            class: [
                                this.classes?.headerCell,
                                x !== 0 ? "border-start" : "",
                                ...Utils.compact(this.columns[key].class)
                            ],
                            children: this.buildCell(this.columns[key].label)
                        }))
                    })
                }),
                Span.with({
                    id: "body",
                    class: [
                        "d-flex flex-column",
                        this.classes?.body
                    ],
                    children: this.data.map((row, y) => Span.with({
                        id: `row-${y}`,
                        class: [
                            "d-flex flex-row",
                            this.classes?.row,
                        ],
                        children: Object.keys(this.columns).map((key, x) => {
                            const column = this.columns[key];
                            return Span.with({
                                id: `cell-${y}-${key}`,
                                class: [
                                    this.classes?.cell,
                                    x !== 0 ? "border-start" : "",
                                    ...Utils.compact(column.class)
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