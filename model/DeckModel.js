class DataOrchestrator {
    constructor() {
        this.cards = new Map();
        this.decks = new Map();
    }

    /**
     * Creates a new deck and adds it to the orchestrator.
     * @param {HTMLTableElement} table - The table element containing deck data.
     */
    fromMtgTop8ComparePage(table) {
        const deckIds = new Map();
        let lastSection;
        Array.from(table.querySelectorAll('tr'))
            .forEach((tr) => {
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

                        const deck = this.decks.get(deckIds.get(i));

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

                        this.decks.set(deckId, new Deck({
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
                        this.cards.set(mapId, newCard);
                        lastCard = newCard;
                    }
                });
            })
    }

    generateDistanceMatrix() {
        const combinations = [...this.decks.keys()].reduce(Reduce.combine, []);
        this.combinations = combinations
        const matrix = new Map();

        combinations.forEach(([d1, d2]) => {
            const deck1 = this.decks.get(d1);
            const deck2 = this.decks.get(d2);

            const cards1 = deck1.getCards(['sideboard']);
            const cards2 = deck2.getCards(['sideboard']);

            const distance = Jaccard.maps(cards1, cards2);

            matrix.set([deck1, deck2], distance);
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
}

class Player {
    constructor({ name } = {}) {
        this.name = name;
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
}

