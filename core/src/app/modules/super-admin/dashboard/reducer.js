import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({

	statistic: Map({
		members:List([]),
		organization_type:List([]),
		total_organization:List([]),
	}),
	
})

export default (state = initState, action) => {
	switch(action.type){
		case c.GOT_MEMBERS:
			return state.set('members', fromJS(action.data))
		case c.GOT_ORGANIZATION_TYPE:
			return state.set('organization_type', fromJS(action.data))
		case c.GOT_TOTAL_ORGANIZATION:
			return state.set('total_organization', fromJS(action.data))
		default:
			return state;
	}
}

