/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';

import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      loading: false,
      score: '',
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  showForm = () => {
    this.setState({ score: '', loading: false });
  };

  onSubmitURL = e => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    // TODO Post to server
    const { url } = this.state;
    axios
      .get('/api/scraper', {
        params: {
          url,
        },
      })
      .then(response => {
        const score = response.data;
        this.setState({
          loading: false,
          score,
        });
      })
      .catch(function(error) {});
  };

  render() {
    const { score, loading, url } = this.state;

    if (score !== '') {
      return (
        <div>
          <p>Score: {score} ✅</p>{' '}
          <button onClick={this.showForm} type="button" className="btn btn-dark">
            Back to Form
          </button>
        </div>
      );
    }
    if (loading) {
      return <p>Loading...⏲️</p>;
    }

    return (
      <div>
        <h1>
          E-COMMERCE <br />
          ANALYZER 🛍️
        </h1>
        <p>
          Ensure the listing on eBay or Amazon is safe! <br /> We will run the product through our <br />
          algorithm to ensure you stay safe!
        </p>
        <form>
          <label htmlFor="url"> URL:</label>
          <input id="url" type="text" name="name" value={url} onChange={this.onChange} />
          <input type="submit" value="Submit" onClick={this.onSubmitURL} />
          <p>{score}</p>
        </form>
      </div>
    );
  }
}

export default Form;
