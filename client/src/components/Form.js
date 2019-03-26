/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

import axios from 'axios';

import LoadingSpin from 'react-loading-spin';

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
  };

  render() {
    const { score, loading, url } = this.state;

    if (score !== '') {
      return (
        <div>
          <p>Score: {score} ✅</p>{' '}
          <Button onClick={this.showForm} type="button" className="btn btn-dark">
            ◀️ Back to Form
          </Button>
        </div>
      );
    }
    if (loading) {
      return (
        <div>
          <LoadingSpin width="200px" size="200px" primaryColor="yellow" secondaryColor="#333" />
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
          <input id="url" type="text" name="name" value={url} onChange={this.onChange} />
          <input type="submit" value="Submit" onClick={this.onSubmitURL} />
          <p>{score}</p>
        </form>
      </div>
    );
  }
}

export default Form;
