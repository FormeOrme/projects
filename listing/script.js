fetch('./images/', {method: 'get'})
        .then(r => r.text())
        .then(r => document.body.innerHTML = r);