import * as c from './constant';
import { Map, fromJS, List } from 'immutable';

const initState = Map({
	isAuthenticated: false,
    profile: Map({}),
	user_type: null,
	permissions:List([])
})

export default (state = initState, action) => {
	switch(action.type){
		case c.AUTHENTICATE:
			return state.set('isAuthenticated', action.isSuccess);
		case c.PERMISSIONS:
			return state.set('permissions', fromJS(action.data));
        case c.PROFILE:
            return state
            	.set('profile', fromJS(action.data))
            	.set('user_type', action.user_type)
        case "RESET_AUTH":
            return initState;
		default:
			return state;
	}
}