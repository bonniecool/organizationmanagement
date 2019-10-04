import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as c from '../constant';
import { AsyncComponent } from 'app/Utils';
import Info from '../component/Info';
import LogList from '../component/LogList';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import thumbnail from 'assets/images/500x500.png';

const AddModal = AsyncComponent(() => import ('./AddModal'));
const EditModal = AsyncComponent(() => import ('./EditModal'));
const SendSmsModal = AsyncComponent(() => import ('./SendSmsModal'));
const RemoveModal = AsyncComponent(() => import ('./RemoveModal'));

class Reminders extends Component {

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch({
			type:c.GET_LIST
		})
	}

	onSelectRow = (data) => {
		const { dispatch } = this.props;
		dispatch({
				type:c.GET_DETAIL,
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
					title: 'Add Organization',
					modalSize: 'modal-md',
					content: <AddModal 

						/>
			}
		})
	}

	sendSMS = data =>  e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
			type:'MODAL',
			data: {
					isOpen: true,
					title: 'Send SMS',
					modalSize: 'modal-md',
					content: <SendSmsModal 
					data={data}
						/>
			}
		})
	}


	onEdit = data => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		let newData = data.toJS()
				newData['expiration_date'] = data.get('expiration_date') ? moment(data.get('expiration_date')) :''
		dispatch({
			type:c.SET_FORM_DATA,
			data:newData
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

	handleOnChangeDate = key => (value) => {
		const { dispatch } = this.props;
		dispatch({
			type: c.SET_FORM_DATA,
			data: {
				[key]: value,
			},
		});
	}

	handleSelectRow = (data) => e => {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch({
				type:c.GET_DETAIL,	
				id:data.get('id')     
		})
	}

	render() {
		const { list, details, log_list, form_data, attendance } = this.props;

		return (
			<Fragment>
			<div className="az-content-header" style={{minHeight: '90px'}}>
          <div className="az-content-header-top">
            <div>
              <h2 className="az-content-title mg-b-5 mg-b-lg-8">Reminders</h2>
              <p className="mg-b-0">List of member's reminders</p>
            </div>
            <div className="az-dashboard-date">
              <div className="date">
                <button className="btn btn-primary btn-lg">Add Reminder</button>
              </div>
            </div>
          </div>
        </div>
			<div class="az-content az-content-profile">
      <div class="container mn-ht-100p ml-0">
        <div class="az-content-left az-content-left-profile pr-0">
					<div class="az-profile-overview">
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
											<div className={` ${item.get('has_logged') && 'online'}`}>'
												<img src={ item.get('photo')|| thumbnail } alt="" style={{width: '36px',
													height: '36px'}}/>
											</div>
											<div className={`az-contact-body `}>
												<h6 className="text-capitalize">{item.get('subject')}</h6>
												<span className="phone"><small>{item.get('expiration_date')}</small></span>
											</div>
											<a href="" className={`az-contact-star ${item.get('id') === details.get('id') && 'active'}`}><i className="typcn typcn-star"></i></a>
										</div>
									)
								})
							}
							</div>
          </div>
        </div>
        <div class="az-content-body az-content-body-profile pl-0">
					<Info
						data={details}
					/>
					<div className="az-content-body az-content-body-profile pl-4" style={{borderTop:'1px solid #ced4da'}}>
						<div className="media">
						<div className="media-body">
							<button className="btn btn-sm btn-primary" onClick={this.sendSMS(details)}>Send via SMS</button>
						</div>
						</div>
					</div>
					<div className="az-content-body az-content-body-profile pl-4" style={{borderTop:'1px solid #ced4da'}}>
						<div className="media">
							<div className="media-body">
								<h3>SMS Logs</h3>
							</div>
						</div>
					</div>

					<div className="az-content-body az-content-body-profile pl-4" style={{borderTop:'1px solid #ced4da'}}>
						<div className="">
							<LogList 
								data={log_list}
							/> 
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
	const branchReminders = state.branchReminders;
	return {
		list : branchReminders.get('list'),
		details : branchReminders.get('details'),
		log_list : branchReminders.get('log_list'),
		form_data : branchReminders.get('form_data'),
	};
};

export default withRouter(connect(mapStateToProps)(Reminders));
