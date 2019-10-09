/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TransactionList from '../component/TransactionList';
import * as c from '../constant';

class Organization extends PureComponent {
  

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
        <div className="az-content-header d-block d-md-flex">
          <div>
            <h2 className="az-content-title mg-b-5 mg-b-lg-8">Transactions</h2>
          </div>
        </div>
        <div className="table-responsive">
          <TransactionList 
            data={list}
          /> 
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
	const superAdminTransaction = state.superAdminTransaction;
	return {
		list : superAdminTransaction.get('list'),
	};
};

export default withRouter(connect(mapStateToProps)(Organization));
