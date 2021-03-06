export const FETCH_DECKS = 'fetch_decks';
export const FETCH_DECK = 'fetch_deck';
export const ADD_DECK = 'add_deck';
export const ADD_CARD = 'add_card';

export function fetchDecks(decks) {
	return {
		type: FETCH_DECKS,
		decks
	}
}

export function fetchDeck(deck) {
	return {
		type: FETCH_DECK,
		deck
	}
}

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function addCard(title, card) {
	return {
		type: ADD_CARD,
		deck: {title, card}
	}
}