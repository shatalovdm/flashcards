export const FETCH_DECKS = 'fetch_decks';
export const ADD_DECK = 'add_deck';

export function fetchDecks (decks) {
  return {
    type: FETCH_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}