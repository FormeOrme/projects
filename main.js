const username = 'FormeOrme';
const repoName = 'projects';
const apiUrl = `https://api.github.com/repos/${username}/${repoName}/contents`;
const link = (path) => `https://formeorme.github.io/projects/${path}/`;


Utils.fetchJson({
    url: apiUrl
}).then(response => {

    Dom.qs("body").append(Div.with({
        class: "container",
        children: Span.with({
            children: response.json
                .filter(r => r.size === 0)
                .sort((r1, r2) => r1.path.localeCompare(r2.path))
                .map(r => Small.with({
                    class: "d-inline-flex",
                    children: A.with({
                        class: "btn btn-light m-3",
                        attribute: {
                            href: link(r.path)
                        },
                        innerText: r.path
                    })
                }))
        })
    }).create());

})