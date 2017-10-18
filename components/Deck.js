import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { getDeck, setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { connect } from 'react-redux';
import { fetchDeck } from '../actions';
import { lightgrey, purple, white, brown, grey } from '../utils/colors';


class Deck extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.state.params.title,
		}
	}

	commponentDidMount() {
		getDeck(this.props.navigation.state.params.title)
			.then((deck) => dispatch(fetchDeck(deck)));
	}

	addCard() {
		this.props.navigation.navigate(
			'AddCard',
			{ title: this.props.deck.title }
		)
	}

	startQuiz() {
		this.props.navigation.navigate(
			'Quiz',
			{ cards: this.props.deck.cards}
		)
		clearLocalNotification()
			.then(setLocalNotification);
	}

	render() {
		const deck = this.props.deck;
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.title}>{deck.title}</Text>
					<Text style={styles.count}>{`${deck.cards.length} cards`}</Text>
				</View>
				<View>
					<TouchableOpacity
				      style={Platform.OS === 'ios' ? styles.iosCardBtn : styles.AndroidCardBtn}
				      onPress={this.addCard.bind(this)}>
				        <Text style={styles.cardText}>Add Card</Text>
				    </TouchableOpacity>
				    <TouchableOpacity
				      style={Platform.OS === 'ios' ? styles.iosQuizBtn : styles.AndroidQuizBtn}
				      onPress={this.startQuiz.bind(this)}>
				        <Text style={styles.quizText}>Start Quiz</Text>
				    </TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 40,
		backgroundColor: lightgrey
	},
	title: {
		fontSize: 35,
		color: brown,
		textAlign: 'center',
		marginBottom: 20
	},
	count: {
		fontSize: 25,
		color: grey,
		textAlign: 'center'
	},
	inputBox: {
		paddingTop: 40,
		paddingBottom: 40
	},
	input: {
		borderWidth: 1,
		borderColor: 'black',
		height: 45,
		padding: 5,
		backgroundColor: white
	},
	iosCardBtn: {
		backgroundColor: white,
		padding: 5,
		borderWidth: 2,
		borderColor: purple,
		borderRadius: 7,
		height: 50,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 30
	},
	AndroidCardBtn: {
		backgroundColor: white,
		padding: 10,
		borderWidth: 2,
		borderColor: purple,
		paddingLeft: 30,
		paddingRight: 30,
		marginBottom: 30,
		height: 45,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iosQuizBtn: {
		backgroundColor: purple,
		padding: 7,
		borderRadius: 7,
		height: 50,
		marginLeft: 40,
		marginRight: 40
	},
	AndroidQuizBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardText: {
		color: purple,
		fontSize: 22,
		textAlign: 'center'
	},
	quizText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	}
});

function mapStateToProps(state, ownProps) {
	return {
		deck: state[ownProps.navigation.state.params.title]
	}
}

export default connect(mapStateToProps)(Deck);