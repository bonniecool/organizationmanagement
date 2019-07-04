/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter,
  // Switch,
  // Route,
  // Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
// import GenericList from 'modules/common/components/GenericList';
// import { getEllipsis } from 'helper';
// import { IconSearch } from '../../common/components/Icon';
// import UserContent from './UserContent';
// import CreateUser from './CreateUser';
// import EditUser from './EditUser';
import * as actions from '../actions';
import * as c from '../constants';

class Dashboard extends PureComponent {
  

  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
    getDashboard: PropTypes.instanceOf(Function).isRequired,
    dashboardData: PropTypes.instanceOf(Array).isRequired,
    // userList: PropTypes.instanceOf(Array).isRequired,
    // isLoading: PropTypes.bool.isRequired,
    // userListPager: PropTypes.instanceOf(Object).isRequired,
    // history: PropTypes.instanceOf(Object).isRequired,
  }

  static defaultProps = {
    dashboardData: []
  }

  state = {
    page: 1,
  }

  componentDidMount = () => {
    this.getDashboard();
  }

  getDashboard = () => {
    const { getDashboard } = this.props;
    getDashboard();
  }

  render() {
    const {
      match,
      dashboardData
    } = this.props;
    return (
      <Fragment>
      <div className="az-content-header" style={{minHeight: '90px'}}>
      <div className="az-content-header-top">
        <div>
          <h2 className="az-content-title mg-b-5 mg-b-lg-8">Hi, welcome back!</h2>
          <p className="mg-b-0">Your monitoring dashboard.</p>
        </div>
        <div className="az-dashboard-date">
          <div className="date">
            <div>20</div>
            <div>
              <span>OCT 2018</span>
              <span>Sunday</span>
            </div>
          </div>
          <i className="icon ion-md-arrow-forward"></i>
          <div className="date">
            <div>27</div>
            <div>
              <span>OCT 2018</span>
              <span>Monday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className="az-content-body">
          <div className="row row-sm">
            <div className="col-sm-6 col-xl-3">
              <div className="card card-dashboard-twentytwo">
                <div className="media">
                  <div className="media-icon bg-purple"><i className="typcn typcn-chart-line-outline"></i></div>
                  <div className="media-body">
                    <h6>32.53% <small className="down">-0.5%</small></h6>
                    <span>Bounce Rate</span>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <div id="flotChart1" className="flot-chart"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3 mg-t-20 mg-sm-t-0">
              <div className="card card-dashboard-twentytwo">
                <div className="media">
                  <div className="media-icon bg-primary"><i className="typcn typcn-chart-line-outline"></i></div>
                  <div className="media-body">
                    <h6>7,682 <small className="up">+0.1%</small></h6>
                    <span>Page Views</span>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <div id="flotChart2" className="flot-chart"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
              <div className="card card-dashboard-twentytwo">
                <div className="media">
                  <div className="media-icon bg-pink"><i className="typcn typcn-chart-line-outline"></i></div>
                  <div className="media-body">
                    <h6>68.8 <small className="down">-2.1%</small></h6>
                    <span>New Sessions</span>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <div id="flotChart3" className="flot-chart"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
              <div className="card card-dashboard-twentytwo">
                <div className="media">
                  <div className="media-icon bg-teal"><i className="typcn typcn-chart-line-outline"></i></div>
                  <div className="media-body">
                    <h6>2m:35s <small className="up">+0.8%</small></h6>
                    <span>Avg. Time on Site</span>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <div id="flotChart4" className="flot-chart"></div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 mg-t-20">
              <div className="card card-dashboard-twentyone">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <div className="card-body">
                      <h6 className="az-content-label">Users By Country</h6>
                      <p>The top locations where users of your product are located for this month</p>

                      <div className="list-group">
                        <div className="list-group-item">
                          <span>United States</span>
                          <span>5,508</span>
                          <div className="progress">
                            <div className="progress-bar wd-85p bg-purple" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <span>United Kingdom</span>
                          <span>5,122</span>
                          <div className="progress">
                            <div className="progress-bar wd-75p bg-indigo" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <span>Russia</span>
                          <span>4,750</span>
                          <div className="progress">
                            <div className="progress-bar wd-65p" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <span>China</span>
                          <span>4,300</span>
                          <div className="progress">
                            <div className="progress-bar wd-55p bg-info" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <span>Australia</span>
                          <span>4,018</span>
                          <div className="progress">
                            <div className="progress-bar wd-45p bg-teal" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div id="vmap" className="vmap-wrapper"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xl-3 mg-t-20">
              <div className="card card-body card-dashboard-twentythree ht-xl-100p">
                <h6 className="card-title tx-14 mg-b-10">Mobile Sessions</h6>
                <p className="mg-b-15">The percentage of users who uses mobile devices compare to other devices.</p>

                <div className="d-flex flex-column align-items-center mg-b-25">
                  <div>
                    <div className="az-donut-chart chart1">
                      <div className="slice one"></div>
                      <div className="slice two"></div>
                      <div className="chart-center">
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row-sm">
                  <div className="col-6">
                    <label><span className="bg-indigo"></span> Mobile</label>
                    <h5>6,098</h5>
                  </div>
                  <div className="col-6">
                    <label><span className="bg-gray-500"></span> Desktop</label>
                    <h5>3,902</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-xl-6 mg-t-20">
              <div className="card card-dashboard-audience-metrics ht-md-100p">
                <div className="card-header">
                  <h6 className="card-title">Audience Metrics</h6>
                  <p className="mg-b-15">Measures your user's sessions and page views metrics to your website for this month.</p>
                </div>
                <div className="card-body">
                  <div>
                    <h4>120,500</h4>
                    <label><span className="bg-primary"></span>Users</label>
                  </div>
                  <div>
                    <h4>360,108</h4>
                    <label><span className="bg-teal"></span>Page Views</label>
                  </div>
                  <div>
                    <h4>150,712</h4>
                    <label><span className="bg-pink"></span>Sessions</label>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <div id="flotChart5" className="flot-chart"></div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 mg-t-20">
              <div className="card card-dashboard-audience-metrics">
                <div className="card-header">
                  <h6 className="card-title">Traffic Sources</h6>
                  <p className="mg-b-15">Measures your user's sources that generate traffic metrics to your website for this month.</p>
                </div>
                <div className="card-body">
                  <div>
                    <h4>86,376</h4>
                    <label><span className="bg-purple"></span>Organic</label>
                  </div>
                  <div>
                    <h4>25,001</h4>
                    <label><span className="bg-primary"></span>Direct</label>
                  </div>
                  <div>
                    <h4>12,909</h4>
                    <label><span className="bg-teal"></span>Referral</label>
                  </div>
                </div>
                <div className="chart-wrapper">
                  <div id="flotChart6" className="flot-chart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ api }) => ({
  dashboardData: _.get(api, `${c.GET_DATA}.list`) || [],
  // isLoading: api.loading.indexOf(c.GET_USER_LIST) > -1,
  // userListPager: _.get(api, `${c.GET_USER_LIST}.pager`) || {},
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(Dashboard);
