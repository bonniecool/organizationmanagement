/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import * as c from '../constants';

class Wallet extends PureComponent {
  

  static propTypes = {
    getDetails: PropTypes.instanceOf(Function).isRequired,
    form_data: PropTypes.instanceOf(Function),
  }

  static defaultProps = {
    details:{}
  }

  componentDidMount = () => {
    const { getDetails } = this.props;
    getDetails();
  }


  render() {
    const {
      details
    } = this.props;
    return (
      <Fragment>
        <div className="az-content-header" style={{minHeight: '90px'}}>
          <div className="az-content-header-top">
            <div>
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Wallet</h2>
              <p className="mg-b-0">Current Credit</p>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <div className="az-content az-content-app az-content-contacts pd-b-0 mt-3">
            <div className="">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="text-center display-4">
                        <h1>{details ? _.get(details,'load_wallet.amount') : '00.00'}</h1>
                      </div>
                      <div className="text-uppercase text-center">
                        <p>Current Load Credits</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="text-uppercase text-center">
                        <button className="btn btn-success btn-lg" onClick={this.load}> LOAD CREDITS </button>
                      </div>
                    </div>
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

const mapStateToProps = ({ api }) => {
  return ({
  details: _.get(api, `${c.GET_DETAILS}.item`) || [],
})};

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(Wallet);