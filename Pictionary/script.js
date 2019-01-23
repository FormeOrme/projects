document.addEventListener('DOMContentLoaded', init, false);

const CURRENT = {};

const MAP = {
"P" : "P" ,
"A" : "actions",
"O" : "objects",
"D" : "hard",
"AP": "allplay",
}

document.addEventListener('click', e=>{
    if(e.target.id == "reroll" || e.target.parentElement.id == "reroll"){
        roll();
    }
}, false);

function init() {
    CURRENT.words = {};
    fetch("words.json")
	.then(r => r.json())
    .then(j=>CURRENT.words=j).then(
        ()=>{
            CURRENT.words.P = ["people", "animals"].reduce((a,c)=>{a.push(...CURRENT.words[c]); return a}, []);
            CURRENT.words.allplay = ["people", "animals", "objects", "hard", "actions"].reduce((a,c)=>{a.push(...CURRENT.words[c]); return a}, []);
            roll();
        }
    );

    CURRENT.section = {
        P: document.getElementById("P" ),
        A: document.getElementById("A" ),
        O: document.getElementById("O" ),
        D: document.getElementById("D" ),
        AP:document.getElementById("AP"),
    };
    Object.values(CURRENT.section).map(s => {s.word = s.children[0]});
}
function roll(){
    document.querySelectorAll(".allplay").forEach(e=>e.classList.remove("allplay"));
    Object.values(CURRENT.section).map(s=>{
        s.word.innerText = getRandom(s.id);
        if(Math.random()>0.7){
            s.word.classList.add("allplay");
        }
    });
}

function getRandom(t){
    return CURRENT.words[MAP[t]][ Math.floor(Math.random()*CURRENT.words[MAP[t]].length)];
}
