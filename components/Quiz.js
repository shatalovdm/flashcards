import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import { purple, white, brown, lightgrey, grey } from '../utils/colors';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';

export default class Quiz extends Component {

	state = { 
		count: 1,
		result: 0 
	};

	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({ value }) => {
			this.value = value;
		});
		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg'],
		});
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg']
		})
		this.frontOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [1, 0]
		});
		this.backOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [0, 1]
		});
	}


	flipCard = () => {
		if (this.value >= 90) {
			Animated.spring(this.animatedValue,{
				toValue: 0,
				friction: 8,
				tension: 5
			}).start();
		} else {
			Animated.spring(this.animatedValue,{
				toValue: 180,
				friction: 8,
				tension: 5
			}).start();
		}
	}

	correct = () => {
		this.setState(state => ({
			count: state.count + 1,
			result: state.result + 1 
		}));
	}

	incorrect = () => {
		this.setState(state => ({
			count: state.count + 1
		}));
	}

	restartQuiz = () => {
		this.setState({
			count: 1,
			result: 0
		});
	}

	render() {
		const frontCard = {
			transform: [
				{ rotateY: this.frontInterpolate }
			],
			opacity: this.frontOpacity
		}
		const backCard = {
			transform: [
				{ rotateY: this.backInterpolate }
			],
			opacity: this.backOpacity
		}
		const cards = this.props.navigation.state.params.cards;
		if (cards.length === 0) {
			return (
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>Add a card to this deck before taking the quiz!</Text>
				</View>
			);
		}
		if (this.state.count === (cards.length + 1)) {
			return (
				<View style={styles.resultContainer}>
					<View>
						<Text style={styles.resultText}>Done!</Text>
						<Text style={styles.resultText}>Your Score: {Math.round((this.state.result / (this.state.count - 1)) * 100)}%</Text>
					</View>
					<View>
						<TouchableOpacity
					      style={Platform.OS === 'ios' ? styles.iosFirstBtn : styles.AndroidFirstBtn}
					      onPress={this.restartQuiz}>
					        <Text style={styles.firstBtnText}>Restart Quiz</Text>
					    </TouchableOpacity>
					    <TouchableOpacity
					      style={Platform.OS === 'ios' ? styles.iosSecondBtn : styles.AndroidSecondBtn}
					      onPress={() => this.props.navigation.goBack()}>
					        <Text style={styles.secondBtnText}>Back To Deck</Text>
					    </TouchableOpacity>
					</View>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<Text style={styles.count}>{`${this.state.count} / ${cards.length}`}</Text>
				<View style={styles.cardBox}>
					<Animated.View style={frontCard}>
						<View style={styles.card}>
							<Text style={styles.text}>{cards[(this.state.count - 1)].question}</Text>
						    <Text style={styles.flipBtn} onPress={this.flipCard}>Press To See Answer</Text>
						</View>
					</Animated.View>
					<Animated.View style={[backCard, styles.cardBack]}>
				    	<View style={styles.card}>
						    <Text style={styles.text}>{cards[(this.state.count - 1)].answer}</Text>
						    <Text style={styles.flipBtn} onPress={this.flipCard}>Press To See Question</Text>
				    	</View>
					</Animated.View>  
				</View>
				<View>
					<TouchableOpacity
				      style={Platform.OS === 'ios' ? styles.iosFirstBtn : styles.AndroidFirstBtn}
				      onPress={this.correct}>
				        <Text style={styles.firstBtnText}>Correct</Text>
				    </TouchableOpacity>
				    <TouchableOpacity
				      style={Platform.OS === 'ios' ? styles.iosSecondBtn : styles.AndroidSecondBtn}
				      onPress={this.incorrect}>
				        <Text style={styles.secondBtnText}>Incorrect</Text>
				    </TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	resultContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 40,
		backgroundColor: lightgrey
	},
	resultText: {
		textAlign: 'center',
		fontSize: 30,
		color: brown,
		marginBottom: 20
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 40,
		backgroundColor: lightgrey
	},
	count: {
		fontSize: 25,
		color: grey,
		textAlign: 'left'
	},
	cardBox: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	cardBack: {
		position: 'absolute',
    	alignSelf: 'center'
	},
	card: {
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
	text: {
		fontSize: 30,
		color: brown,
		textAlign: 'center',
		marginBottom: 20
	},
	flipBtn: {
		textAlign: 'center'
	},
	iosFirstBtn: {
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
	AndroidFirstBtn: {
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
	iosSecondBtn: {
		backgroundColor: purple,
		padding: 7,
		borderRadius: 7,
		height: 50,
		marginLeft: 40,
		marginRight: 40
	},
	AndroidSecondBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	firstBtnText: {
		color: purple,
		fontSize: 22,
		textAlign: 'center'
	},
	secondBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	}
});