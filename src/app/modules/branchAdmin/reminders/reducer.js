import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({

	list:List([]),
	log_list:List([]),
	form_data:Map({
		subject:'',
		content:'',
		status:'',
		date_from:'',
		date_to:'',
	}),
	details:Map({}),
})

export default (state = initState, action) => {
	switch(action.type){
		case c.GOT_LIST:
			return state.set('list', fromJS(action.data))
		case c.GOT_DETAIL:
			return state.set('details', fromJS(action.data))
		case c.GOT_LOG_LIST:
			return state.set('log_list', fromJS(action.data))
		case c.SET_FORM_DATA:
			return state.update('form_data',form_data => form_data.merge(fromJS(action.data)));
		default:
			return state;
	}
}

