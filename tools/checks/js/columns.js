import { getHID } from "../../../module/IdUtils.js";
import { Div, Input, Button, I, Label, Span } from "../../../module/Dom.js";

const BUTTON_CLASSES = "col-05 col-md-1 col-lg-1 ";

export function createDescriptionColumn(saveState) {
    return {
        header: Div({
            class: "col-4 me-1",
            children: Span("Description"),
        }),
        row: (rowData) =>
            Div({
                class: "col-4 me-1",
                children: Input({
                    class: "form-control form-control-sm description",
                    value: rowData?.desc ?? "",
                    event: {
                        input: saveState,
                    },
                }),
            }),
        footer: Div({
            class: "col-4 me-1",
        }),
    };
}

export function createAmountColumn(updateTotals) {
    return {
        header: Div({
            class: "col-1 me-1",
            children: Span("Amount"),
        }),
        row: (rowData) =>
            Div({
                class: "col-1 me-1",
                children: Input({
                    class: "form-control form-control-sm px-1 price",
                    value: rowData?.price ? Number(rowData.price).toFixed(2) : "",
                    attribute: {
                        type: "number",
                        step: ".1",
                    },
                    event: {
                        input: () => updateTotals(),
                        change: (node) => {
                            node.value = Number(node.value).toFixed(2);
                        },
                    },
                }),
            }),
        footer: Div({
            class: "col-1 me-1",
            children: Input({
                id: "total",
                class: "form-control form-control-sm px-1 total-amount",
                attribute: {
                    readonly: "",
                },
            }),
        }),
    };
}

export class PayerColumnManager {
    constructor(payers, payerNamesInit, updateTotals, itemPayerEdge) {
        this.payerIds = [];
        this.payers = payers;
        this.payerNamesInit = payerNamesInit;
        this.updateTotals = updateTotals;
        this.itemPayerEdge = itemPayerEdge;
        this.header = [];
        this.row = [];
        this.footer = [];
    }

    buildHeader(p, index) {
        const id = getHID();
        this.payerIds.splice(index, 0, id);
        return Div({
            class: [BUTTON_CLASSES, "me-1"],
            children: Input({
                class: "payer form-control form-control-sm",
                value: this.payerNamesInit[p] ?? p,
                attribute: {
                    dataPayer: p,
                },
                event: {
                    change: () => {},
                },
            }),
        });
    }

    buildRow(p, index, rowData) {
        const id = getHID();
        const self = this;
        return Div({
            class: [BUTTON_CLASSES, "me-1"],
            children: [
                Input({
                    id,
                    class: "btn-check check",
                    attribute: {
                        type: "checkbox",
                        dataPayer: p,
                        ...(rowData?.checks?.includes(p) ? { checked: "" } : {}),
                    },
                    event: {
                        input: (node) => {
                            const row = node.closest(".item");

                            self.itemPayerEdge.set(row, self.payerIds[index]);
                            console.log(JSON.stringify(self.itemPayerEdge));

                            const checked = row.querySelectorAll("input:checked").length > 0;
                            [...row.querySelectorAll("input[type='checkbox']+.btn")].forEach(
                                (btn) => {
                                    btn.classList.toggle("btn-outline-primary", checked);
                                    btn.classList.toggle("btn-outline-danger", !checked);
                                },
                            );
                            self.updateTotals();
                        },
                    },
                }),
                Label({
                    class: [
                        "btn btn-sm col-12",
                        rowData?.checks?.length != 0 ? "btn-outline-primary" : "btn-outline-danger",
                    ],
                    attribute: {
                        for: id,
                    },
                    children: I({ class: "bi bi-check-lg" }),
                }),
            ],
        });
    }

    buildFooter(p) {
        return Div({
            class: BUTTON_CLASSES + "me-1",
            children: Input({
                id: `split_${p}`,
                class: "form-control form-control-sm px-1 split-amount",
                attribute: {
                    readonly: "",
                    "data-payer": p,
                },
            }),
        });
    }

    build() {
        return {
            header: this.payers.map(this.buildHeader.bind(this)),
            row: (rowData) =>
                this.payers.map((p, index) => this.buildRow.bind(this)(p, index, rowData)),
            footer: this.payers.map(this.buildFooter.bind(this)),
        };
    }
}

export function createActionColumn(saveState, updateTotals, getRow) {
    return {
        header: Div({
            class: [BUTTON_CLASSES, "me-1"],
        }),
        row: () =>
            Div({
                class: [BUTTON_CLASSES, "me-1"],
                children: Button({
                    class: "btn btn-sm btn-outline-danger col-12",
                    children: I({ class: "bi bi-trash-fill" }),
                    type: "button",
                    event: {
                        click: (node, e) => {
                            e.target.closest(".flex-row").remove();
                            saveState();
                            updateTotals();
                        },
                    },
                }),
            }),
        footer: (mainBodyRef) =>
            Div({
                class: [BUTTON_CLASSES, "me-1"],
                children: Button({
                    class: "btn btn-sm btn-success col-12",
                    children: I({ class: "bi bi-plus-lg" }),
                    type: "button",
                    event: {
                        click: () => mainBodyRef().append(getRow().create()),
                    },
                }),
            }),
    };
}

export function createAddPayerColumn() {
    return {
        header: Div({
            class: [BUTTON_CLASSES, "me-1"],
            children: Input({
                class: "payer form-control form-control-sm",
                event: {
                    change: function () {
                        const newPayer = this.value.trim();
                        // This would need to be connected to a handler
                        this.value = "";
                    },
                },
            }),
        }),
    };
}
