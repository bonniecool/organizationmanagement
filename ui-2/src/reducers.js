import { combineReducers } from 'redux';
import auth, { authInitState } from 'modules/auth/reducer';
import loading, { loadingInitState } from 'modules/common/reducers/loading';
import modal, { modalInitState } from 'modules/common/reducers/modal';
import api, { mapReduce, apiInitState } from './api/reducers';
// import profile, { profileInitState } from 'modules/profile/reducer';
// import lookups, { lookupsInitState } from 'modules/common/reducers/lookups';

const mapReducer = (actions, INIT_STATE) => (state = INIT_STATE, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return state;
};

const app = combineReducers({
  auth: mapReducer(auth, authInitState),
  loading: mapReducer(loading, loadingInitState),
  modal: mapReducer(modal, modalInitState),
  api: mapReduce(api, apiInitState),
  // profile: mapReducer(profile, profileInitState),
  // lookups: mapReducer(lookups, lookupsInitState),
});

export default app;
