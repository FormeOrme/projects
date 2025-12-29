import { Dom } from "../../../module/Dom.js";
import { saveState } from "./stateManager.js";

export function updateTotals(payers) {
    const total = document.getElementById("total");
    total.value = 0;
    document.querySelectorAll(".price").forEach((amount) => {
        total.value = +total.value + (+amount.value ?? 0);
    });
    total.value = (+total.value).toFixed(2);

    const ids = payers.slice(0, -1);

    ids.forEach((p) => {
        const totalEl = Dom.nodes[`split_${p}`];
        totalEl.value = 0;
        [...document.querySelectorAll("#mainBody .flex-row")].forEach((tr) => {
            const amount = +tr.querySelector(".price")?.value ?? 0;
            const checked = [...tr.querySelectorAll("input[type='checkbox']:checked")];
            const payr = tr.querySelector(`[data-payer="${p}"]`);
            if (payr.checked) {
                totalEl.value = +totalEl.value + amount / checked.length;
            }
        });
        totalEl.value = (+totalEl.value).toFixed(2);
    });

    saveState();
}
