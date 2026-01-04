class DataOrchestrator {
    constructor() {
        this.cards = new Map();
        this.decks = new Map();
    }

    toJSON() {
        const decks = [...this.decks.values()].map(deck => deck.toJSON());
        return JSON.stringify(decks, (key, value) => {
            if (key === 'sections') {
                return [...value.values()];
            }
            return value;
        });
    }

    fromJSON(json) {
        this.decks = new Map(json.map(deck => [deck.id, new Deck(deck)]));
        this.cards = new Map(
            json.flatMap(deck => [...deck.sections.values()])
                .flatMap(section => [...section.cardIds.keys()])
                .map(cardId => [cardId, new Card({ id: cardId })])
        );
    }

    /**
     * Creates a new deck and adds it to the orchestrator.
     * @param {HTMLTableElement} table - The table element containing deck data.
     */
    static fromMtgTop8ComparePage(table) {
        const orchestrator = new DataOrchestrator();

        const deckIds = new Map();
        let lastSection;
        Array.from(table.querySelectorAll('tr')).forEach((tr) => {
            let lastCard;
            Array.from(tr.querySelectorAll('td')).forEach((td, i) => {
                if (i == 0 && td.getAttribute("align") == "center") {
                    lastSection = td.textContent.trim();
                    return;
                }

                if (td.querySelector(".ctris")) {
                    const qty = parseInt(td.querySelector(".ctris").textContent.trim());

                    if (Number.isNaN(qty)) {
                        return;
                    }

                    const deck = orchestrator.decks.get(deckIds.get(i));

                    let deckSection = deck.sections.get(lastSection);
                    if (!deckSection) {
                        deckSection = new Section({
                            name: lastSection,
                            cardIds: new Map()
                        });
                        deck.sections.set(lastSection, deckSection);
                    }
                    deckSection.cardIds.set(lastCard.id, qty);
                    return;
                }

                const playerName = td.querySelector('.S14')?.textContent.trim();
                if (playerName) {
                    const link = td.querySelector('.S14 a');
                    const href = link.href;
                    const url = new URLSearchParams(new URL(href).search);
                    const deckId = url.get('d');
                    deckIds.set(i, deckId);

                    orchestrator.decks.set(deckId, new Deck({
                        id: deckId,
                        player: new Player({ name: playerName }),
                    }));
                }

                const card = td.querySelector('.c1 .c2');
                if (card) {
                    const cardName = card?.textContent.trim();
                    const onclick = card.getAttribute('onclick');
                    const cardId = onclick.split("'")[1];
                    const mapId = SUtils.strip(cardName);

                    const newCard = new Card({
                        id: mapId,
                        name: cardName,
                        cardId
                    });
                    orchestrator.cards.set(mapId, newCard);
                    lastCard = newCard;
                }
            });
        })

        return orchestrator;
    }

    generateDistanceMatrix() {
        const combinations = [...this.decks.keys()].reduce(Reduce.combine, []);
        const matrix = new Map();
        combinations.forEach(([d1, d2]) => {
            const deck1 = this.decks.get(d1);
            const deck2 = this.decks.get(d2);

            const cards1 = deck1.getCards(['sideboard']);
            const cards2 = deck2.getCards(['sideboard']);

            const distance = Jaccard.maps(cards1, cards2);

            matrix.set(`${d1}_${d2}`, distance);
            matrix.set(`${d2}_${d1}`, distance);
        });

        this.matrix = matrix;
    }

    /**
    * Adds a new card to the orchestrator.
    * @param {Card} card - The card to add.
    */
    addCard(card) {
        this.cards.set(card.id, card);
    }

}

class Card {
    constructor({ id, name, cardId } = {}) {
        this.id = id;
        this.name = name;
        this.set = cardId.slice(0, 3);
        this.num = cardId.slice(3);
    }

    get img() {
        return `https://www.mtgtop8.com/pics/${this.set}/${this.num}.jpg`;
    }

    get art() {
        return `https://www.mtgpics.com/pics/art/${this.set}/${this.num}.jpg`;
    }

    get cardId() {
        return this.set + this.num;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            cardId: this.cardId
        };
    }
}

class Player {
    constructor({ name } = {}) {
        this.name = name;
    }

    toJSON() {
        return {
            name: this.name,
        };
    }
}

class Deck {
    constructor({ player } = {}) {
        this.player = player;
        this.sections = new Map();
    }

    getCards(sectionsToExclude = ['sideboard']) {
        const cards = new Map();
        const lowercase = sectionsToExclude.map(section => section.toLowerCase());
        this.sections.forEach((section, sectionName) => {
            if (lowercase.includes(sectionName.toLowerCase())) {
                return;
            }
            section.cardIds.forEach((qty, cardId) => {
                cards.set(cardId, qty);
            });
        });

        return cards;
    }

    toJSON() {
        return {
            player: this.player,
            sections: [...this.sections.values()],
        };
    }

    fromJSON(json) {
        this.player = new Player(json.player);
        this.sections = new Map(json.sections.map(section => [section.name, new Section(section)]));
    }
}

class Section {
    /**
    * @param {string} name - The name of the section.
    * @param {Map<string,int>} cardIds - The cards in the section.
    */
    constructor({ name, cardIds = new Map() } = {}) {
        this.name = name;
        this.cardIds = cardIds;
    }


    toJSON() {
        return {
            name: this.name,
            cardIds: [...this.cardIds.entries()],
        };
    }

    fromJSON(json) {
        this.name = json.name;
        this.cardIds = new Map(json.cardIds);
    }
}

