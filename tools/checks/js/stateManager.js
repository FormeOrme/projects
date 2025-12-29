import { setObj, getObj, remove } from "../../../module/LoStMan.js";
import { with_ as reduceWith } from "../../../module/Reduce.js";
import { Dom } from "../../../module/Dom.js";

const PAYER_NAMES_KEY = "PAYER_NAMES";
const TABLE_CONTENT_KEY = "TABLE_CONTENT";
const PAYER_LIST_KEY = "PAYER_LIST";

export function getPayers() {
    const payerInputs = [...Dom.nodes.header.querySelectorAll(".payer")];
    return payerInputs.reduce(
        reduceWith((a, c) => (a[c.dataset.payer] = c.value)),
        {},
    );
}

export function getTableContent() {
    return [...Dom.nodes.mainBody.querySelectorAll(".item")].map((item) => ({
        desc: item.querySelector(".description").value,
        price: Number(item.querySelector(".price").value),
        checks: [...item.querySelectorAll(".check:checked")].map((check) =>
            check.getAttribute("data-payer"),
        ),
    }));
}

export function saveState(savePayers = false) {
    if (savePayers) {
        setObj(PAYER_NAMES_KEY, getPayers());
    }
    setObj(TABLE_CONTENT_KEY, getTableContent());
}

export function loadPayerNames() {
    return getObj(PAYER_NAMES_KEY) ?? {};
}

export function loadTableContent() {
    return getObj(TABLE_CONTENT_KEY) ?? [];
}

export function loadPayerList() {
    return getObj(PAYER_LIST_KEY) ?? null;
}

export function savePayerList(payers) {
    setObj(PAYER_LIST_KEY, payers);
}

export function resetState() {
    remove(PAYER_NAMES_KEY);
    remove(TABLE_CONTENT_KEY);
    remove(PAYER_LIST_KEY);
    location.reload();
}
