import React, { Component } from 'react';

class PotentialError extends Component {
  state = {
    error: '',
  }

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <h1 className="text-center mt-5">App has been crashed!</h1>
      );
    }

    // eslint-disable-next-line
    return this.props.children;
  }
}

export default PotentialError;
