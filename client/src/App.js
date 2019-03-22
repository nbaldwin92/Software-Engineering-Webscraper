import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import Form from './components/Form';


class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
