import React, { Component } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity, Text, TextInput, StyleSheet, Platform, Keyboard } from 'react-native'
import { purple, white, brown, lightgrey } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';

class AddDeck extends Component {
	constructor(props) {
		super(props);
		this.state = { title: '' };
	}

	submit() {
		Keyboard.dismiss();
		const title = this.state.title.trim();
		this.props.dispatch(addDeck({
	      	[title]: {
	      		title: title,
	      		cards: [] 
	      	}
	    }));
		this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}));
		saveDeckTitle(title);
	    this.setState({
	    	title: '' 
	    });
	}

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.contentContainer}>
				<Text style={styles.text}>
					What is the title of your new deck?
				</Text>
				<View style={styles.inputBox}>
					<TextInput
						style={styles.input}
						onChangeText={(title) => this.setState({title})}
						value={this.state.title}
					/>
				</View>
			    <TouchableOpacity
			      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
			      onPress={this.submit.bind(this)}>
			        <Text style={styles.submitBtnText}>SUBMIT</Text>
			    </TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	contentContainer: {
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
export default connect(null)(AddDeck);