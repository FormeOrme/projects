const SIDE = 8

const toXY = (i, w) => ({ x: i % w, y: ~~(i / w) })

const toID = (xy, w) => xy.y * w + xy.x

const calcNbr = (i, w) => {
    let xy = toXY(i, w)
    return [
        { x: xy.x + 1, y: xy.y },
        { x: xy.x - 1, y: xy.y },
        { x: xy.x, y: xy.y + 1 },
        { x: xy.x, y: xy.y - 1 },
    ]
        .filter(o => o.x >= 0 && o.x < w)
        .filter(o => o.y >= 0 && o.y < w)
        .map(xy => toID(xy, w))
}

const GAMESTATE = {
    moves: 0,
}

const STATUS = Array(3).fill().map((o, i) => i)

class Cell {
    constructor(id, container) {
        this.id = id
        this.dom = document.createElement("span")
        this.dom.dataset.status = STATUS[~~(Math.random() * STATUS.length)]
        this.dom.classList.add("cell")

        this.dom.addEventListener("mousemove", (e) => {
            if (!GAMESTATE.active) {
                this.dom.classList.add("over")
                this.nbr.map(i => {
                    if (CELLS[i].dom.dataset.status != this.dom.dataset.status) {
                        CELLS[i].dom.classList.add("nbr")
                    }
                })
            }
        })

        this.dom.addEventListener("mouseleave", (e) => {
            if (!GAMESTATE.active) {
                this.dom.classList.remove("over")
                this.nbr.map(i => CELLS[i].dom.classList.remove("nbr"))
            }
        })

        this.dom.addEventListener("click", (e) => {
            if (!GAMESTATE.active) {
                GAMESTATE.active = this
                this.dom.classList.add("active")
            } else {
                if (this.id == GAMESTATE.active.id) {
                    this.dom.classList.remove("active")
                    GAMESTATE.active = null
                }
                if (this.dom.classList.contains("nbr")) {
                    let status = STATUS.filter(s => s != this.status() && s != GAMESTATE.active.status())

                    this.dom.dataset.status = status
                    GAMESTATE.active.dom.dataset.status = status

                    GAMESTATE.active.dom.classList.remove("active")
                    GAMESTATE.active = null

                    Array.from(document.querySelectorAll(".over")).map(d => d.classList.remove("over"))
                    Array.from(document.querySelectorAll(".nbr")).map(d => d.classList.remove("nbr"))

                    GAMESTATE.moves++
                    MOVES.innerText = GAMESTATE.moves
                }

                if (Array.from(new Set(CELLS.map(c => c.status()))).length == 1) {
                    HS.innerText = GAMESTATE.moves
                    GAMESTATE.moves = 0
                    MOVES.innerText = GAMESTATE.moves
                }

            }
        })

        this.nbr = calcNbr(id, SIDE);

        container.append(this.dom)
    }

    status = () => this.dom.dataset.status
}

const BOARD = document.getElementById("board")
const MOVES = document.getElementById("moves")
const HS = document.getElementById("hs")


const CELLS = [...Array(SIDE * SIDE)].map((_, i) => new Cell(i, BOARD))