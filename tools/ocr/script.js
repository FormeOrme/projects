document.querySelector("body").append(Div.with({
    class: "container",
    children: [
        H1.with({
            innerText: "OCR"
        }),
        Input.with({
            class: "form-control form-control-sm mb-1",
            attribute: {
                type: "file",
                title: "input"
            },
            event: {
                input: (e, node) => {
                    parse(node.files[0])
                }
            }
        }),
        Div.with({
            id: "progressContainer",
            class: "progress mb-1 position-relative",
            attribute: {
                style: "height: 30px"
            },
            children: [
                Div.with({
                    id: "progressPercent",
                    class: "progress-bar",
                    function: {
                        show: function () { this.classList.remove(Utils.hideClass); },
                        hide: function () { this.classList.add(Utils.hideClass); },
                    },
                }),
                Div.with({
                    id: "progressSpinner",
                    class: "spinner-grow text-primary position-absolute top-50 start-50 translate-middle",
                    function: {
                        show: function () { this.classList.remove(Utils.hideClass); },
                        hide: function () { this.classList.add(Utils.hideClass); },
                    },
                })
            ]
        }),
        Pre.with({
            class: "form-control form-control-sm",
            id: "output"
        })
    ]
}).create());

const progressSpinner = Dom.nodes.querySelector("#progressSpinner");
const progressPercent = Dom.nodes.querySelector("#progressPercent");
const output = Dom.nodes.querySelector("#output");

progressSpinner.classList.add("d-none");

function parse(file) {
    progressPercent.classList.add("d-none");
    progressSpinner.classList.remove("d-none");
    Tesseract.recognize(file, 'eng', {
        logger: l => {
            const progress = !l.jobId ? 0 : l.progress;
            if (progress != 0) {
                progressSpinner.classList.add("d-none");
                progressPercent.classList.remove("d-none");
            }
            progressPercent.style = `width: ${(progress * 100).toFixed(0)}%`;
        }
    }).then(({ data: { text } }) => {
        output.innerText = text;
    });
}


document.querySelector("body").addEventListener('paste', (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            parse(items[i].getAsFile());
        }
    }
});