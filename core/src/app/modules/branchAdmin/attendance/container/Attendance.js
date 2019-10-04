/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import TransactionList from '../component/TransactionList';
import * as c from '../constant';

class Attendance extends PureComponent {
  
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
	}

	handleOnChangeDate = key => (value) => {
		const { dispatch } = this.props;
		dispatch({
			type: c.SET_FORM_DATA,
			data: {
				[key]: value,
			},
		});
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
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Attendance</h2>
              <p className="mg-b-0">Daily Time Record</p>
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
	const branchAttendance = state.branchAttendance;
	return {
		list : branchAttendance.get('list'),
		form_data : branchAttendance.get('form_data'),
	};
};

export default withRouter(connect(mapStateToProps)(Attendance));
