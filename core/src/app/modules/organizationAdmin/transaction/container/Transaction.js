/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import TransactionList from '../component/TransactionList';
import * as c from '../constant';

class Transaction extends PureComponent {
  
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
	}

	onAdd = e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Organization',
					modalSize: 'modal-md',
					content: <AddModal 

						/>
			}
		})
	}

  render() {
    const {
      list
    } = this.props;
    return (
      <Fragment>
        <div className="az-content-header" style={{minHeight: '90px'}}>
          <div className="az-content-header-top">
            <div>
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Transaction</h2>
              <p className="mg-b-0">Organization transaction history</p>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <div className="col-lg-12 mb-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." />
              <span className="btn-group btn-group-sm input-group-btn">
                <button className="btn btn-outline-primary " type="button"><i className="fa fa-search"></i>Search</button>
              </span>
            </div>
          </div>
          <TransactionList 
            data={list}
          /> 
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
	const organizationTransaction = state.organizationTransaction;
	return {
		list : organizationTransaction.get('list'),
	};
};

export default withRouter(connect(mapStateToProps)(Transaction));
