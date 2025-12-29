import { Dom, Div, Input, Button, I } from "../../../module/Dom.js";
import Relation from "../../../module/Relation.js";
import {
    createDescriptionColumn,
    createAmountColumn,
    PayerColumnManager,
    createActionColumn,
    createAddPayerColumn,
} from "./columns.js";
import { createRow, buildTable } from "./tableBuilder.js";
import { parseWithTesseract, parseClipboard, readClipboardItem } from "./ocrParser.js";
import { saveState, loadPayerNames, loadTableContent, resetState } from "./stateManager.js";
import { updateTotals as updateTotalsBase } from "./totalsCalculator.js";

// Initialize state
const payerNamesInit = loadPayerNames();
const tableContentInit = loadTableContent();

// Payers configuration
const payers = ["F", "M", "D", "T"];

// Item-Payer relationship tracker
const itemPayerEdge = new Relation({
    getAId: (o) => o.id,
});

// Create update totals function bound to payers
function updateTotals() {
    updateTotalsBase(payers);
}

// Create columns
const description = createDescriptionColumn(saveState);
const amount = createAmountColumn(updateTotals);
const payerList = new PayerColumnManager(
    payers,
    payerNamesInit,
    updateTotals,
    itemPayerEdge,
).build();
const action = createActionColumn(saveState, updateTotals, getRow);
const addPayer = createAddPayerColumn();

const columns = { action, description, amount, payerList, addPayer };

function getRow(rowData, i) {
    return createRow(columns, rowData, i);
}

function getMainBodyRef() {
    return Dom.nodes.mainBody;
}

function handleBuildTable(tableData) {
    const tableContainer = Dom.nodes.TableContainer;
    buildTable(tableContainer, tableData, columns, getRow, updateTotals, getMainBodyRef);
}

function handleParseWithTesseract(file) {
    parseWithTesseract(
        file,
        Dom.nodes.progressContainer,
        Dom.nodes.progressPercent,
        handleBuildTable,
    );
}

// Build the UI
document.querySelector("body").append(
    Div({
        class: ["container", "mt-1"],
        children: [
            Div({
                class: "mb-1 input-group",
                children: [
                    Input({
                        class: "form-control form-control-sm me-2",
                        attribute: {
                            type: "file",
                        },
                        event: {
                            input: (node) => {
                                try {
                                    handleParseWithTesseract(node.files[0]);
                                } catch (e) {
                                    console.log(e);
                                }
                            },
                        },
                    }),
                    Div({
                        class: "input-group-append",
                        children: Div({
                            class: "btn-group",
                            children: [
                                Button({
                                    class: "btn btn-outline-success btn-sm",
                                    attribute: { title: "paste and parse" },
                                    children: I({ class: "bi bi-clipboard-plus" }),
                                    event: {
                                        click: () =>
                                            navigator.clipboard
                                                ?.read()
                                                .then((data) =>
                                                    readClipboardItem(
                                                        data,
                                                        handleParseWithTesseract,
                                                    ),
                                                ),
                                    },
                                }),
                                Button({
                                    class: "btn btn-outline-warning btn-sm",
                                    attribute: { title: "reset" },
                                    children: I({
                                        class: "bi bi-arrow-counterclockwise",
                                    }),
                                    event: {
                                        click: resetState,
                                    },
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            Div({
                id: "progressContainer",
                class: "progress mb-1",
                style: {
                    height: "30px",
                },
                function: {
                    show: function () {
                        this.classList.remove("d-none");
                    },
                    hide: function () {
                        this.classList.add("d-none");
                    },
                },
                children: Div({
                    id: "progressPercent",
                    class: "progress-bar",
                }),
            }),
            Div({
                id: "TableContainer",
            }),
        ],
    }).create(),
);

// Initialize
Dom.nodes.progressContainer.hide();
handleBuildTable(tableContentInit);

// Clipboard paste handler
document
    .querySelector("body")
    .addEventListener("paste", (event) =>
        parseClipboard(event?.clipboardData || window.clipboardData, handleParseWithTesseract),
    );
