import React, { Component } from 'react';

import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmitURL = () => {
    // TODO Post to server
    const { url } = this.state;
    axios
      .get('/api/scraper', {
        params: {
          url,
        },
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log('error');
      });
  };

  render() {
    return (
      <div>
        <h1>
          E-COMMERCE <br />
          ANALYZER
        </h1>
        <p>
          Ensure the listing on eBay or Amazon is safe! <br /> We will run the product through our <br />
          algorithm to ensure you stay safe!
        </p>
        <form>
          <label htmlFor="url"> URL:</label>
          <input id="url" type="text" name="name" value={this.state.url} onChange={this.onChange} />
          <input type="submit" value="Submit" onClick={this.onSubmitURL} />
        </form>
      </div>
    );
  }
}

export default Form;
