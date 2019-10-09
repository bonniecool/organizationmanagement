import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({

	statistic: Map({
		active_employees:List([]),
		applicants:List([]),
		by_gender:List([]),
		by_status:List([]),
		payroll:List([]),
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

