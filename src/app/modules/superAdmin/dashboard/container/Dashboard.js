import React, { PureComponent, Fragment } from 'react';
import {
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as c from '../constant';

class Dashboard extends PureComponent {

  componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_MEMBERS
		})
		dispatch({
			type:c.GET_ORGANIZATION_TYPE
		})
		dispatch({
			type:c.GET_TOTAL_ORGANIZATION
		})
	}

  render() {
    const {
      match,
      dashboardData
    } = this.props;
    return (
      <Fragment>
        <div className="az-content-header d-block d-md-flex">
          <div>
            <h2 className="az-content-title mg-b-5 mg-b-lg-8">Hi, welcome back!</h2>
            <p className="mg-b-0">Your sales monitoring dashboard template.</p>
          </div>
          <div className="az-dashboard-header-right">
            <div>
              <label className="tx-13">Customer Ratings</label>
              <div className="az-star">
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star active"></i>
                <i className="typcn typcn-star"></i>
                <span>(12,775)</span>
              </div>
            </div>
            <div>
              <label className="tx-13">All Sales (Online)</label>
              <h5>431,007</h5>
            </div>
            <div>
              <label className="tx-13">All Sales (Offline)</label>
              <h5>932,210</h5>
            </div>
          </div>
        </div>
        <div className="az-content-body">
          <div className="card card-dashboard-seven">
            <div className="card-header">
              <div className="row row-sm">
                <div className="col-6 col-md-4 col-xl">
                  <div className="media">
                    <div><i className="icon ion-ios-calendar"></i></div>
                    <div className="media-body">
                      <label>Start Date</label>
                      <div className="date">
                        <span>Sept 01, 2018</span> <a href=""><i className="icon ion-md-arrow-dropdown"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl">
                  <div className="media">
                    <div><i className="icon ion-ios-calendar"></i></div>
                    <div className="media-body">
                      <label>End Date</label>
                      <div className="date">
                        <span>Sept 30, 2018</span> <a href=""><i className="icon ion-md-arrow-dropdown"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl mg-t-15 mg-md-t-0">
                  <div className="media">
                    <div><i className="icon ion-logo-usd"></i></div>
                    <div className="media-body">
                      <label>Sales Measure</label>
                      <div className="date">
                        <span>Revenue</span> <a href=""><i className="icon ion-md-arrow-dropdown"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-xl mg-t-15 mg-xl-t-0">
                  <div className="media">
                    <div><i className="icon ion-md-person"></i></div>
                    <div className="media-body">
                      <label>Customer Type</label>
                      <div className="date">
                        <span>All Customers</span> <a href=""><i className="icon ion-md-arrow-dropdown"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-xl mg-t-15 mg-xl-t-0">
                  <div className="media">
                    <div><i className="icon ion-md-stats"></i></div>
                    <div className="media-body">
                      <label>Transaction Type</label>
                      <div className="date">
                        <span>All Transactions</span> <a href=""><i className="icon ion-md-arrow-dropdown"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row row-sm">
                <div className="col-6 col-lg-3">
                  <label className="az-content-label">Total Quantity</label>
                  <h2>110,000</h2>
                  <div className="desc up">
                    <i className="icon ion-md-stats"></i>
                    <span><strong>2.00%</strong> (30 days)</span>
                  </div>
                  <span id="compositeline2">5,9,5,6,4,12,18,14,10,15,12,5,8,5,12,5,12,10,16,12</span>
                </div>
                <div className="col-6 col-lg-3">
                  <label className="az-content-label">Total Cost</label>
                  <h2><span>$</span>523,200</h2>
                  <div className="desc up">
                    <i className="icon ion-md-stats"></i>
                    <span><strong>12.09%</strong> (30 days)</span>
                  </div>
                  <span id="compositeline">3,2,4,6,12,14,8,7,14,16,12,7,8,4,3,2,2,5,6,7</span>
                </div>
                <div className="col-6 col-lg-3 mg-t-20 mg-lg-t-0">
                  <label className="az-content-label">Total Revenue</label>
                  <h2><span>$</span>753,098</h2>
                  <div className="desc down">
                    <i className="icon ion-md-stats"></i>
                    <span><strong>0.51%</strong> (30 days)</span>
                  </div>
                  <span id="compositeline4">5,9,5,6,4,12,18,14,10,15,12,5,8,5,12,5,12,10,16,12</span>
                </div>
                <div className="col-6 col-lg-3 mg-t-20 mg-lg-t-0">
                  <label className="az-content-label">Total Profit</label>
                  <h2><span>$</span>331,886</h2>
                  <div className="desc up">
                    <i className="icon ion-md-stats"></i>
                    <span><strong>5.32%</strong> (30 days)</span>
                  </div>
                  <span id="compositeline3">5,10,5,20,22,12,15,18,20,15,8,12,22,5,10,12,22,15,16,10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-sm mg-b-15 mg-sm-b-20">
            <div className="col-lg-6 col-xl-7">
              <div className="card card-dashboard-six">
                <div className="card-header">
                  <div>
                    <label className="az-content-label">This Year's Total Revenue</label>
                    <span className="d-block">Sales Performance for Online and Offline Revenue</span>
                  </div>
                  <div className="chart-legend">
                    <div><span>Online Revenue</span> <span className="bg-indigo"></span></div>
                    <div><span>Offline Revenue</span> <span className="bg-teal"></span></div>
                  </div>
                </div>
                <div id="morrisBar1" className="ht-200 ht-lg-250 wd-100p"></div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-5 mg-t-20 mg-lg-t-0">
              <div className="card card-dashboard-map-one">
                <label className="az-content-label">Sales Revenue by Customers in USA</label>
                <span className="d-block mg-b-20">Sales Performance of all states in the United States</span>
                <div id="vmap2" className="vmap-wrapper"></div>
              </div>
            </div>
          </div>

          <div className="row row-sm mg-b-20 mg-lg-b-0">
            <div className="col-md-6 col-xl-7">
              <div className="card card-table-two">
                <h6 className="card-title">Your Most Recent Earnings</h6>
                <span className="d-block mg-b-20">This is your most recent earnings for today's date.</span>
                <div className="table-responsive">
                  <table className="table table-striped table-dashboard-two">
                    <thead>
                      <tr>
                        <th className="wd-lg-25p">Date</th>
                        <th className="wd-lg-25p tx-right">Sales Count</th>
                        <th className="wd-lg-25p tx-right">Earnings</th>
                        <th className="wd-lg-25p tx-right">Tax Witheld</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>05 Oct 2018</td>
                        <td className="tx-right tx-medium tx-inverse">25</td>
                        <td className="tx-right tx-medium tx-inverse">$380.50</td>
                        <td className="tx-right tx-medium tx-danger">-$23.50</td>
                      </tr>
                      <tr>
                        <td>04 Oct 2018</td>
                        <td className="tx-right tx-medium tx-inverse">34</td>
                        <td className="tx-right tx-medium tx-inverse">$503.20</td>
                        <td className="tx-right tx-medium tx-danger">-$13.45</td>
                      </tr>
                      <tr>
                        <td>03 Oct 2018</td>
                        <td className="tx-right tx-medium tx-inverse">30</td>
                        <td className="tx-right tx-medium tx-inverse">$489.65</td>
                        <td className="tx-right tx-medium tx-danger">-$20.98</td>
                      </tr>
                      <tr>
                        <td>02 Oct 2018</td>
                        <td className="tx-right tx-medium tx-inverse">27</td>
                        <td className="tx-right tx-medium tx-inverse">$421.80</td>
                        <td className="tx-right tx-medium tx-danger">-$22.22</td>
                      </tr>
                      <tr>
                        <td>01 Oct 2018</td>
                        <td className="tx-right tx-medium tx-inverse">31</td>
                        <td className="tx-right tx-medium tx-inverse">$518.60</td>
                        <td className="tx-right tx-medium tx-danger">-$23.01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-5 mg-t-20 mg-md-t-0">
              <div className="card card-dashboard-eight">
                <h6 className="card-title">Your Top Countries</h6>
                <span className="d-block mg-b-20">Sales performance revenue based by country</span>

                <div className="list-group">
                  <div className="list-group-item">
                    <i className="flag-icon flag-icon-us flag-icon-squared"></i>
                    <p>United States</p>
                    <span>$1,671.10</span>
                  </div>
                  <div className="list-group-item">
                    <i className="flag-icon flag-icon-nl flag-icon-squared"></i>
                    <p>Netherlands</p>
                    <span>$1,064.75</span>
                  </div>
                  <div className="list-group-item">
                    <i className="flag-icon flag-icon-gb flag-icon-squared"></i>
                    <p>United Kingdom</p>
                    <span>$1,055.98</span>
                  </div>
                  <div className="list-group-item">
                    <i className="flag-icon flag-icon-ca flag-icon-squared"></i>
                    <p>Canada</p>
                    <span>$1,045.49</span>
                  </div>
                  <div className="list-group-item">
                    <i className="flag-icon flag-icon-au flag-icon-squared"></i>
                    <p>Australia</p>
                    <span>$1,042.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
	const dashboardSuperAdmin = state.dashboardSuperAdmin;
	return {
		members : dashboardSuperAdmin.get('members'),
		organization_type : dashboardSuperAdmin.get('organization_type'),
		total_organization : dashboardSuperAdmin.get('total_organization'),
	};
};

export default withRouter(connect(mapStateToProps)(Dashboard));

