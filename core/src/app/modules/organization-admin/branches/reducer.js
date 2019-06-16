import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({

	list:List([]),
	form_data:Map({
	}),
	details:Map({}),
	regions:List([]),
	provinces:List([]),
	municipalities:List([]),
	barangays:List([]),
	members:List([]),
})

export default (state = initState, action) => {
	switch(action.type){
		case c.GOT_LIST:
			return state.set('list', fromJS(action.data))
		case c.GOT_DETAIL:
			return state.set('details', fromJS(action.data))
		case c.GOT_REGIONS:
			return state.set('regions', fromJS(action.data))
		case c.GOT_PROVINCES:
			return state.set('provinces', fromJS(action.data))
		case c.GOT_MUNICIPALITIES:
			return state.set('municipalities', fromJS(action.data))
		case c.GOT_MEMBERS:
			return state.set('members', fromJS(action.data))
		case c.GOT_BARANGAYS:
			return state.set('barangays', fromJS(action.data))
		case c.SET_FORM_DATA:
			return state.update('form_data',form_data => form_data.merge(fromJS(action.data)));
		default:
			return state;
	}
}

