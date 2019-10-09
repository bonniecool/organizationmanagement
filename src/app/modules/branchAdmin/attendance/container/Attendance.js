/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import TransactionList from '../component/TransactionList';
import * as actions from '../actions';
import * as c from '../constants';

class Organization extends PureComponent {
  

  static propTypes = {
    getList: PropTypes.instanceOf(Function).isRequired,
    getDetails: PropTypes.instanceOf(Function).isRequired,
    list: PropTypes.instanceOf(Array).isRequired,
    form_data: PropTypes.instanceOf(Function),
  }

  static defaultProps = {
    list:[],
    details:{}
  }

  componentDidMount = () => {
    const { getList } = this.props;
    getList();
  }

  handleSelectRow = ({ id }) => e => {
    e.preventDefault();
    this.props.getDetails(id);
  };

  handleChange = () => {
    
  }

  search = () => {
    const {getOrganization } = this.props;
    getOrganization({} , callback => {
      if(_.get(callback, 'data').length > 0){
        const id = _.get(callback, 'data[0].id')
        getDetails(id)
      }
    });
  }
=======
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
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb

  render() {
    const {
      list
    } = this.props;
    return (
      <Fragment>
        <div className="az-content-header" style={{minHeight: '90px'}}>
          <div className="az-content-header-top">
            <div>
<<<<<<< HEAD
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Transaction</h2>
              <p className="mg-b-0">Organization transaction history</p>
=======
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Attendance</h2>
              <p className="mg-b-0">Daily Time Record</p>
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
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

<<<<<<< HEAD
const mapStateToProps = ({ api }) => ({
  list: _.get(api, `${c.GET_LIST}.list`) || [],
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(Organization);
=======
const mapStateToProps = (state, routeParams) => {
	const branchAttendance = state.branchAttendance;
	return {
		list : branchAttendance.get('list'),
		form_data : branchAttendance.get('form_data'),
	};
};

export default withRouter(connect(mapStateToProps)(Attendance));
>>>>>>> 09eb3b6a8b8895fc43f0167ad287a5ee56d72ecb
