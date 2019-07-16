const readText = (r) => r.text();

const processDDL = (ddl) => {
    var cleanDDL = ddl.replace(/\s+/g, " ").replace(/; /g, ";");

    var CTList = cleanDDL.split(";").filter(e => !!e);
    // ("\w+" \w+ ?(\(\d+(,\d+)?\))?( NOT NULL ENABLE)?, )

    const tables = CTList.map(ddl => {
        const name = ddl.split(/CREATE TABLE "?\w+"?\."?(\w+)"?/)[1];

        const beforePK = ddl.split(/PRIMARY KEY/)[0];

        const pk = ddl.split(/PRIMARY KEY \("?(\w+)"?\)/)[1];
        const fk = ddl.split(/FOREIGN KEY /g)
            .filter((o, i) => { return i != 0 }).map(s => {
                const split = s.split(/\("?(\w+)"?\) REFERENCES "?\w+"?\."?(\w+)"? \("?(\w+)"?/g);
                const table = split[2];
                const pk = split[3];
                const col = split[1];
                return {
                    table_name: table,
                    pk: pk,
                    col: col,
                    split: split,
                    ddl:s,
                }
            }).reduce((a, c) => {
                a[c.col] = c;
                return a;
            }, {});

        const cols = beforePK
            .split(/("?\w+"? \w+ ?(\(\d+(,\d+)?\))?( NOT NULL ENABLE)?, )/)
            .filter((o, i)=>{ return (i-1)%5==0 })
            .map(c=>{
                const name = c.split(/"?(\w+)"?/)[1]

                const isPK = pk == name;
                const _fk = fk[name];

                const col = {
                    name:name,
                    isPK:isPK
                }
                if(!!_fk){
                    col.fk = _fk;
                }

                return col;
            }).reduce((a, c) => {
                a[c.name] = c;
                return a;
            }, {});

        return {
            name: name,
            pk: pk,
            fk: fk,
            cols: cols,
            ddl: ddl,
        }
    }).reduce((a, c) => {
        a[c.name] = c;
        return a;
    }, {});

    Object.values(tables).forEach(e=>{
        Object.values(e.cols).forEach(c=>{
            if(!!c.fk){
                const fkCol = tables[`${c.fk.table_name}`].cols[`${c.fk.pk}`];
                fkCol.fkIn = fkCol.fkIn||[];
                fkCol.fkIn.push(e);
            }
        })
    });
    // Object.values(tables).forEach(t =>  t.fk.forEach(fk => fk.table = tables[fk.table_name]));
    window.tables = tables;

    return tables;
}

const mapToNodeLinks = (tables)=> Object.values(tables).reduce( (a, c)=>{
        a.nodes.push({
            id: c.name,
            pk: c.pk
        });
        Object.values(c.fk).forEach(k=>{
            /* EVITARE CHE CI SIANO DOPPIONI */
            var push = true;
            a.links.filter(l=>l.source==c.name).forEach(l=>{
                push = push && l.target != k.table_name
            })

            if(push){
                a.links.push({
                    source: c.name,
                    target: k.table_name
                })
            }
        });
        return a;
    },  {nodes:[], links:[]})

const drag = simulation => {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

const buildGraphView = (tables) => {
    const width = 400;
    const height = 400;
    const radius = 3;

    const links = tables.links.map(d => Object.create(d));
    const nodes = tables.nodes.map(d => Object.create(d));
    
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX().strength(0.05))
        .force("y", d3.forceY().strength(0.05))
    
    const svg = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width+70, height]);
    
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.2)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("data-target", (o, i)=>tables.links[i].target)
        .attr("data-source", (o, i)=>tables.links[i].source)

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", radius)
        .attr("data-id", d=>d.id)
        .attr("fill", "#000")
        .call(drag(simulation))

    const text = svg.append("g")
        .attr("font-size", 5)
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text(d => d.id)
        .attr("data-id", d=>d.id)
        .call(drag(simulation));

    const highlight = (/*object*/ o, /*index*/ i, /*fullarray*/ a)=>{
        Array.from(document.getElementsByClassName("highlight"))
            .forEach(e=>{
                e.classList.remove("highlight")
                e.classList.remove("target")
                e.classList.remove("source")
                e.classList.remove("fk")
            })
        const id = a[i].dataset.id
        
        document.querySelectorAll(`[data-id="${id}"]`).forEach(q=>q.classList.add("highlight", "source"))

        tables.links.filter(l=> l.source==id)
            .forEach(l=>{
                document.querySelectorAll(`[data-id="${l.target}"]`).forEach(q=>q.classList.add("highlight", "target"))
            })
        tables.links.filter(l=> l.target==id)
            .forEach(l=>{
                document.querySelectorAll(`[data-id="${l.source}"]`).forEach(q=>q.classList.add("highlight", "fk"))
            })
    };
    
    node.on("click", highlight)
    text.on("click", highlight)

    node.append("title")
        .text(d => d.id);
    
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        text
            .attr("x", d => d.x + 4)
            .attr("y", d => d.y + 1.5);
    });
    
    //invalidation.then(() => simulation.stop());
    
    return svg.node();

}

const buildTableView = (tables) => {
    Object.values(tables).forEach(t=>{
        const row = document.createElement("div");
        row.classList.add("table")
        row.id = t.name
        const title = document.createElement("h3");
        const ta = document.createElement("a"); // TABLE NAME
        ta.innerText = t.name
        ta.href = `#${t.name}`
        title.append(ta);

        const ul = document.createElement("ul");
        Object.values(t.cols).forEach(k=>{
            const li = document.createElement("li");
            if(k.isPK){
                li.classList.add("pk");
            }
            const a = document.createElement("a"); // FIELD NAME
            a.innerText = k.name
            if(!!k.fk){
                a.href = `#${k.fk.table_name}`
            }
            li.append(a);
            
            if(!!k.fkIn){
                const fkul = document.createElement("ul");
                k.fkIn.forEach((t)=>{
                    const fkli = document.createElement("li");
                    const fka = document.createElement("a"); // FOREIGN KEY IN TABLE NAME
                    fka.innerText = t.name
                    fka.href = `#${t.name}`
                    fkli.append(fka);
                    fkul.append(fkli);
                });
                li.append(fkul);
            }

            ul.append(li);
        });
        row.append(title);
        row.append(ul);

        const container = document.getElementById("table_wrapper");
        container.append(row);
    })
}