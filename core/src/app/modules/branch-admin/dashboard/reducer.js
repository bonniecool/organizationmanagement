import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({
	attendees: Map({}),
})

export default (state = initState, action) => {
	switch(action.type){
		case c.GOT_ATTENDEES:
			return state.set('attendees', fromJS(action.data))
		default:
			return state;
	}
}

