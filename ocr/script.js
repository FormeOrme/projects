document.querySelector("body").append(Div.with({
    class: "container",
    children: [
        H1.with({
            innerText: "OCR"
        }),
        Input.with({
            class: "form-control form-control-sm",
            attribute: {
                type: "file"
            },
            event: {
                input: (e, node) => {
                    tesseractReadFile(node.files[0])
                }
            }
        }),
        Div.with({
            id: "progressContainer",
            class: "progress mb-1",
            attribute: {
                style: "height: 30px"
            },
            children: Div.with({
                id: "progressPercent",
                class: "progress-bar"
            })
        }),
        Pre.with({
            class: "form-control form-control-sm",
            id: "output"
        })
    ]
}).create());


function tesseractReadFile(file) {
    try {
        Tesseract.recognize(
            file,
            'eng',
            {
                logger: l => {
                    const progress = !l.jobId ? 0 : l.progress;
                    Dom.NODES.progressPercent.style = `width: ${(progress * 100).toFixed(0)}%`;
                }
            }
        ).then(({ data: { text } }) => {
            Dom.NODES.output.innerText = text;
        });
    } catch (e) {
        console.log(e);
    }
}


document.querySelector("body").addEventListener('paste', (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            tesseractReadFile(blob);
        }
    }
});