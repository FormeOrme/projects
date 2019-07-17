var imgs = [
    "r1.png", 
    "r2.png", 
    "r3.png", 
    "r4.png", 
    "r5.png"];

const clone = (selector)=>document.querySelector(selector).cloneNode("true")

const container = document.getElementById("container")

const src = () => imgs[Math.floor(Math.random()*imgs.length)]

const findImage = node => {
    if(node.nodeName == "IMG"){
        return [node];
    } else {        
        return Array.from(node.children).reduce((a, c)=>{
            a.push(...findImage(c))
            return a;
        }, []);
    }
}

const addSheet = ()=>{
    const sheet = clone(".sheet");
    const s = src()
    findImage(sheet).forEach(i=>i.src = `src\\${s}`);
    container.append(sheet);
}

window.addEventListener("click", addSheet, false)

setInterval(addSheet, 300);