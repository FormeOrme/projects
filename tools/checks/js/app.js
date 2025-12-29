import { Dom, Div, Input, Button, I } from "../../../module/Dom.js";
import Relation from "../../../module/Relation.js";
import {
    createDescriptionColumn,
    createAmountColumn,
    PayerColumnManager,
    createActionColumn,
    createAddPayerColumn,
    createPayerHeaderCell,
    createPayerRowCell,
    createPayerFooterCell,
} from "./columns.js";
import { createRow, buildTable } from "./tableBuilder.js";
import { parseWithTesseract, parseClipboard, readClipboardItem } from "./ocrParser.js";
import {
    saveState,
    loadPayerNames,
    loadTableContent,
    resetState,
    loadPayerList,
    savePayerList,
} from "./stateManager.js";
import { updateTotals as updateTotalsBase } from "./totalsCalculator.js";

// Initialize state
const payerNamesInit = loadPayerNames();
const tableContentInit = loadTableContent();

// Payers configuration - load from storage or use default
const DEFAULT_PAYERS = ["F", "M", "D", "T"];
const payers = loadPayerList() ?? [...DEFAULT_PAYERS];

// Item-Payer relationship tracker
const itemPayerEdge = new Relation({
    getAId: (o) => o.id,
});

// Create update totals function bound to payers
function updateTotals() {
    updateTotalsBase(payers);
}

// Handler to rename or remove a payer column
function handlePayerChange(oldPayerId, newName) {
    const payerIndex = payers.indexOf(oldPayerId);
    if (payerIndex === -1) return;

    if (newName === "") {
        // Remove the payer
        payers.splice(payerIndex, 1);
        savePayerList(payers);

        // Remove all DOM elements with this payer-id
        document.querySelectorAll(`[data-payer-id="${oldPayerId}"]`).forEach((el) => el.remove());

        updateTotals();
        saveState();
    } else {
        // Just save the new display name (payer ID stays the same)
        saveState(true);
    }
}

// Handler to add a new payer column dynamically
function handleAddPayer(newPayerId) {
    // Check if payer already exists
    if (payers.includes(newPayerId)) {
        return;
    }

    // Add to payers array
    payers.push(newPayerId);
    savePayerList(payers);

    // Find the addPayer column in header to insert before it
    const headerRow = Dom.nodes.header.querySelector(".flex-row");
    const addPayerHeaderCell = headerRow.lastElementChild;
    const newHeaderCell = createPayerHeaderCell(newPayerId, newPayerId, handlePayerChange).create();
    headerRow.insertBefore(newHeaderCell, addPayerHeaderCell);

    // Add checkbox cell to each existing row
    const rows = [...Dom.nodes.mainBody.querySelectorAll(".item")];
    rows.forEach((row) => {
        const newRowCell = createPayerRowCell(newPayerId, updateTotals).create();
        row.appendChild(newRowCell);
    });

    // Add footer cell before the addPayer footer
    const footerRow = Dom.nodes.footer.querySelector(".flex-row");
    const addPayerFooterCell = footerRow.lastElementChild;
    const newFooterCell = createPayerFooterCell(newPayerId).create();
    footerRow.insertBefore(newFooterCell, addPayerFooterCell);

    // Update the payerList in columns for new rows
    columns.payerList.header.push(createPayerHeaderCell(newPayerId, newPayerId, handlePayerChange));
    columns.payerList.footer.push(createPayerFooterCell(newPayerId));

    updateTotals();
    saveState();
}

// Create columns
const description = createDescriptionColumn(saveState);
const amount = createAmountColumn(updateTotals);
const payerList = new PayerColumnManager(
    payers,
    payerNamesInit,
    updateTotals,
    itemPayerEdge,
    handlePayerChange,
).build();
const action = createActionColumn(saveState, updateTotals, getRow);
const addPayer = createAddPayerColumn(handleAddPayer);

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

async function handleParseWithTesseract(file) {
    await parseWithTesseract(
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
