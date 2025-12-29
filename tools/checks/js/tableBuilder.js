import { getHID } from "../../../module/IdUtils.js";
import { Div } from "../../../module/Dom.js";

export function createRow(columns, rowData, i) {
    return Div({
        id: getHID(),
        class: "d-flex flex-row mb-1 item",
        children: [
            columns.action.row(),
            columns.description.row(rowData),
            columns.amount.row(rowData),
            ...columns.payerList.row(rowData),
        ],
    });
}

export function createTable(columns, tableContent, getRow, mainBodyRef) {
    return Div({
        attributes: {
            spellcheck: "false",
        },
        children: [
            Div({
                id: "header",
                children: Div({
                    class: "d-flex flex-row mb-1",
                    children: [
                        columns.action.header,
                        columns.description.header,
                        columns.amount.header,
                        ...columns.payerList.header,
                        columns.addPayer.header,
                    ],
                }),
            }),
            Div({
                id: "mainBody",
                children: tableContent.map(getRow),
            }),
            Div({
                id: "footer",
                children: Div({
                    class: "d-flex flex-row mb-1",
                    children: [
                        columns.action.footer(mainBodyRef),
                        columns.description.footer,
                        columns.amount.footer,
                        ...columns.payerList.footer,
                    ],
                }),
            }),
        ],
    });
}

export function buildTable(tableContainer, tableData, columns, getRow, updateTotals, mainBodyRef) {
    tableContainer.innerText = "";
    tableContainer.append(createTable(columns, tableData, getRow, mainBodyRef).create());
    updateTotals();
}
