import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({

	statistic: Map({
		departments:0,
		applicaagenciesnts:List([]),
		agency_list:List([])
	}),
	
})

export default (state = initState, action) => {
	switch(action.type){
		case c.GOT_STATISTIC:
			return state.set('statistic', fromJS(action.data))
		default:
			return state;
	}
}

