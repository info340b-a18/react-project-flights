import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDZNudFV3Fm7hBYoI8-Y83-1BA78-1egfY",
    authDomain: "react-flights-5d8ac.firebaseapp.com",
    databaseURL: "https://react-flights-5d8ac.firebaseio.com",
    projectId: "react-flights-5d8ac",
    storageBucket: "react-flights-5d8ac.appspot.com",
    messagingSenderId: "127604908613"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));