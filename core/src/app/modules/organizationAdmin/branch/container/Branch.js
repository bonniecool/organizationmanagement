import React, { PureComponent, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as c from '../constant';
import { AsyncComponent } from 'app/Utils';
// import Organization from '../component/List'
// import Profile from '../component/Profile'
// import MemberList from '../component/MemberList'
import { _ } from 'app/Utils';
import BranchInfo from '../component/BranchInfo';
import thumbnail from 'assets/images/500x500.png';

const AddAdminModal = AsyncComponent(() => import ('./AddAdminModal'));
const EditAdminModal = AsyncComponent(() => import ('./EditAdminModal'));
const RemoveAdminModal = AsyncComponent(() => import ('./RemoveAdminModal'));
const AddModal = AsyncComponent(() => import ('./AddModal'));
const EditModal = AsyncComponent(() => import ('./EditModal'));

class Branches extends PureComponent {
  

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
				type:c.GET_DETAILS,
				id:data.get('id')     
		})
	}

	onAdd = e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Branch',
					modalSize: 'modal-md',
					content: <AddModal 
						/>
			}
		})
	}

	onEdit = data => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:c.SET_FORM_DATA,
			data:data.toJS()
		})
			dispatch({
					type:c.GET_PROVINCES,
					region_id:data.get('region_code') || ''
			})
			dispatch({
					type:c.GET_MUNICIPALITIES,
					region_id:data.get('region_code'),
					province_id:data.get('province_code') || ''
			})
			dispatch({
					type:c.GET_BARANGAYS,
					region_id:data.get('region_code'),
					province_id:data.get('province_code'),
					municipality_id:data.get('municipality_code'),
			})
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Edit Branch',
					modalSize: 'modal-md',
					content: <EditModal 
										data={data}
									/>
			}
		})
	}


	onAddAdmin = (data) => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Branch',
					modalSize: 'modal-md',
					content: <AddAdminModal 
							data={data}
						/>
			}
		})
	}

	editAdmin = (data) => e => {
		e.preventDefault();
		const { dispatch, details } = this.props;
		dispatch({
			type:c.SET_FORM_DATA,
			data:{
				first_name:data.get('first_name'),
				last_name:data.get('last_name'),
				email:data.getIn(['user','email']),
				id:data.getIn(['user','profile_id']),
			}
		})
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Admin',
					modalSize: 'modal-md',
					content: <EditAdminModal 
							data={details}
						/>
			}
		})
	}

	removeAdmin = (data) => e => {
		e.preventDefault();
		const { dispatch, details } = this.props;
		dispatch({
			type:c.SET_FORM_DATA,
			data:data.toJS()
		})
		
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Add Admin',
					modalSize: 'modal-md',
					content: <RemoveAdminModal 
							data={details}
						/>
			}
		})
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
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Branch</h2>
              <p className="mg-b-0">List of organization branches</p>
            </div>
            <div className="az-dashboard-date">
              <div className="date">
                <button className="btn btn-primary btn-md" onClick={this.onAdd}>Create Branch</button>
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
                  <div key={`branch-${key}`} className={`az-contact-item ${item.get('id') === details.get('id') && 'selected'}`} onClick={this.handleSelectRow(item)}>
                    <div className="az-img-user online"><img src={ item.get('photo')|| thumbnail } alt="" /></div>
                    <div className={`az-contact-body `}>
                      <h6 className="text-capitalize">{item.get( 'name')}</h6>
                      <span className="phone">{item.get( 'mobile_number')}</span>
                    </div>
                    <a href="" className={`az-contact-star ${item.get('id') === details.get('id') && 'active'}`}><i className="typcn typcn-star"></i></a>
                  </div>
                )
              })
            }
            </div>
          </div>
          <BranchInfo 
            data={details}
            
          />

        </div>
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
	const organizationBranch = state.organizationBranch;

	return {
		list : organizationBranch.get('list'),
		details : organizationBranch.get('details'),
		form_data : organizationBranch.get('form_data'),
		members : organizationBranch.get('members'),
	};
};

export default withRouter(connect(mapStateToProps)(Branches));
