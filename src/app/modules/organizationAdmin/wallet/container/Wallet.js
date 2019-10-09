/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as c from '../constant';
import {currency} from 'app/Utils';
import { AsyncComponent } from 'app/Utils';
const AddModal = AsyncComponent(() => import ('./AddModal'));
const PGIModal = AsyncComponent(() => import ('./PGIModal'));

class Wallet extends PureComponent {
  
  componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})  
	}

	load = e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Credits',
					modalSize: 'modal-md',
					content: <AddModal 

						/>
			}
		})
	}

  render() {
    const {
      load_wallet
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
                        <h1>{load_wallet ? currency.format(load_wallet.get('amount')) : '00.00'}</h1>
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

const mapStateToProps = (state, routeParams) => {
	const organizationWallet = state.organizationWallet;
	const profile = state.auth.get('profile');
	return {
		list : organizationWallet.get('list'),
		load_wallet : profile.get('load_wallet'),
	};
};

export default withRouter(connect(mapStateToProps)(Wallet));
