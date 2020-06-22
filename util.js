/* UTIL */
const toX = (i, w) => i % w
const toY = (i, w) => ~~(i / w)
const toXY = (i, w) => ({ x: toX(i, w), y: toY(i, w) })
const toID = (x, y, w) => y * w + x
const toID_O = (xy, w) => xy.y * w + xy.x
const toID_A = (xy, w) => xy[1] * w + xy[0]
const clone = o => JSON.parse(JSON.stringify(o))