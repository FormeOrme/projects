let RESPONSES = [];
const ENDPOINT = "response.json";
const METHOD = 'GET';

function loadDoc() {
    fetch(ENDPOINT, {
        method: METHOD
    })
        .then(r => r.text())
        .then(r => parseR(r));
}

function parseR(r){
    let pr = JSON.parse(JSON.parse(r));
    RESPONSES = RESPONSES.concat(pr.Oggetti);
}