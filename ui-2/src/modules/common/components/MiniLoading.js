import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ error }) => {
  if (error) {
    return <div>Error!</div>;
  }
  return (
    <div className="mini-loader-wrapper">
      <div className="mini-grid-box">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

Loading.propTypes = {
  error: PropTypes.string,
};

Loading.defaultProps = {
  error: '',
};

export default Loading;
