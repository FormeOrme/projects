const username = 'FormeOrme';
const repoName = 'projects';
const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents`;
const link = (path) => `https://formeorme.github.io/projects/${path}/`;

Dom.qs("head").append(Link.with({
    attribute:{
        rel:"icon",
        type:"image/x-icon",
        href:"./favicon.ico"
    }
}).create());

Utils.fetchJson({
    url: apiUrl
}).then(response => {

    Dom.qs("body").append(Div.with({
        class: "container",
        children: [
            H1.with({
               innerText: "Projects" 
            }),
            Div.with({
                class:"d-flex flex-wrap",
                children: response.json
                    .filter(r => r.size === 0)
                    .sort((r1, r2) => Sort.alpha(r => r.path))
                    .map(r => Span.with({
                        class: "flex-fill",
                        children: A.with({
                            class: "btn btn-light",
                            attribute: {
                                href: link(r.path)
                            },
                            innerText: r.path
                        })
                    }))
            })
        ]
    }).create());

})
