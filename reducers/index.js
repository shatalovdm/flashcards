import { FETCH_DECKS, ADD_DECK, FETCH_DECK, ADD_CARD } from '../actions';

export default function entries (state = {}, action) {
  switch (action.type) {
    case FETCH_DECK:
    case FETCH_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      const title = action.deck.title;
      const card = action.deck.card;
      state[title].cards.push(card);
      return {
        ...state,
        [title]: {
          title,
          cards: state[title].cards
        }
      }
    default:
      return state
  }
}