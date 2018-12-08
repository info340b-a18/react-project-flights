import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

// config for firebase
  var config = {
    apiKey: "AIzaSyD29La4k1_eDq_g-BdJGYzb5E-qxRRaLH8",
    authDomain: "react-flights.firebaseapp.com",
    databaseURL: "https://react-flights.firebaseio.com",
    projectId: "react-flights",
    storageBucket: "react-flights.appspot.com",
    messagingSenderId: "408356926270"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));