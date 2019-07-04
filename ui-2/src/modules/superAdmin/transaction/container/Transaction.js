/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
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

const mapStateToProps = ({ api }) => ({
  list: _.get(api, `${c.GET_LIST}.list`) || [],
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
]);

export default enhance(Organization);