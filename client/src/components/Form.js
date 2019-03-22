import React, { Component } from 'react';

class Form extends Component {
  onSubmitURL = () => {
    alert('You clicked it!');
    // TODO Post to server
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
          <label>
            URL:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" onClick={this.onSubmitURL} />
        </form>
      </div>
    );
  }
}

export default Form;
