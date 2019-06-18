import * as c from './constant';
import { Map, fromJS, List } from 'immutable';

const initState = Map({
	isAuthenticated: false,
    profile: Map({}),
	user_type: null,
	permissions:List([]),
	regions:List([]),
	provinces:List([]),
	municipalities:List([]),
	barangays:List([]),
	members:List([]),
	form_data:Map({
		
	})
})

export default (state = initState, action) => {
	switch(action.type){
		case c.AUTHENTICATE:
			return state.set('isAuthenticated', action.isSuccess)
						.set('user_type', action.user_type)
		case c.PERMISSIONS:
			return state.set('permissions', fromJS(action.data));
        case c.PROFILE:
            return state
            	.set('profile', fromJS(action.data))
            	.set('user_type', action.user_type)
        case "RESET_AUTH":
			return initState;
		
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