import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Homepage } from './Homepage.js';
import { Airlines } from './Airlines.js';
import { Region } from './Region.js';
import { About } from './About.js';

export class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Flights</h1>
        <Router>
          <div className="contianer">
            <Link to="/">Home</Link>-
      <Link to="/Airlines">Airline</Link>-
      <Link to="/Region">Region</Link>
            <Link to="/About">About</Link>
            <Route exact path="/" component={Homepage} />
            <Route path="/Airlines" component={Airlines} />
            <Route path="/Region" component={Region} />
            <Route path="/about" component={About} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;