import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import logo from 'assets/images/logo.svg';
import * as c from '../constant';


class SignIn extends PureComponent {
  
  state = {
    email: "",
    password: ""
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch({
      type: "LOGIN",
      args: this.state
    });
  };

	render() {
	  const {isLoading } = this.props;

	  return (
  <div className="body-wrap">
    <header className="site-header">
      <div className="container">
        <div className="site-header-inner">
          <div className="brand header-brand">
            <h1 className="m-auto">
              <Link to="/">
                <img
                  src={logo}
                  alt="Twist"
                  width="141"
                  height="32"
                />
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main className="site-content">
      <section className="signin section illustration-section-02">
        <div className="container-sm">
          <div className="signin-inner section-inner">
            <div className="section-header center-content">
              <h1 className="m-0">
									Welcome back. We exist to make organization
									easier.
              </h1>
            </div>
            <div className="tiles-wrap">
              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <form onSubmit={this.handleOnSubmit}>
                    <fieldset>
                      <div className="mb-12">
                        <label
                          className="form-label screen-reader"
                        >
                            Email
                        </label>
                        <input
                          disabled={isLoading}
                          id="login-password"
                          type="email"
                          name="email"
                          required
                          autoComplete="off"
                          className="form-input"
                          value={this.state.email}
                          onChange={this.handleChangeInput}
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-12">
                        <label
                          className="form-label screen-reader"
                          htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                          disabled={isLoading}
                          id="login-password"
                          type="password"
                          name="password"
                          required
                          autoComplete="off"
                          className="form-input"
                          value={this.state.password}
                          onChange={this.handleChangeInput}
                          placeholder="Password"
                        />
                      </div>
                      <div className="mt-24 mb-32">
                        <button type="submit" className="button button-primary button-block">
														Sign in
                        </button>
                      </div>
                      <div className="signin-footer mb-32 text-right">
                        <a className="text-xs" href="#">
                          Forgot password?
                        </a>
                      </div>
                    </fieldset>
                  </form>
                  <div className="signin-bottom has-top-divider">
                    <div className="pt-32 text-xs center-content text-color-low">
												Don't you have an account?
                      <Link to="/sign-up">Signup</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
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

export default withRouter(connect(mapStateToProps)(SignIn));

