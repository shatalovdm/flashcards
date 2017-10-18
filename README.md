# Flashcards 

This is a native iOS and Android application that lets you create quizzes and track your results after taking them. Quizzes are represented by decks which consist of cards, each with a question on the one side and an answer on the back. You can create unlimited number of cards for every deck. After completing a quiz you get the percentage of correct answers. If you forget to take a quiz on some day you will get a reminder (local notification) at 6 pm.

Some technologies used in this project: 

- React Native allows to create a native app for both iOS and Android 
- Redux is used for state management in this project
- Persistent data is stored using AsyncStorage backed by native code
- Stack and Tab Navigation provided by React Navigation library lets user navigate in the app


## Getting started

1. Clone or download the repository:

```
$ git clone https://github.com/shatalovdm/flashcards
``` 

2. Go to the root of the project and install all project's dependencies:
```
$ npm install
```

3. Run Expo packager:
```
$ npm start
```

4. Follow the commands in the terminal to open the app on Android or iOS emulator. Also you can download the Expo app from Apple Store or Google Play Store and run the app on your phone. After downloading the Expo app use it to scan the QR code provided in the terminal. The app should run on your phone after a few seconds. 

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT). 