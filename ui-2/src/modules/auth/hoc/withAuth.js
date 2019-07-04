import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import icon from 'assets/images/icon.png';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  const profileType = sessionStorage.getItem('profile_type');

  const validateToken = () => new Promise(async (resolve) => {
    dispatch({
      type: 'AUTH/GET_AUTH',
      profileType,
      onSuccess: (isValid) => {
        resolve(isValid);
      },
    });
  });

  return {
    validateToken,
  };
};

const withAuth = WrappedComponent => (
  class Wrapper extends React.Component {
    static propTypes = {
      validateToken: PropTypes.func.isRequired,
    }

    state = {
      tokenVerified: false,
    }

    componentDidMount() {
      this.validate();
    }

    validate = async () => {
      const token = await sessionStorage.getItem('token');
      if (token) {
        const { validateToken } = this.props;
        await validateToken();
      }

      this.setState({
        tokenVerified: true,
      });
    };

    render() {
      const { tokenVerified } = this.state;
      if (!tokenVerified) {
        return (
          <div className="full-loader-wrapper">
            <div className="inner-loader-wrapper">
              <div className="loading-circle" />
              {/* <img className="loading-icon" src={icon} alt="PSITE" /> */}
              Loading...
            </div>
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }
);

export default WrapperComponent => (
  connect(mapStateToProps, mapDispatchToProps)(withAuth(WrapperComponent))
);
