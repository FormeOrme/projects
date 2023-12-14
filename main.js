const username = 'FormeOrme';
const repoName = 'projects';
const link = (path) => `https://formeorme.github.io/projects/${path}`;

Dom.qs("head").append(Link.with({
    attribute: {
        rel: "icon",
        type: "image/x-icon",
        href: favicon
    }
}).create());

Dom.qs("head").append(Title.with({ innerText: title }).create());

Utils.fetchJson({
    url: apiUrl()
}).then(response => {
    Dom.qs("body").append(Section.with({
        class: "container mt-2",
        children: [
            H1.with({
                innerText: title
            }),
            Div.with({
                class: "d-flex flex-wrap justify-content-between",
                children: response.json
                    .filter(responseFilter)
                    .sort(Sort.alpha(r => r.path))
                    .map(r => Span.with({
                        children: A.with({
                            class: "btn btn-light m-1",
                            attribute: {
                                href: link(r.path)
                            },
                            innerText: r.name
                        })
                    }))
            })
        ]
    }).create());

})
