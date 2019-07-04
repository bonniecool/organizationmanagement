import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { omitEmptyArgs } from 'helper';
import _ from 'lodash';
import PropTypes from 'prop-types';
import logo from 'assets/images/logo.svg';
import * as c from '../constant';


class SigIn extends PureComponent {
  static propTypes = {
    formData: PropTypes.instanceOf(Object).isRequired,
    setFormData: PropTypes.instanceOf(Function).isRequired,
    login: PropTypes.instanceOf(Function).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  static defaultProps = {};

  state = {
    hidden: true,
  };

  toggleShow = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  };

  handleOnChange = (e) => {
    const { setFormData } = this.props;
    setFormData({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { formData, login } = this.props;
    const args = _.omit(omitEmptyArgs(formData), ['term_condition']);
    login(args, () => {
      const { history } = this.props;
      history.push('/');
    });
  };

  render() {
    const { formData } = this.props;
    const { hidden } = this.state;

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
                            <input id="name" className="form-input" type="name" placeholder="Full name" required />
                          </div>
                          <div className="mb-12">
                            <label className="form-label screen-reader" htmlFor="email">Email</label>
                            <input id="email" className="form-input" type="email" placeholder="Email" required />
                          </div>
                          <div className="mb-12">
                            <label className="form-label screen-reader" htmlFor="password">Password</label>
                            <input id="password" className="form-input" type="password" placeholder="Password" required />
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

const mapStateToProps = ({ auth }) => ({
  formData: _.get(auth, 'formData'),
});

const enhance = _.flowRight([
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
]);

export default enhance(SigIn);
