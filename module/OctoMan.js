import { Octokit } from "https://esm.sh/octokit";

class Content {
    constructor(content) {
        Object.assign(this, content);
    }
}

export default class OctoMan {
    constructor({ owner, token }) {
        this.owner = owner;
        this.token = token;
        this.octokit = new Octokit({ auth: this.token });
    }

    async getContents({ repo, path }) {
        return await this.octokit
            .request("GET /repos/{owner}/{repo}/contents/{path}", {
                owner: this.owner,
                repo,
                path,
            })
            .then((response) => response.data)
            .then((contents) => contents.map((content) => new Content(content)));
    }

    async runQuery(query) {
        return await this.octokit.graphql(query, {
            login: this.owner,
        });
    }
}
