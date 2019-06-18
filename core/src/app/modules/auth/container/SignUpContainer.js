import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import logo from "assets/img/logo.svg";
class SignInContainer extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: "REGISTER",
      args: this.state
    });
  };

  render() {
    const { isLoading, isAuthenticated } = this.props;

    if (isAuthenticated) return <Redirect to="/" />;

    return (
      <div className="page login-page">
        <div className="login-card">
          <div className="login-form">
            <div className="login-container">
              <img className="logo" src={logo} alt="Who's In" />
              <p className="message">
                Your professional attendance tracker app that helps to save time
                and simplify attendance tracking. Whether you are a teacher,
                leader or a church,
              </p>
              <h3 className="login-title">
                Welcome Back, Please login to your account
              </h3>
              <form
                id="login-form"
                onSubmit={this.handleSubmit}
                autoComplete="off"
              >
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    disabled={isLoading}
                    id="login-username"
                    name="email"
                    required
                    autoComplete="off"
                    className="form-control normal"
                    value={this.state.email}
                    onChange={this.handleChangeInput}
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    disabled={isLoading}
                    id="login-password"
                    type="password"
                    name="password"
                    required
                    autoComplete="off"
                    className="form-control normal"
                    value={this.state.password}
                    onChange={this.handleChangeInput}
                    placeholder="Password"
                  />
                </div>
                <button
                  disabled={isLoading}
                  id="login"
                  className="btn btn-login btn-success btn-block"
                >
                  Sign Up
                </button>
              </form>
              {/*<a className="forgot-pass">
                      Forgot Password?
                    </a>
                    <br />
                    <small>Do not have an account? </small>
                    <a href="/signup" className="signup">
                      Signup
                    </a>*/}
            </div>
          </div>
          <div className="login-details" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const { loadingTypes } = state.loading;
  const isAuthenticated = state.auth.get("isAuthenticated");

  return {
    isLoading: loadingTypes.length > 0,
    isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(SignInContainer));
