import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({

	list:List([]),
	form_data:Map({
		refno:'',
		amount:'',
		message:''
	}),
})

export default (state = initState, action) => {
	switch(action.type){
		case c.GOT_LIST:
			return state.set('list', fromJS(action.data))
		case c.SET_FORM_DATA:
			return state.update('form_data',form_data => form_data.merge(fromJS(action.data)));
		case c.CLEAR_FORM_DATA:
			return state.set('form_data', initState.get('form_data'));
		default:
			return state;
	}
}

