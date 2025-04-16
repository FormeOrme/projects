const username = 'FormeOrme';
const repoName = 'projects';
const link = (path) => `${window.location.origin}/${path}`;

document.head.append(Link.with({
    attribute: {
        rel: "icon",
        type: "image/x-icon",
        href: favicon
    }
}).create());

document.head.append(Title.with({ innerText: title }).create());

Utils.fetchJson({
    url: apiUrl()
}).then(response => {
    document.body.append(Section.with({
        class: "container mt-2",
        children: [
            H1.with({
                children: [
                    A.with({ text: "..", attribute: { href: "javascript:history.back()" } }),
                    Span.with({ text: ` ${title}` })
                ]
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
