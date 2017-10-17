import { AsyncStorage } from 'react-native';

export const FLASHCARDS_STORAGE_KEY = '@VeryCoolStorage:key';

export function getDecks() {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(req => {return JSON.parse(req)});
}

export function getDeck(key) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(req => JSON.parse(req))
		.then(json => {return json[key]});
}

export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
	    [title]: {
	    	title: title,
	    	cards: []
	    }
	}));
}

// export function addCardToDeck(title, card) {
// 	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
// 		.then(req => JSON.parse(req))
// 		.then(json => return json[key]);
// }