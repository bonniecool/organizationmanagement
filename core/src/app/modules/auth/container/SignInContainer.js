import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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
      type: "LOGIN",
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
            <h3 className="login-title">Sign In</h3>
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
                Sign In
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
          <div className="login-details">
            <div className="login-content">

              <h3 className="caption">Welcome to NBI HRIS</h3>
              <p className="message">
                Access to powered payroll system and process. Manage your
                staffs, employees and others.
              </p>
            </div>
          </div>
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
