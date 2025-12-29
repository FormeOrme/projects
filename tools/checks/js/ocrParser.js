import Tesseract from "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.esm.min.js";
import { trim } from "../../../module/SUtils.js";

const regex = /(.+)\s([\d,.]+)/;

export function tableDataFromText(text) {
    return text
        .split("\n")
        .map(trim)
        .map((line) => {
            const res = line.match(regex);
            const price = res?.[2]?.trim().replace(/[,. ]+/, `.`);
            const desc = price ? res?.[1]?.trim() : line;
            return { desc, price, line, res };
        })
        .filter((o) => o.desc);
}

export function parseWithTesseract(file, progressContainer, progressPercent, onComplete) {
    progressContainer.show();
    Tesseract.recognize(file, "eng", {
        logger: (l) => {
            const progress = !l.jobId ? 0 : l.progress;
            progressPercent.style = `width: ${(progress * 100).toFixed(0)}%`;
        },
    }).then(({ data: { text } }) => {
        progressContainer.hide();
        onComplete(tableDataFromText(text));
    });
}

export function parseClipboard(clipboardData, parseCallback) {
    const items = clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
            parseCallback(items[i].getAsFile());
        }
    }
}

export function readClipboardItem(data, parseCallback) {
    const clipboardItem = data[0];
    clipboardItem.getType("image/png").then(parseCallback);
}
