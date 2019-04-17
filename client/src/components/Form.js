/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

import axios from 'axios';

import Home from './Home';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: black;
  margin: 0 1em;
  padding: 0.25em 1em;
`;
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      loading: false,
      score: '',
      cancel: false,
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  showForm = () => {
    this.setState({ score: '', loading: false });
  };

  cancelSearch = () => {
    this.setState({
      cancel: true,
      loading: false,
    });
  };

  onSubmitURL = e => {
    e.preventDefault();

    const { url } = this.state;

    if (url.includes('amazon.com') || url.includes('ebay.com')) {
      this.setState({
        loading: true,
      });

      axios // Send URL to server
        .get('/api/scraper', {
          params: {
            url,
          },
        })
        .then(response => {
          const { cancel } = this.state;
          const score = response.data;
          if (cancel) {
            this.setState({
              score: '',
            });
          } else {
            this.setState({
              loading: false,
              score,
            });
          }
        })
        .catch(function(error) {});
    } else {
      alert('Please enter a valid url');
    }
  };

  render() {
    const { score, loading, url } = this.state;

    if (score !== '') {
      let emoji;
      return (
        <div>
          <p>
            Score: {score} {score == 100 ? (emoji = '✅') : (emoji = '⚠️')}{' '}
            {/* If score is less than 100, print a caution symbol. Otherwise print a checkmark */}
          </p>{' '}
          <Button onClick={this.showForm} type="button" className="btn btn-dark">
            ◀️ Back to Form
          </Button>
        </div>
      );
    }
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
          <Button onClick={this.cancelSearch}>Cancel</Button>
        </div>
      );
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
          <input className="form-control" id="url" type="text" name="name" value={url} onChange={this.onChange} />
          <input type="submit" value="Submit" onClick={this.onSubmitURL} /> {/* Pass URL to function onSubmitURL */}
          <p>{score}</p>
        </form>
      </div>
    );
  }
}

export default Form;
