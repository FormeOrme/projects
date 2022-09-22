const letters = [
    ["T"],
    ["0", "O"],
    ["0", "O"],
    ["L"],
    ["S", "5", "$"]
];
title.innerHTML = letters.map(l=>l[(Math.floor(Math.random()*l.length))]).join("");
