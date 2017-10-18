import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const FLASHCARDS_STORAGE_KEY = '@VeryCoolStorage:key';
export const NOTIFICATION_KEY = '@VeryCoolStorage:notifications';

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

export function addCardToDeck(title, card) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
		.then(req => JSON.parse(req))
		.then(json => {
			const deck = json[title];
			deck.cards.push({
				question: card.question,
				answer: card.answer
			})
			return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
			    [deck.title]: {
			    	title: deck.title,
			    	cards: deck.cards
			    }
			}));
		});
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
    	.then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
	return {
		title: 'Quizes are waiting...',
		body: 'Do not forget to take your quizes today!',
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'low',
			sticky: false,
			vibrate: true
		}
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(req => JSON.parse(req))
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync();

							let tomorrow = new Date();
							tomorrow.setDate(tomorrow.getDate() + 1);
							tomorrow.setHours(18);
							tomorrow.setMinutes(0);

							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							);
							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
						}
					});
			}
		})
}