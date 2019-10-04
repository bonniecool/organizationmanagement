/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import {
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Info from '../component/Info';
import * as c from '../constant';
import thumbnail from 'assets/images/500x500.png';
import { AsyncComponent } from 'app/Utils';
import moment from 'moment-timezone';
const AddModal = AsyncComponent(() => import ('./AddModal'));
const EditModal = AsyncComponent(() => import ('./EditModal'));
const GenerateIDModal = AsyncComponent(() => import ('./GenerateIDModal'));

class Members extends PureComponent {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
	}

	handleSelectRow = (data) => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
				type:c.GET_DETAIL,	
				id:data.get('uuid')     
		})
	}

	onAdd = e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Member',
					modalSize: 'modal-lg',
					content: <AddModal 
						/>
			}
		})
	}

	generateID = data => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Generate ID',
					modalSize: 'modal-md',
					content: <GenerateIDModal 
					data={data}
				/>
			}
		})
	}


	onEdit = data => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		let newData = data.toJS()
				newData['first_name'] = data.get('first_name');
				newData['last_name'] = data.get('last_name');
				newData['middle_name'] = data.get('middle_name');
				newData['suffix'] = data.get('suffix');
				newData['birth_date'] = moment(data.get('birth_date'));
				newData['gender'] = data.get('gender');
				newData['mobile_number'] = data.get('mobile_number');
				newData['region_code'] = data.getIn(['region','code']);
				newData['province_code'] = data.getIn(['province','code']);
				newData['municipality_code'] = data.getIn(['municipality','code']);
				newData['barangay_code'] = data.getIn(['barangay','code']);
				newData['zip_code'] = data.get('zip_code');
				newData['street'] = data.get('street');
				newData['photo'] = data.get('photo');	
		dispatch({
			type:c.SET_FORM_DATA,
			data:newData
		})
			if(data.get('region')){
				dispatch({
					type:c.GET_PROVINCES,
					region_id:data.getIn(['region','code']) || '',
				})
			}
			if(data.get('province')){
				dispatch({
					type:c.GET_MUNICIPALITIES,
					region_id:data.getIn(['region','code'])  || '',
					province_id:data.getIn(['province','code']) || '',
				})
			}
			if(data.get('municipality')){
				dispatch({
						type:c.GET_BARANGAYS,
						region_id:data.getIn(['region','code'])  || '',
						province_id:data.getIn(['province','code']) || '',
						municipality_id:data.getIn(['municipality','code']) || '',
				})
			}
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Edit Member',
					modalSize: 'modal-lg',
					content: <EditModal 
										data={data}
									/>
			}
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
      list,
      details
		} = this.props;

    return (
      <Fragment>
        <div className="az-content-header" style={{minHeight: '90px'}}>
          <div className="az-content-header-top">
            <div>
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Members</h2>
              <p className="mg-b-0">List of members</p>
            </div>
            <div className="az-dashboard-date">
              <div className="date">
                <button className="btn btn-primary btn-lg" onClick={this.onAdd}>Add Members</button>
              </div>
            </div>
          </div>
        </div>
      <div className="az-content az-content-app az-content-contacts pd-b-0 mt-3">
        <div className="container">
          <div className="az-content-left az-content-left-contacts">

          <div className="az-content-breadcrumb lh-1 mg-b-2">
            <div className="col-lg-12 mg-t-20 mg-lg-t-0 mb-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                <span className="btn-group btn-group-sm input-group-btn">
                  <button className="btn btn-outline-primary " type="button"><i className="fa fa-search"></i></button>
                </span>
              </div>
            </div>
					</div>
					<div id="azContactList" className="az-contacts-list pre-scrollable">
            {
              list.map( (item, key) => {
                return(
                  <div key={`branch-${key}`} className={`az-contact-item ${item.get('uuid') === details.get('uuid') && 'selected'}`} onClick={this.handleSelectRow(item)}>
                    <div className={`az-img-user ${item.get('has_logged') && 'online'}`}><img src={ item.get('photo')|| thumbnail } alt="" /></div>
                    <div className={`az-contact-body `}>
                      <h6 className="text-capitalize">{item.get( 'name')}</h6>
                      <span className="phone">{item.get( 'mobile_number')}</span>
                    </div>
                    <a href="" className={`az-contact-star ${item.get('uuid') === details.get('uuid') && 'active'}`}><i className="typcn typcn-star"></i></a>
                  </div>
                )
              })
            }
            </div>
          </div>
          <Info 
            data={details}
          />
        </div>
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
	const branchMembers = state.branchMembers;

	return {
		list : branchMembers.get('list'),
		details : branchMembers.get('details'),
		form_data : branchMembers.get('form_data'),
		members : branchMembers.get('members'),
		attendance : branchMembers.get('attendance'),
	};
};

export default withRouter(connect(mapStateToProps)(Members));
