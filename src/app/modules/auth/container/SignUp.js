import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import logo from 'assets/images/logo.svg';
import * as c from '../constant';

class SignUp extends PureComponent {


  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onChangeInput = e => {
    e.preventDefault();
    const {dispatch} = this.props;
    const { name, value } = e.target;
    dispatch({
        type:c.SET_FORM_DATA,
        data:{
            [name] : value
        }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form_data } = this.props;
    dispatch({
      type: "REGISTER",
      args:{
        name:form_data.get('name'),
        email:form_data.get('email'),
        password:form_data.get('password'),
        password_confirmation:form_data.get('password_confirmation'),
      }
    });
  };

  render() {
    const { form_data } = this.props;

    return (
      <div className="body-wrap">
        <header className="site-header">
          <div className="container">
            <div className="site-header-inner">
              <div className="brand header-brand">
                <h1 className="m-0">
                  <Link to="/">
                    <img src={logo} alt="Twist" width="141" height="32" />
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
                  <h1 className="m-0">Welcome back. We exist to make entrepreneurship easier.</h1>
                </div>
                <div className="tiles-wrap">
                  <div className="tiles-item">
                    <div className="tiles-item-inner">
                      <form>
                        <fieldset>
                          <div className="mb-12">
                            <label className="form-label screen-reader" htmlFor="name">Full name</label>
                            <input name="name" className="form-input" type="name" placeholder="Full name" value={form_data.get('name')}required />
                          </div>
                          <div className="mb-12">
                            <label className="form-label screen-reader" htmlFor="email">Email</label>
                            <input name="email" className="form-input" type="email" placeholder="Email" required />
                          </div>
                          <div className="mb-12">
                            <label className="form-label screen-reader" htmlFor="password">Password</label>
                            <input name="password" className="form-input" type="password" placeholder="Password" required />
                          </div>
                          <div className="mb-12">
                            <label className="form-label screen-reader" htmlFor="password">Password</label>
                            <input name="password_confirmation" className="form-input" type="password" placeholder="Confirm Password" required />
                          </div>
                          <div className="mt-24 mb-32">
                            <button typr="submit" className="button button-primary button-block">Signup</button>
                          </div>
                        </fieldset>
                      </form>
                      <div className="signin-bottom has-top-divider">
                        <div className="pt-32 text-xs center-content text-color-low">
											Already have an account? <Link to="/sign-in">Login</Link>
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

const mapDispatchToProps = (dispatch) => {
  const setFormData = (args) => {
    dispatch({
      type: c.SET_FORM_DATA,
      args,
    });
  };

  const login = (args, callback) => {
    dispatch({
      type: c.LOGIN,
      args,
      callback,
    });
  };

  return {
    setFormData,
    login,
  };
};

const mapStateToProps = (state, routeParams) => {
  const { loadingTypes } = state.loading;
  const form_data = state.auth.get("form_data");

  return {
    isLoading: loadingTypes.length > 0,
    form_data
  };
};

export default withRouter(connect(mapStateToProps)(SignUp));
