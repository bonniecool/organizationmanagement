import React from 'react';
import icon from 'assets/images/icon.png';
import PropTypes from 'prop-types';

const GlobalLoader = ({ isLoading }) => isLoading && (
<div className="full-loader-wrapper">
  <div className="inner-loader-wrapper">
    <div className="loading-circle" />
    <img className="loading-icon" src={icon} alt="ePLDT" />
    <p className="loading-text">Loading...</p>
  </div>
</div>
);

GlobalLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default GlobalLoader;
