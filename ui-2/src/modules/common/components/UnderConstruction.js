import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

class UnderConstruction extends PureComponent {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="app-wrapper">
        <div className="text-center">
          <h1 className="mt-1">This features is under construction</h1>
        </div>
      </div>
    );
  }
}

export default UnderConstruction;
