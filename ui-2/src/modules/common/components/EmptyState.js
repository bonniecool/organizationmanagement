import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emptyStateImage from 'assets/images/empty.png';

class EmptyState extends Component {
  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: 'There are no items found.',
  };

  render() {
    const { message } = this.props;
    return (
      <div>
        <div className="d-flex align-items-center justitfy-content-center h-100 mt-5">
          <div className="text-center mx-auto">
            <img
              src={emptyStateImage}
              className="img-responsive image-wrapper mb-5"
              alt="Empty State"
            />
            <p className="emp-title">{message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyState;
