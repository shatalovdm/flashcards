import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { purple, white, lightgrey, brown, grey } from '../utils/colors';
import { connect } from 'react-redux';
import { fetchDecks } from '../actions';
import { getDecks } from '../utils/helpers';
import _ from 'lodash';

const decks = {
	'udacity': {
		title: 'Udacity',
		cards: []
	},
	'rfwwf': {
		title: 'wfwqe',
		cards: []
	},
	'wefwew': {
		title: 'ewfefw',
		cards: []
	}
}

class Decks extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		// getDecks()
		// 	.then((decks) => dispatch(fetchDecks(decks)));
		dispatch(fetchDecks(decks));
	}

	render() {
		const decks = this.props.decks;
		return (
			<ScrollView contentContainerStyle={styles.contentContainer}>
				{ _.map(decks, (deck) => {
					return (
						<TouchableOpacity key={deck.title} onPress={() => {}}>
							<View style={styles.deck}>
								<Text style={styles.title}>{deck.title}</Text>
								<Text style={styles.count}>{`${deck.cards.length} cards`}</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 30,
		backgroundColor: lightgrey
	},
	deck: {
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
	title: {
		fontSize: 25,
		textAlign: 'center',
		color: brown
	},
	count: {
		textAlign: 'center',
		color: grey
	}
 });


function mapStateToProps(state) {
	return {
		decks: state
	}
}

export default connect(mapStateToProps)(Decks);