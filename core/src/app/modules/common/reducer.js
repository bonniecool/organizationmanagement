import _ from 'lodash';
import { Map, List, fromJS } from 'immutable';
import * as c from './constant';

const initStateModal = Map({
	isOpen: false,
	content: null,
	title: 'Modal Title',
	modalSize: 'modal-md'
})

const initStateNav = Map({
	isShinked: true
})

const initStateCityzenship = Map({
	citizenship_list: List([])
})

const initStateReligions = Map({
	religion_list: List([])
})

const initCountryList = Map({
	country_list: List([]),
})

const initOrganization = Map({
	agency_list: List([]),
})

export default {
	loading: (state = c.LOADING_INIT_STATE, action) => {
		switch(action.type){
			case c.SET_LOADING:
				let setLoading = state.loadingTypes.concat([action.key]);
				return _.assign({}, state, {
					loadingTypes: setLoading
				})
			case c.DONE_LOADING:
				let doneLoading = state.loadingTypes.filter((type) => !(action.key === type))
				return _.assign({}, state, {
					loadingTypes: doneLoading
				})
			case c.CLEAR_LOADING:
				return _.assign({}, state, {
					loadingTypes: []
				})
			default: 
				return state;
		}
	},
	modal: (state = initStateModal, action) => {
		switch(action.type){
			case c.MODAL:
				return state.merge(Map(action.data))
			default: 
				return state
		}
	},
	nav: (state = initStateNav, action) => {
		switch(action.type){
			case c.GET_NAV_SIZE:
				return state.set('isShinked', action.data);
			default:
				return state;
		}
	},
	citizenship: (state = initStateCityzenship, action) => {
		switch(action.type){
			case c.GOT_CITIZENSHIP:
				return state.set('citizenship_list', fromJS(action.data))
			default:
				return state;
		}
	},
	religions: (state = initStateReligions, action) => {
		switch(action.type){
			case c.GOT_RELIGIONS:
				return state.set('religion_list', fromJS(action.data))
			default:
				return state
		}
	},
	countryList: (state = initCountryList, action) => {
		switch(action.type){
			case c.GOT_COUNTRY:
				return state.set('country_list', fromJS(action.data))
			default:
				return state
		}
	},
	organizationList: (state = initOrganization, action) => {
		switch(action.type){
			case c.GOT_ALL_AGENCY:
				return state.set('agency_list', fromJS(action.data))
			default: 
				return state
		}
	}
}
