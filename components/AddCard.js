import React, { Component } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity, Text, TextInput, StyleSheet, Platform, Keyboard } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import { purple, white, brown, lightgrey } from '../utils/colors';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';

class AddCard extends Component {

	state = { 
		question: '',
		answer: '' 
	};

	static navigationOptions = () => ({
		title: 'Add Card'
	});

	submit = () => {
		Keyboard.dismiss();

		const card = {
			question: this.state.question,
			answer: this.state.answer
		}
		const title = this.props.navigation.state.params.title;
		this.props.dispatch(addCard(title, card));
		this.props.navigation.goBack();

		addCardToDeck(title, card);
	    this.setState({
	    	question: '',
			answer: ''
	    });
	}

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View>
					<View style={styles.inputBox}>
						<TextInput
							style={styles.input}
							onChangeText={(question) => this.setState({question})}
							value={this.state.title}
							placeholder='Question'
						/>
					</View>
					<View style={styles.inputBox}>
						<TextInput
							style={styles.input}
							onChangeText={(answer) => this.setState({answer})}
							value={this.state.title}
							placeholder='Answer'
						/>
					</View>
				</View>
			    <TouchableOpacity
			      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
			      onPress={this.submit}>
			        <Text style={styles.submitBtnText}>SUBMIT</Text>
			    </TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 40,
		backgroundColor: lightgrey
	},
	text: {
		fontSize: 30,
		color: brown,
		textAlign: 'center',
	},
	inputBox: {
		paddingBottom: 30
	},
	input: {
		borderWidth: 1,
		borderColor: 'black',
		height: 45,
		padding: 5,
		backgroundColor: white
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 5,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	},
	AndroidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	}
});

export default connect(null)(AddCard);