import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import CustomValue from '../component/CustomValue';
import CustomOptions from '../component/CustomOptions';
class CustomSelect extends PureComponent {

	render() {
		if(this.props.user_type === 0){
			return ''
		}
		return (
			<div className="card-header d-flex align-items-center">
				<div className="col-md-12">
	  			<Select
	                className="text-uppercase "
	                placeholder="- Filter by Agency -"
	                name="agency"
	                value={ this.props.value }
	                options={ this.props.agencies }
	                optionComponent={ CustomOptions }
	                valueComponent={ CustomValue }
	                onChange={ this.props.onChange }
	                />
				</div>
			</div>
		);
	}
}

const mapPropsToState = (state, routeParams) => {
	const agencyList = JSON.parse(sessionStorage.getItem('_store'))
	const auth = state.auth;
	return {
		user_type : auth.get('user_type'),
		agencies : agencyList.organizationLookups.agency_list
	}
}

export default withRouter(connect(mapPropsToState)(CustomSelect))