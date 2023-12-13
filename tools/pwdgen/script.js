const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?_:-;';

document.querySelector("body").append(Div.with({
    class: "container",
    children: Pre.with({
        class: "text-wrap text-break-all lh-sm",
        children: Array.from({ length: 1000 }, (v, i) => Span.with({
            innerText: generateRandomString(10, validChars)
        }))
    })
}).create());

function generateRandomString(length, validChars) {
    let result = '';
    const validCharsLength = validChars.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validCharsLength);
        result += validChars[randomIndex];
    }

    return result;
}