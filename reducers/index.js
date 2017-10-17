import { FETCH_DECKS, ADD_DECK, FETCH_DECK } from '../actions';

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
    default:
      return state
  }
}