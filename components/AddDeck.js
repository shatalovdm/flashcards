import React, { Component } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { Foundation } from '@expo/vector-icons';
import { purple, white, brown, lightgrey } from '../utils/colors';
import { addDeck } from '../actions';
import { connect } from 'react-redux';

class AddDeck extends Component {
	constructor(props) {
		super(props);
		this.state = { title: '' };
	}

	submit() {
		const title = this.state.title;

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
			      onPress={this.submit}>
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

export default connect(null, { addDeck })(AddDeck);