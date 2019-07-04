import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import ePLDTLogo from 'assets/images/logo.svg';
import userPhoto from 'assets/images/user-placeholder.png';
import PropTypes from 'prop-types';

class Header extends PureComponent {
  static propTypes = {
    logout: PropTypes.instanceOf(Function).isRequired,
  }

  state = {
    toggleDropdown: false,
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickBody);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickBody);
  }

  handleClickBody = (e) => {
    if (e.target.className.indexOf('for-dropdownnavigation') < 0) {
      this.setState({
        toggleDropdown: false,
      });
    }
  }

  toggleNav = value => (e) => {
    e.preventDefault();
    this.setState({
      toggleDropdown: value,
    });
  };

  handleOnLogout = (e) => {
    e.preventDefault();
    const { logout } = this.props;
    logout();
  }

  render() {
    const { toggleDropdown } = this.state;
    return (
      <header className="main-header">
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img src={ePLDTLogo} alt="ePLDT Marketplace" />
          </Link>
          <ul className="nav navbar-nav ml-auto">
            <li className={`${toggleDropdown ? 'open' : ''} nav-item dropdown for-dropdownnavigation`}>
              <a
                className="nav-link dropdown-toggle nav-avatar"
                href="/"
                onClick={this.toggleNav(!toggleDropdown)}
              >
                <span className="full-name">Theressa Collier</span>
                <img
                  className="img-avatar"
                  src={userPhoto}
                  alt="admin@email.com"
                />
              </a>
              <div className={`${toggleDropdown ? 'show' : ''} dropdown-menu`}>
                {/* <div className="dropdown-header text-center">
                  <strong>Settings</strong>
                </div> */}
                <a
                  className="dropdown-item"
                  href="/"
                  onClick={this.handleOnLogout}
                >
                  <i className="fas fa-lock" /> Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const logout = () => {
    dispatch({
      type: 'AUTH/LOGOUT',
    });
  };

  return {
    logout,
  };
};

const mapStateToProps = () => ({});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
]);

export default enhance(Header);
