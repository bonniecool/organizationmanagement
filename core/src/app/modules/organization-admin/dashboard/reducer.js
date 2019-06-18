import { Map, fromJS, List } from 'immutable';
import * as c from './constant';

const initState = Map({

	branch_status: Map({}),
	members: List([]),
	total_branch: Map({}),
})

export default (state = initState, action) => {
	switch(action.type){
		case c.GOT_ACTIVE_BRANCHES:
			return state.set('branch_status', fromJS(action.data))
		case c.GOT_MEMBERS_PER_BRANCH:
			return state.set('members', fromJS(action.data))
		case c.GOT_TOTAL_BRANCH:
			return state.set('total_branch', fromJS(action.data))
		default:
			return state;
	}
}

