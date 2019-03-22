import React, { Component } from 'react';

import Form from './Form';
import Navbar from './layout/Navbar';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Form />
        <div>Compatible With: Ebay and Amazon</div>
      </div>
    );
  }
}
