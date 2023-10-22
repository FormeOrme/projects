const payers = "123456#".split("");

const BUTTON_CLASSES = "col-2 col-md-1 col-lg-1 ";

const columns = {
    description: {
        header: Div.with({
            class: "col-4 me-1",
            children: Span.with({
                innerText: "Description"
            })
        }),
        row: t => Div.with({
            class: "col-4 me-1",
            children: Input.with({
                class: "form-control form-control-sm",
                value: t.trim().match(/(.+)\d+,\d{2}$/g)?.at(0) ?? t
            })
        }),
        footer: Div.with({
            class: "col-4 me-1",
        })
    },
    amount: {
        header: Div.with({
            class: "col-2 me-1",
            children: Span.with({
                innerText: "Amount"
            })
        }),
        row: t => Div.with({
            class: "col-2 me-1",
            children: Input.with({
                class: "form-control form-control-sm px-1 amount",
                value: t.trim().match(/(\d+,\d{2})$/g)?.at(0).replace(",", ".") ?? "",
                attribute: {
                    type: "number",
                    content: "amount",
                    step: ".1"
                },
                event: {
                    input: () => updateTotals()
                }
            })
        }),
        footer: Div.with({
            class: "col-2 me-1",
            children: Input.with({
                id: "total",
                class: "form-control form-control-sm px-1 amount",
                attribute: {
                    readonly: true,
                    type: "number"
                }
            })
        })
    },
    payerList: {
        header: payers.map(p =>
            Div.with({
                class: BUTTON_CLASSES + "me-1",
                children: ("#" == p)
                    ? Button.with({
                        class: "btn btn-sm btn-success col-12",
                        children: I.with({ class: "bi bi-plus-lg" }),
                        type: "button",
                        event: {
                        }
                    })
                    : Input.with({
                        class: "form-control form-control-sm",
                        value: p
                    })
            })
        ),
        row: t => payers.map(p => Div.with({
            class: BUTTON_CLASSES + "me-1",
            children: ("#" == p)
                ? undefined
                : [
                    Input.with({
                        id: id = Utils.HID,
                        class: "btn-check",
                        attribute: {
                            type: "checkbox",
                            payer: p,
                        },
                        event: {
                            input: (e) => {
                                const row = e.target.closest(".flex-row");
                                const checked = row.querySelectorAll("input:checked").length > 0;
                                [...row.querySelectorAll("input[type='checkbox']+.btn")].forEach((btn) => {
                                    btn.classList.toggle("btn-outline-primary", checked);
                                    btn.classList.toggle("btn-outline-danger", !checked);
                                })
                                updateTotals()
                            }
                        }
                    }),
                    Label.with({
                        class: "btn btn-sm btn-outline-danger col-12",
                        attribute: {
                            for: id
                        },
                        children: I.with({ class: "bi bi-check-lg" }),
                    }),
                ]
        })),
        footer: payers.map(p =>
            Div.with({
                class: BUTTON_CLASSES + "me-1",
                children: ("#" == p)
                    ? undefined
                    : Input.with({
                        id: `total_${p}`,
                        class: "form-control form-control-sm px-1 amount",
                        attribute: {
                            readonly: true,
                            type: "number",
                            payer: p
                        }
                    })
            })
        )
    },
    action: {
        header: Div.with({
            class: BUTTON_CLASSES + "me-1"
        }),
        row: t => Div.with({
            class: BUTTON_CLASSES + "me-1",
            children: Button.with({
                class: "btn btn-sm btn-danger col-12",
                children: I.with({ class: "bi bi-trash-fill" }),
                type: "button",
                event: {
                    click: (e) => {
                        e.target.closest(".flex-row").remove();
                        updateTotals();
                    }
                }
            })
        }),
        footer: Div.with({
            class: BUTTON_CLASSES + "me-1",
            children: Button.with({
                class: "btn btn-sm btn-success col-12",
                children: I.with({ class: "bi bi-plus-lg" }),
                type: "button",
                event: {
                    click: (e) => {
                        const body = document.getElementById("mainBody");
                        body.append(getRow().create());
                    }
                }
            })
        })
    }
}

const getRow = (t = "", i) => Div.with({
    class: "d-flex flex-row mb-1",
    children: [
        columns.action.row(t),
        columns.description.row(t),
        columns.amount.row(t),
        ...columns.payerList.row(t, i),
    ]
})

const getTable = (text = "") => Div.with({
    children: [
        Div.with({
            children: Div.with({
                class: "d-flex flex-row mb-1",
                children: [
                    columns.action.header,
                    columns.description.header,
                    columns.amount.header,
                    ...columns.payerList.header,
                ]
            })
        }),
        Div.with({
            id: "mainBody",
            children: text?.trim().split(/\n/g).map(getRow)
        }),
        Div.with({
            children: Div.with({
                class: "d-flex flex-row mb-1",
                children: [
                    columns.action.footer,
                    columns.description.footer,
                    columns.amount.footer,
                    ...columns.payerList.footer,
                ]
            })
        })
    ]
});

const buildTable = text => {
    const tableContainer = Dom.NODES.TableContainer;
    tableContainer.innerText = "";
    tableContainer.append(getTable(text).create());
}

const updateTotals = () => {
    const total = document.getElementById("total");
    total.value = 0;
    [...document.querySelectorAll("[content='amount']")].forEach(q => {
        total.value = +total.value + (+q.value ?? 0);
    });
    total.value = Math.floor(+total.value * 100) / 100;

    const ids = payers.slice(0, -1);

    ids.forEach(p => {
        const total = Dom.NODES[`total_${p}`];
        total.value = 0;
        [...document.querySelectorAll("#mainBody .flex-row")].forEach(tr => {
            const amount = +tr.querySelector("[content='amount']")?.value ?? 0;
            const checked = [...tr.querySelectorAll("input[type='checkbox']:checked")];
            const payr = tr.querySelector(`[payer="${p}"]`);
            if (payr.checked) {
                total.value = +total.value + amount / checked.length;
            }
        });
        total.value = (+total.value).toFixed(2);
    })
}

document.querySelector("body").append(Div.with({
    class: ["container", "mt-1"],
    children: [
        Div.with({
            class: "mb-1",
            children: [
                Input.with({
                    class: "form-control form-control-sm",
                    attribute: {
                        type: "file"
                    },
                    event: {
                        input: (e, node) => {
                            try {
                                Dom.NODES.progressContainer.show();
                                Tesseract.recognize(
                                    node.files[0],
                                    'eng',
                                    {
                                        logger: l => {
                                            const progress = !l.jobId ? 0 : l.progress;
                                            Dom.NODES.progressPercent.style = `width: ${(progress * 100).toFixed(0)}%`;
                                        }
                                    }
                                ).then(({ data: { text } }) => {
                                    Dom.NODES.progressContainer.hide();
                                    buildTable(text);
                                    updateTotals();
                                });
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }
                })
            ]
        }),
        Div.with({
            id: "progressContainer",
            class: "progress mb-1",
            attribute: {
                style: "height: 30px"
            },
            function: {
                show: function () { this.classList.remove(Utils.hideClass); },
                hide: function () { this.classList.add(Utils.hideClass); },
            },
            children: Div.with({
                id: "progressPercent",
                class: "progress-bar"
            })
        }),
        Div.with({
            id: "TableContainer"
        })
    ]
}).create());
Dom.NODES.progressContainer.hide();
buildTable();

class GroupManager {
    constructor(apikey, id) {
        this.id = id;
        this.apikey = apikey;
        this.headers = new Headers({
            "accept": "application/json",
            "x-apikey": this.apikey,
        })
    }

    fetchGroup() {
        return Utils.fetchJson({
            url: `https://forme-2c6a.restdb.io/rest/group/${this.id}`,
            options: {
                method: "GET",
                headers: this.headers,
            }
        });
    }
}

const gm = new GroupManager("64f0d8dc6888543fa50bfdc7", "64fed967c3fd264000016a6f")
