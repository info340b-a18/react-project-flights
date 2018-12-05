import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import firebase from 'firebase/app';
<<<<<<< HEAD
import 'firebase/auth'; 
import 'firebase/database';


  var config = {
    apiKey: "AIzaSyD29La4k1_eDq_g-BdJGYzb5E-qxRRaLH8",
    authDomain: "react-flights.firebaseapp.com",
    databaseURL: "https://react-flights.firebaseio.com",
    projectId: "react-flights",
    storageBucket: "react-flights.appspot.com",
    messagingSenderId: "408356926270"
  };
  firebase.initializeApp(config);
=======
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
>>>>>>> e7ebe787e5068122446d7dccab99c2323915ffc1

ReactDOM.render(<App />, document.getElementById('root'));