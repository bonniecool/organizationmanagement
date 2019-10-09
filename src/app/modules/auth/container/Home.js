import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import logo from 'assets/images/logo.svg';
import heroImage from 'assets/images/hero-image.svg';
import feature1 from 'assets/images/feature-tile-icon-01.svg';
import feature2 from 'assets/images/feature-tile-icon-02.svg';
import feature3 from 'assets/images/feature-tile-icon-03.svg';
import feature4 from 'assets/images/feature-tile-icon-04.svg';
import feature5 from 'assets/images/feature-tile-icon-05.svg';
import feature6 from 'assets/images/feature-tile-icon-06.svg';
import featureSplit1 from 'assets/images/features-split-image-01.svg';
import featureSplit2 from 'assets/images/features-split-image-02.svg';
import featureSplit3 from 'assets/images/features-split-image-03.svg';
import diamondPrice from 'assets/images/pricing-icon.svg';
import * as c from '../constant';


class SigIn extends PureComponent {
 

  state = {
    hidden: true,
  };

  toggleShow = () => {
    // const { hidden } = this.state;
    // this.setState({ hidden: !hidden });
  };

  handleOnChange = (e) => {
    // const { setFormData } = this.props;
    // setFormData({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    // e.preventDefault();
    // const { formData, login } = this.props;
    // const args = formData;
    // login(args, () => {
    //   const { history } = this.props;
    //   history.push('/');
    // });
  };

  render() {
    const { match } = this.props;
    return (
      <div className="is-boxed">
        <div className="body-wrap">
        <header className="site-header">
          <div className="container">
            <div className="site-header-inner">
              <div className="brand header-brand">
                <h1 className="m-0">
                  <Link to="/">
                    <img src={logo} alt="Assembly" width="141" height="32" />
                  </Link>
                </h1>
              </div>
              <button id="header-nav-toggle" type="text" className="header-nav-toggle" >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner" />
                </span>
              </button>
              <nav id="header-nav" className="header-nav">
                <div className="header-nav-inner">
                  <ul className="list-reset text-xxs  header-nav-right">
                    <li>
                      <Link to={`${match.url}sign-in`}>
                        Log In
                      </Link>
                    </li>
                    <li>
                      <Link className="button button-primary button-sm" to={`${match.url}sign-up`}>Sign Up</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <main className="site-content">
          <section className="hero section illustration-section-01">
            <div className="container">
              <div className="hero-inner section-inner">
                <div className="split-wrap">
                  <div className="split-item">
                    <div className="hero-content split-item-content center-content-mobile">
                      <h1 className="mt-0 mb-16 reveal-from-left">Manage people attendance the easy way, online!</h1>
                      <p className="m-0 mb-24 reveal-from-left" data-reveal-delay="200">Record your people' daily, monthly or weekly attendance automatically in timesheets. Generate personalize ID and record location on real time. Validate all attendance.</p>
                      <div className="reveal-from-left" data-reveal-delay="400">
                        <a className="button button-primary button-wide-mobile" href="#">Get started</a>
                      </div>
                    </div>
                    <div className="hero-figure is-3d split-item-image split-item-image-fill illustration-element-01 reveal-scale-up">
                      <img src={heroImage} alt="Hero image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="features-tiles section center-content-mobile">
            <div className="container">
              <div className="features-tiles-inner section-inner">
                <div className="tiles-wrap">
                  <div className="tiles-item">
                    <div className="tiles-item-inner">
                      <div className="features-tiles-item-header">
                          <div className="features-tiles-item-image mb-12 reveal-from-right" data-reveal-container=".tiles-item">
                            <img src={feature1} alt="Feature tile icon 01" />
                          </div>
                        </div>
                      <div className="features-tiles-item-content">
                        <h4 className="mt-0 mb-8 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="100">Flexibility</h4>
                        <p className="m-0 text-sm reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="200">A pseudo-Latin text used in web design, layout, and printing in place of things to emphasise design for previewing layouts.</p>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item">
                    <div className="tiles-item-inner">
                      <div className="features-tiles-item-header">
                                          <div className="features-tiles-item-image mb-12 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="100">
                                              <img src={feature2} alt="Feature tile icon 02" />
                                            </div>
                                        </div>
                      <div className="features-tiles-item-content">
                        <h4 className="mt-0 mb-8 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="200">Flexibility</h4>
                        <p className="m-0 text-sm reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="300">A pseudo-Latin text used in web design, layout, and printing in place of things to emphasise design for previewing layouts.</p>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item">
                    <div className="tiles-item-inner">
                      <div className="features-tiles-item-header">
                                          <div className="features-tiles-item-image mb-12 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="200">
                            <img src={feature3} alt="Feature tile icon 03" />
                          </div>
                                        </div>
                      <div className="features-tiles-item-content">
                        <h4 className="mt-0 mb-8 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="300">Flexibility</h4>
                        <p className="m-0 text-sm reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="400">A pseudo-Latin text used in web design, layout, and printing in place of things to emphasise design for previewing layouts.</p>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item">
                    <div className="tiles-item-inner">
                      <div className="features-tiles-item-header">
                                          <div className="features-tiles-item-image mb-12 reveal-from-right" data-reveal-container=".tiles-item">
                            <img src={feature4} alt="Feature tile icon 04" />
                          </div>
                                        </div>
                      <div className="features-tiles-item-content">
                        <h4 className="mt-0 mb-8 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="100">Flexibility</h4>
                        <p className="m-0 text-sm reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="200">A pseudo-Latin text used in web design, layout, and printing in place of things to emphasise design for previewing layouts.</p>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item">
                    <div className="tiles-item-inner">
                      <div className="features-tiles-item-header">
                                          <div className="features-tiles-item-image mb-12 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="100">
                            <img src={feature5} alt="Feature tile icon 05" />
                          </div>
                                        </div>
                      <div className="features-tiles-item-content">
                        <h4 className="mt-0 mb-8 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="200">Flexibility</h4>
                        <p className="m-0 text-sm reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="300">A pseudo-Latin text used in web design, layout, and printing in place of things to emphasise design for previewing layouts.</p>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item">
                    <div className="tiles-item-inner">
                      <div className="features-tiles-item-header">
                                          <div className="features-tiles-item-image mb-12 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="200">
                            <img src={feature6} alt="Feature tile icon 06" />
                          </div>
                                        </div>
                      <div className="features-tiles-item-content">
                        <h4 className="mt-0 mb-8 reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="400">Flexibility</h4>
                        <p className="m-0 text-sm reveal-from-right" data-reveal-container=".tiles-item" data-reveal-delay="400">A pseudo-Latin text used in web design, layout, and printing in place of things to emphasise design for previewing layouts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

              <section className="features-split section illustration-section-05">
            <div className="container">
              <div className="features-split-inner section-inner">
                <div className="section-header center-content">
                  <div className="container-xs">
                    <h2 className="mt-0 mb-16">Bold startup toolkit</h2>
                    <p>Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.</p>
                  </div>
                </div>
                <div className="split-wrap invert-mobile">
                  <div className="split-item reveal-scale-up">
                    <div className="split-item-content center-content-mobile">
                      <h3 className="mt-0 mb-16">Lorem ipsum dolor sit</h3>
                      <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="split-item-image split-item-image-fill is-3d illustration-element-03">
                      <img src={featureSplit1} alt="Features split image 01" />
                    </div>
                  </div>
                  <div className="split-item reveal-scale-up">
                    <div className="split-item-content center-content-mobile">
                      <h3 className="mt-0 mb-16">Lorem ipsum dolor sit</h3>
                      <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="split-item-image split-item-image-fill is-3d illustration-element-04">
                      <img src={featureSplit2} alt="Features split image 02" />
                    </div>
                  </div>
                  <div className="split-item reveal-scale-up">
                    <div className="split-item-content center-content-mobile">
                      <h3 className="mt-0 mb-16">Lorem ipsum dolor sit</h3>
                      <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="split-item-image split-item-image-fill is-3d illustration-element-05">
                      <img src={featureSplit3} alt="Features split image 03" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

              <section className="pricing section illustration-section-03">
            <div className="container">
              <div className="pricing-inner section-inner">
                <div className="section-header center-content invert-color">
                  <div className="container-xs">
                    <h2 className="m-0">Simple pricing</h2>
                  </div>
                </div>
                <div className="tiles-wrap illustration-section-07">
                  <div className="tiles-item reveal-scale-up">
                    <div className="tiles-item-inner has-shadow">
                      <div className="pricing-item-content">
                        <div className="pricing-item-header pb-16 mb-24">
                          <div className="pricing-item-price mb-4"><span className="pricing-item-price-currency h2 text-color-low">$</span><span className="pricing-item-price-amount h1">47</span></div>
                          <div className="text-color-low text-xs">/month, billed annualy</div>
                        </div>
                        <div className="pricing-item-features mb-40">
                          <div className="pricing-item-features-title fw-500 text-xs text-color-high mb-24">What's included</div>
                          <ul className="pricing-item-features-list list-reset text-xs mb-32">
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li>Excepteur sint occaecat velit</li>
                            <li>Excepteur sint occaecat velit</li>
                          </ul>
                        </div>
                      </div>
                      <div className="pricing-item-cta mb-8">
                        <a className="button button-primary button-block" href="#">Start free trial</a>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item reveal-scale-up" data-reveal-delay="200">
                    <div className="tiles-item-inner has-shadow">
                      <div className="pricing-item-content">
                        <div className="pricing-item-header pb-16 mb-24">
                          <div className="pricing-item-price mb-4"><span className="pricing-item-price-currency h2 text-color-low">$</span><span className="pricing-item-price-amount h1">67</span></div>
                          <div className="text-color-low text-xs">/month, billed annualy</div>
                          <img className="pricing-item-icon" src={diamondPrice} alt="Diamond" width="38" height="40" />
                        </div>
                        <div className="pricing-item-features mb-40">
                          <div className="pricing-item-features-title fw-500 text-xs text-color-high mb-24">What's included</div>
                          <ul className="pricing-item-features-list list-reset text-xs mb-32">
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li>Excepteur sint occaecat velit</li>
                          </ul>
                        </div>
                      </div>
                      <div className="pricing-item-cta mb-8">
                        <a className="button button-secondary button-block" href="#">Start free trial</a>
                      </div>
                    </div>
                  </div>
                  <div className="tiles-item reveal-scale-up" data-reveal-delay="400">
                    <div className="tiles-item-inner has-shadow">
                      <div className="pricing-item-content">
                        <div className="pricing-item-header pb-16 mb-24">
                          <div className="pricing-item-price mb-4"><span className="pricing-item-price-currency h2 text-color-low">$</span><span className="pricing-item-price-amount h1">97</span></div>
                          <div className="text-color-low text-xs">/month, billed annualy</div>
                        </div>
                        <div className="pricing-item-features mb-40">
                          <div className="pricing-item-features-title fw-500 text-xs text-color-high mb-24">What's included</div>
                          <ul className="pricing-item-features-list list-reset text-xs mb-32">
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                            <li className="is-checked">Excepteur sint occaecat velit</li>
                          </ul>
                        </div>
                      </div>
                      <div className="pricing-item-cta mb-8">
                        <a className="button button-primary button-block" href="#">Start free trial</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

              <section className="cta section center-content-mobile">
            <div className="container">
              <div className="cta-inner section-inner cta-split has-top-divider has-bottom-divider">
                <div className="cta-slogan reveal-from-left">
                  <h3 className="m-0">Nisi porta lorem mollis aliquam ut.</h3>
                </div>
                <div className="cta-action reveal-from-right">
                  <a className="button button-primary button-wide-mobile" href="#">Get started</a>
                </div>
              </div>
            </div>
          </section>
            </main>

        <footer className="site-footer center-content-mobile illustration-section-08 reveal-from-bottom" data-reveal-offset="0">
          <div className="container">
            <div className="site-footer-inner">
              <div className="footer-top space-between text-xxs">
                <div className="brand footer-brand">
                  <a href="./">
                    <img src={logo} alt="Twist" width="120" height="120" />
                  </a>
                </div>
                <div className="footer-social">
                  <ul className="list-reset">
                    <li>
                      <a href="#">
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <title>Facebook</title>
                          <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <title>Twitter</title>
                          <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                                      <a href="#">
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <title>Instagram</title>
                          <g>
                            <circle cx="12.145" cy="3.892" r="1" />
                            <path d="M8 12c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
                            <path d="M12 16H4c-2.056 0-4-1.944-4-4V4c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zM4 2c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2V4c0-.935-1.065-2-2-2H4z" />
                          </g>
                        </svg>
                      </a>
                                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-bottom space-between text-xxs invert-order-desktop">
                <nav className="footer-nav">
                  <ul className="list-reset">
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">FAQ's</a>
                    </li>
                    <li>
                      <a href="#">Support</a>
                    </li>
                  </ul>
                </nav>
                <div className="footer-copyright">&copy; 2019 Twist, all right reserved</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </div>
    );
  }
}


const mapStateToProps = ({ auth }) => ({
});

const enhance = _.flowRight([
  withRouter,
  connect(
    mapStateToProps,
  ),
]);

export default enhance(SigIn);
